import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { LayoutGrid } from "../ui/layout-grid";
import { FaHeart, FaStar } from "react-icons/fa";
import type { User } from "firebase/auth";
//@ts-ignore
import { db, auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { Badge } from "flowbite-react";

interface Destination {
  id: string;
  name: string;
  wilaya: string;
  description: string;
  category: string;
  thumbnailUrl: string;
  otherPicturesUrls: string[];
  region: string;
  ratings?: number[];
  averageRating?: number;
}

interface ShowDestinationProps {
  selectedRegion: string;
}

const ShowDestination = ({ selectedRegion }: ShowDestinationProps) => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [user, setUser] = useState<User | null>(null); // Explicitly specify User type
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = () => {
      auth.onAuthStateChanged((user: User | null) => {
        if (user) {
          setUser(user); // Update user state when authentication state changes
        } else {
          setUser(null); // Set user state to null when user is signed out
        }
      });
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          setWishlist(userData?.wisheddestinations || []); // Update wishlist with user data
        }
      }
    };

    fetchWishlist();
  }, [user]); // Trigger fetchWishlist whenever user state changes

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "destinations"));
        const destinationsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Destination[];
        const filteredDestinations = destinationsData.filter(
          (dest) => dest.region === selectedRegion
        );

        await Promise.all(
          destinationsData.map(async (destination) => {
            const reviewsRef = doc(db, "DestinationsReviews", destination.id);
            const reviewsSnap = await getDoc(reviewsRef);
            if (reviewsSnap.exists()) {
              destination.ratings = reviewsSnap.data().ratings || [];
            }
          })
        );
        setDestinations(filteredDestinations);
      } catch (error) {
        console.error("Error fetching destinations:", error);
      }
    };
    fetchDestinations();
  }, [selectedRegion]);

  const handleDestinationClick = (id: string) => {
    navigate(`/destination/${encodeURIComponent(id)}`);
  };
  const handleLike = async (destination: Destination) => {
    if (!user) {
      alert("You have to log in to use this feature");
      return;
    }

    try {
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);
      const userData = userDocSnap.data();

      let updatedWishlist;
      if (userData?.wisheddestinations) {
        // Check if destination is already in the wishlist
        const isInWishlist = userData.wisheddestinations.some(
          (item: any) => item.id === destination.id
        );

        if (isInWishlist) {
          updatedWishlist = userData.wisheddestinations.filter(
            (item: any) => item.id !== destination.id
          );
          alert(`${destination.name} removed from wishlist!`);
        } else {
          updatedWishlist = [
            ...userData.wisheddestinations,
            { id: destination.id },
          ]; // Add destination id as a map
          alert(`${destination.name} added to wishlist!`);
        }
      } else {
        // If no wishlist exists, create a new one
        updatedWishlist = [{ id: destination.id }]; // Create a new array with the destination id as a map
        alert(`${destination.name} added to wishlist!`);
      }

      await updateDoc(userDocRef, {
        wisheddestinations: updatedWishlist,
      });

      setWishlist(updatedWishlist); // Update the local state of the wishlist
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

  const cards = destinations.map((destination, index) => ({
    id: index,
    content: (
      <div onClick={() => handleDestinationClick(destination.id)}>
        <p className="font-normal text-base my-4  max-w-lg text-neutral-200">
          <strong className="mr-2 flex">
            <Badge className="max-w-20 rounded-full text-center mr-2">
              {destination.category}
            </Badge>
            {calculateAverageRating(destination.ratings) !== "No ratings" ? (
              <>
                <span className="text-yellow-400 mr-1">
                  <FaStar />
                </span>
                <span>{calculateAverageRating(destination.ratings)}</span>
              </>
            ) : (
              <span>No ratings</span>
            )}
          </strong>
        </p>
        <p className="text-2xl text-white">
          <span className="font-bold text-4xl">{destination.name},</span>{" "}
          {destination.wilaya}
        </p>
        <button
          className="absolute top-1 right-1"
          onClick={() => handleLike(destination)}
        >
          <FaHeart
            size={24}
            className={`inline-block mr-2 ${
              wishlist.includes(destination.id)
                ? "text-red-600"
                : "hover:text-red-600"
            }`}
          />
        </button>
      </div>
    ),
    className: `col-span-1 md:col-span-2 lg:col-span-1`,
    thumbnail: destination.thumbnailUrl,
  }));

  return (
    <>
      <div className="py-20 w-full">
        <LayoutGrid cards={cards} />
      </div>
    </>
  );
};

export default ShowDestination;
