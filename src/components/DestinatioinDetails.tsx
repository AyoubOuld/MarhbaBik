import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { PuffLoader } from "react-spinners";
import { FaStar } from "react-icons/fa";
import "../assets/App.css";
//@ts-ignore
import { db } from "../config/firebase"; // Adjust the import path if necessary
import AddRating from "./AddRating";
import ShowRating from "./ShowRating";

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

const DestinationDetails = () => {
  const { destinationId } = useParams<{ destinationId: string }>();
  const [destination, setDestination] = useState<Destination | null>(null);
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
          <>
            <div
              className="parallax-mh"
              style={{ backgroundImage: `url(${destination.thumbnailUrl})` }}
            >
              <div className="overlay-mh">
                <h1 className="wilaya-name">{destination.name}</h1>
              </div>
            </div>
            <div className="md:flex">
              <div className=" rounded-lg shadow-slate-200 shadow-md md:w-2/3 m-10 bg-slate-50 p-8">
                <h1 className="text-5xl mb-3 text-mh-dark font-800 text-center">
                  {" "}
                  About <span className="text-mh-blue">{destination.name}</span> 
                </h1>
                <div className="badge badge-accent">{destination.category}</div>
                <div className="flex flex-col w-full border-opacity-50">
                  <div className="">
                    <p className="my-2">
                      {destination.description}
                    </p>
                  </div>
                  <div className="divider"></div>
                  <div className="">
                    <p className=" ">
                      <span className="text-mh-dark font-800">Wilaya:</span> {destination.wilaya}
                    </p>
                    <p className=" flex ">
                      <span className="mr-2 text-mh-dark font-800">Rating:</span>
                      {calculateAverageRating(ratings)}
                      <span className="text-yellow-400 mt-1">
                        <FaStar />
                      </span>
                    </p>
                  </div>
                  <div className="divider"></div>
                </div>
              </div>

              <div className="container mx-auto p-4 mt-6">
                <img
                  src={destination.thumbnailUrl}
                  alt={destination.name}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {destination.otherPicturesUrls.map((url, index) => (
                    <img
                      key={index}
                      src={url}
                      alt={`Other Picture ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="m-2">
            <ShowRating/>
            </div>
            <AddRating/>
          </>
        )
      )}
    </>
  );
};

export default DestinationDetails;
