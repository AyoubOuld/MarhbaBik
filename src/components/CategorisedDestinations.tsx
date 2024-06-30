import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  getDoc,
  query,
  where,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { DirectionAwareHover } from "../ui/direction-aware-hover-wilaya.tsx";
import { PuffLoader } from "react-spinners";
import { FaStar, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
//@ts-ignore
import { db, auth } from "../config/firebase"; // Adjust the import path if necessary

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
  ratings?: number[]; // Make ratings optional
}

interface WishlistItem {
  id: string;
  name: string;
  thumbnailUrl: string;
}

interface CategorisedDestinationsProps {
  selectedWilaya: string;
  category: string;
}

const CategorisedDestinations: React.FC<CategorisedDestinationsProps> = ({
  selectedWilaya,
  category,
}) => {
  
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const q = query(
          collection(db, "destinations"),
          where("wilaya", "==", selectedWilaya),
          where("category", "==", category) // Filter by category
        );
        const querySnapshot = await getDocs(q);
        const destinationsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Destination[];

        await Promise.all(destinationsData.map(async (destination) => {
          const reviewsRef = doc(db, "DestinationsReviews", destination.id);
          const reviewsSnap = await getDoc(reviewsRef);
          if (reviewsSnap.exists()) {
            destination.ratings = reviewsSnap.data().ratings || [];
          } else {
            console.error(`No reviews for destination ${destination.name}`);
          }
        }));

        setDestinations(destinationsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching destinations:", error);
        setLoading(false);
      }
    };
    fetchDestinations();
  }, [selectedWilaya, category]);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (!user) {
        console.error("User not authenticated");
        return;
      }

      try {
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);
        const userData = userDocSnap.data();
        setUserData(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  // Rest of the component code using userData
  const handleDestinationClick = (id: string) => {
    // Highlighted change
    navigate(`/destination/${encodeURIComponent(id)}`); // Highlighted change
  };
  const handleLike = async (destination: Destination) => {
    const user = auth.currentUser;
    if (!user) {
      alert("You have to log in to use this feature");
      return;
    }

    try {
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);
      const userData = userDocSnap.data();

      // Check if destination is already in the wishlist
      const isInWishlist = userData?.wisheddestinations?.some(
        (item: WishlistItem) => item.id === destination.id
      );

      if (isInWishlist) {
        console.log(`${destination.name} is already in the wishlist`);
      } else {
        // Ensure all fields are defined before adding to wishlist
        if (
          destination.id
        ) {
          await updateDoc(userDocRef, {
            wisheddestinations: arrayUnion({
              id: destination.id,
            }),
          });
          alert(`${destination.name} added to wishlist!`);
        } else {
          console.error("One or more fields are undefined");
        }
      }
    } catch (error) {
      console.error("Error updating wishlist:", error);
    }
  };

  const handleRemoveFromWishlist = async (destination: Destination) => {
    const user = auth.currentUser;
    if (!user) {
      console.error("User not authenticated");
      return;
    }

    try {
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);
      const userData = userDocSnap.data();

      // Check if destination is in the wishlist
      const isInWishlist = userData?.wisheddestinations?.some(
        (item: WishlistItem) => item.id === destination.id
      );

      if (isInWishlist) {
        // Ensure all fields are defined before removing from wishlist
        if (
          destination.id
        ) {
          await updateDoc(userDocRef, {
            wisheddestinations: arrayRemove({
              id: destination.id,
            }),
          });
          alert(`${destination.name} removed from wishlist!`);
        } else {
          console.error("One or more fields are undefined");
        }
      } else {
        console.log(`${destination.name} is not in the wishlist`);
      }
    } catch (error) {
      console.error("Error updating wishlist:", error);
    }
  };

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
        <>
          <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
            {destinations.map((destination) => {
              const isInWishlist = userData?.wisheddestinations?.some(
                (item: WishlistItem) => item.id === destination.id
              );

              return (
                <div className="" onClick={() => handleDestinationClick(destination.id)}>
                  <DirectionAwareHover
                    key={destination.id}
                    imageUrl={destination.thumbnailUrl}
                  >
                    <div className="">
                      <button
                        className={`absolute top-0 left-60 ${
                          isInWishlist ? "text-red-600" : "text-gray-400"
                        }`}
                        onClick={() => {
                          if (isInWishlist) {
                            handleRemoveFromWishlist(destination);
                          } else {
                            handleLike(destination);
                          }
                        }}
                      >
                        <FaHeart size={24} />
                      </button>
                      <h2 className="text-xl font-bold mb-2 text-center">
                        {destination.name}
                      </h2>
                      <p className="mb-2 text-center">
                        <strong>Wilaya:</strong> {destination.wilaya}
                      </p>
                      <p className="mb-2">
                        <strong>Category:</strong> {destination.category}
                      </p>
                      <p className="mb-2 flex items-center justify-center">
                        <strong className="mr-2">Rating:</strong>
                        {calculateAverageRating(destination.ratings) !==
                        "No ratings" ? (
                          <>
                            <span className="text-yellow-400 mr-1">
                              <FaStar />
                            </span>
                            <span>
                              {calculateAverageRating(destination.ratings)}
                            </span>
                          </>
                        ) : (
                          <span>No ratings</span>
                        )}
                      </p>
                    </div>
                  </DirectionAwareHover>
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default CategorisedDestinations;
