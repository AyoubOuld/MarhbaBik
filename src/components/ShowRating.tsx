import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { PuffLoader } from "react-spinners";
import { FaStar } from "react-icons/fa";
import "../assets/App.css";
//@ts-ignore
import { db } from "../config/firebase"; // Adjust the import path if necessary

interface Destination {
  id: string;
  name: string;
  wilaya: string;
  description: string;
  category: string;
  thumbnailUrl: string;
  otherPicturesUrls: string[];
  region: string;
  wilayaName: string;
}

interface Comment {
  userId: string;
  comment: string;
  rating: number;
}

interface User {
  uid: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
}

const ShowRating = () => {
  const { destinationId } = useParams<{ destinationId: string }>();
  const [destination, setDestination] = useState<Destination | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [ratings, setRatings] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        const docRef = doc(db, "destinations", destinationId!);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setDestination({ id: docSnap.id, ...docSnap.data() } as Destination);

          const reviewsDocRef = doc(db, "DestinationsReviews", destinationId!);
          const reviewsDocSnap = await getDoc(reviewsDocRef);

          if (reviewsDocSnap.exists()) {
            setComments(reviewsDocSnap.data().comments || []);
            setRatings(reviewsDocSnap.data().ratings || []);
          }
        } else {
          console.error("No such document!");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching destination:", error);
        setLoading(false);
      }
    };

    fetchDestination();
  }, [destinationId]);

  const calculateAverageRating = (ratings?: number[]) => {
    if (!ratings || ratings.length === 0) return "No ratings";
    const sum = ratings.reduce((acc, rating) => acc + rating, 0);
    const average = sum / ratings.length;
    return average.toFixed(1); // Return the average rating rounded to one decimal place
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <PuffLoader color="#36d7b7" size={150} />
        </div>
      ) : (
        destination && (
          <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
            <h1 className="text-3xl text-mh-dark font-900 text-center mb-6">
              Ratings & Comments for <span className="text-mh-blue">{destination?.name}</span>
            </h1>
            <div className="flex items-center justify-center mb-6">
              <FaStar className="text-yellow-400" />
              <span className="ml-2 text-2xl">
                Average Rating: {calculateAverageRating(ratings)}
              </span>
            </div>
            <div className="divider"></div>
            {comments.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {comments.map((comment, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 rounded-lg shadow-md"
                  >
                    <div className="flex items-center mb-2">
                      {comment.userId && (
                        <UserProfile userId={comment.userId} />
                      )}
                    </div>
                    <div className="flex items-center mb-2">
                      {Array(comment.rating)
                        .fill(0)
                        .map((_, i) => (
                          <FaStar key={i} className="text-yellow-400" />
                        ))}
                      {Array(5 - comment.rating)
                        .fill(0)
                        .map((_, i) => (
                          <FaStar key={i} className="text-gray-300" />
                        ))}
                    </div>
                    <p>{comment.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">
                No comments available.
              </p>
            )}
          </div>
        )
      )}
    </>
  );
};

const UserProfile = ({ userId }: { userId: string }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userDocRef = doc(db, "users", userId);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          setUser({ uid: userId, ...userDocSnap.data() } as User);
        } else {
          console.error("No such user document!");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [userId]);

  return user ? (
    <>
      <img
        className="w-10 h-10 mr-4 rounded-full"
        src={user.profilePicture}
        alt=""
      />
      <span className="font-semibold">{`${user.firstName} ${user.lastName}`}</span>
    </>
  ) : (
    <div>Loading...</div>
  );
};

export default ShowRating;
