import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { FaStar } from "react-icons/fa";
//@ts-ignore
import { db } from "../config/firebase";
import { Badge } from "flowbite-react";

const calculateAverageRating = (ratings?: number[]) => {
  if (!ratings || ratings.length === 0) return "No ratings";
  const sum = ratings.reduce((acc, rating) => acc + rating, 0);
  const average = sum / ratings.length;
  return average.toFixed(1); // Return the average rating rounded to one decimal place
};

const fetchDestinationData = async (destinationId: string) => {
  const destinationDoc = await getDoc(doc(db, "destinations", destinationId));
  const destinationData = destinationDoc.data();

  const reviewsRef = doc(db, "DestinationsReviews", destinationId);
  const reviewsSnap = await getDoc(reviewsRef);
  const ratings = reviewsSnap.exists() ? reviewsSnap.data().ratings : [];

  const imagesPromises = (destinationData?.otherPicturesUrls || []).map(
    async (url: string) => {
      try {
        const response = await fetch(url);
        if (!response.ok)
          throw new Error(
            `Failed to fetch image from ${url}: ${response.statusText}`
          );
        const imageBlob = await response.blob();
        return URL.createObjectURL(imageBlob);
      } catch (error) {
        console.error("Error fetching image:", error);
        return ""; // Return an empty string or a placeholder image URL in case of error
      }
    }
  );

  const images = await Promise.all(imagesPromises);

  return {
    ...destinationData,
    id: destinationId,
    otherPicturesUrls: images,
    ratings,
  };
};

const PlannedTrip = ({ wilayaName }: { wilayaName: string }) => {
  const [trips, setTrips] = useState<any[]>([]);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const q = query(
          collection(db, "MarhbaBikTrips"),
          where("wilaya", "==", wilayaName)
        );
        const querySnapshot = await getDocs(q);
        const tripsData = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return Object.keys(data.destinations || {});
        });
        const flattenedTrips = tripsData.flat();

        const detailedTrips = await Promise.all(
          flattenedTrips.map(fetchDestinationData)
        );

        setTrips(detailedTrips);
      } catch (error) {
        console.error("Error fetching trips:", error);
      }
    };

    fetchTrips();
  }, [wilayaName]);

  return (
    <div className="relative w-full">
      <ul className="timeline timeline-vertical">
        {trips.map((destination, idx) => (
          <li key={idx}>
            <div
              className={`timeline-${
                idx % 2 === 0 ? "start" : "end"
              } timeline-box p-4 bg-gray-50 border-0 shadow-xl rounded-lg text-black`}
            >
              <div className="flex items-center mb-2">
                <h2 className="text-xl font-black">{destination?.name}</h2>
              </div>
              <p className="mb-2">{destination?.description}</p>
              <Badge className="w-16 rounded-full">{destination?.category}</Badge>
              <div className="flex items-center mb-2">
                <span>{calculateAverageRating(destination?.ratings)}</span>
                <FaStar className="text-yellow-400 ml-1" />
              </div>
              <img
                src={destination?.thumbnailUrl}
                alt={destination?.name}
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="timeline-start">
            </div>
            {idx < trips.length && <hr className=" timeline-start"/>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlannedTrip;
