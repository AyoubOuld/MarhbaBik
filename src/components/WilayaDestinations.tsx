import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { collection, getDocs, updateDoc, arrayUnion, arrayRemove, getDoc, query, where, doc } from "firebase/firestore";
import { PuffLoader } from "react-spinners";
import { FaStar, FaHeart } from "react-icons/fa";
import { DirectionAwareHover } from "../ui/direction-aware-hover-wilaya.tsx";

//@ts-ignore
import { db, auth } from "../config/firebase";

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


const WilayaDestinations = () => {
  const { wilayaName } = useParams<{ wilayaName: string }>();
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<any>(null);
  const navigate = useNavigate();

  const calculateAverageRating = (ratings?: number[]) => {
    if (!ratings || ratings.length === 0) return "No ratings";
    const sum = ratings.reduce((acc, rating) => acc + rating, 0);
    const average = sum / ratings.length;
    return average.toFixed(1);
  };

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const q = query(
          collection(db, "destinations"),
          where("wilaya", "==", wilayaName)
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
  }, [wilayaName]);

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

  const handleDestinationClick = (id: string) => {
    navigate(`/destination/${encodeURIComponent(id)}`);
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

      const isInWishlist = userData?.wisheddestinations?.some(
        (item: any) => item.id === destination.id
      );

      if (isInWishlist) {
        console.log(`${destination.name} is already in the wishlist`);
      } else {
        if (destination.id) {
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

      const isInWishlist = userData?.wisheddestinations?.some(
        (item: any) => item.id === destination.id
      );

      if (isInWishlist) {
        if (destination.id) {
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
                <DirectionAwareHover
                  key={destination.id}
                  imageUrl={destination.thumbnailUrl}
                  className="w-100 md:w-auto"
                >
                  <div className="relative">
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
                    <div onClick={() => handleDestinationClick(destination.id)}>
                      <div className="">
                        <div className="flex w-full">
                          <p className="mb-2 mr-2">
                            <strong>{destination.category}</strong>
                          </p>
                          <p className="mb-2 flex items-center justify-center">
                            <strong className="mr-2 flex">
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
                            </strong>
                          </p>
                        </div>
                        <h2 className="text-xl font-bold mb-2">
                          {destination.name}
                        </h2>
                      </div>
                    </div>
                  </div>
                </DirectionAwareHover>
              );
            })}
          </div>
        </>
      )}
    </>
  );
  
};

export default WilayaDestinations;
