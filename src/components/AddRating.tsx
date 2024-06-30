import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import { PuffLoader } from "react-spinners";
import { FaStar } from "react-icons/fa";
import { getAuth } from "firebase/auth";
import "../assets/App.css";
//@ts-ignore
import { db } from "../config/firebase"; // Adjust the import path if necessary
import { Button } from "flowbite-react";

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

const AddRating = () => {
  const { destinationId } = useParams<{ destinationId: string }>();
  const [destination, setDestination] = useState<Destination | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          setUserData({ uid: user.uid, ...userDocSnap.data() } as User);
        } else {
          console.error("No such user document!");
        }
      }
    };

    const fetchDestination = async () => {
      try {
        const docRef = doc(db, "destinations", destinationId!);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const destinationData = { id: docSnap.id, ...docSnap.data() } as Destination;
          setDestination(destinationData);

          const reviewsDocRef = doc(db, "DestinationsReviews", destinationId!);
          const reviewsDocSnap = await getDoc(reviewsDocRef);

          if (reviewsDocSnap.exists()) {
            const userComment = reviewsDocSnap.data().comments?.find((c: Comment) => c.userId === auth.currentUser?.uid);
            if (userComment) {
              setSelectedRating(userComment.rating);
              setComment(userComment.comment);
            }
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

    fetchUserData();
    fetchDestination();
  }, [destinationId]);

  const handleRatingSubmit = async () => {
    if (!userData) {
      alert("You have to log in to submit a rating and comment.");
      return;
    }

    if (!destination || selectedRating === 0 || !comment) {
      alert("Please fill in all fields and select a rating.");
      return;
    }

    try {
      const newComment: Comment = {
        userId: userData.uid,
        comment,
        rating: selectedRating,
      };

      const reviewsDocRef = doc(db, "DestinationsReviews", destination.id);

      const reviewsDocSnap = await getDoc(reviewsDocRef);

      if (reviewsDocSnap.exists()) {
        const existingComments = reviewsDocSnap.data().comments || [];
        const existingRatings = reviewsDocSnap.data().ratings || [];
        const existingCommentIndex = existingComments.findIndex((c: Comment) => c.userId === userData.uid);

        if (existingCommentIndex !== -1) {
          existingComments.splice(existingCommentIndex, 1, newComment);
          existingRatings.splice(existingCommentIndex, 1, selectedRating);
        } else {
          existingComments.push(newComment);
          existingRatings.push(selectedRating);
        }

        await updateDoc(reviewsDocRef, {
          comments: existingComments,
          ratings: existingRatings,
        });
      } else {
        await setDoc(reviewsDocRef, {
          comments: [newComment],
          ratings: [selectedRating],
        });
      }

      alert("Rating and comment submitted successfully!");
    } catch (error) {
      console.error("Error updating rating and comment:", error);
    }
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <PuffLoader color="#36d7b7" size={150} />
        </div>
      ) : (
        destination && (
          <>
            <div className="container w-full mx-auto bg-gray-100 p-4 rounded-lg">
              <div className="flex flex-col items-center">
                <h1 className="text-xl marhbabik_blue">
                  How did you find {destination?.name.toLocaleUpperCase()}?
                </h1>
                <div className="rating mt-4 flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      size={40}
                      className={`cursor-pointer ${selectedRating >= star ? "text-yellow-400" : "text-gray-300"}`}
                      onClick={() => setSelectedRating(star)}
                    />
                  ))}
                </div>
              </div>
              <div className="divider"></div>
              <div className="">
                <h1 className="text-xl marhbabik_blue mt-2">
                  Describe your experience in {destination?.name}
                </h1>
                <label className="form-control mt-2">
                  <div className="label">
                    <span className="label-text">Your Comment</span>
                  </div>
                  <textarea
                    className="textarea bg-white textarea-bordered h-24"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Share your experience"
                  ></textarea>
                </label>
              </div>
              <Button className="p-2 bg-mh-blue font-500 mt-4" pill size="sm" onClick={handleRatingSubmit}>
                Submit Rating and Comment
              </Button>
            </div>
          </>
        )
      )}
    </>
  );
};

export default AddRating;