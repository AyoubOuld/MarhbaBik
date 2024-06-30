"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards-wilaya";
//@ts-ignore
import { db } from "../config/firebase"; // Adjust the import if needed

// Define Destination interface
interface Destination {
  id: string;
  name: string;
  wilaya: string;
  description: string;
  category: string;
  thumbnailUrl: string;
  otherPicturesUrls: string[];
  region: string;
}

// Define props interface
interface ShowDestinationProps {
  selectedRegion: string;
}

const ShowActivities = ({ selectedRegion }: ShowDestinationProps) => {
  const [destinations, setDestinations] = useState<Destination[]>([]);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const q = query(
          collection(db, "destinations"),
          where("region", "==", selectedRegion)
        );
        const querySnapshot = await getDocs(q);
        const destinationsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Destination[];
        setDestinations(destinationsData);
      } catch (error) {
        console.error("Error fetching destinations:", error);
      }
    };
    fetchDestinations();
  }, [selectedRegion]);

  const testimonials = destinations.map((destination) => ({
    quote: "",
    name: destination.name,
    title: destination.category,
    thumbnailUrl: destination.thumbnailUrl, // Change 'thumbnail' to 'thumbnailUrl'
  }));

  return (
    <div className="h-[20rem] rounded-md flex flex-col antialiased dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden ">
      <InfiniteMovingCards items={testimonials} direction="right" speed="normal" />
    </div>
  );
};

export default ShowActivities;
