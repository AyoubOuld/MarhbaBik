import React, { useState, useEffect } from "react";
import { Button, Label, Select } from "flowbite-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { doc, setDoc, collection, getDocs } from "firebase/firestore";
//@ts-ignore
import { db } from "../config/firebase"; // Assuming firestore is initialized

const AddPlannedTrip = () => {
  const [wilayaName, setWilayaName] = useState("");
  const [destinationNames, setDestinationNames] = useState<string[]>([]);
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([]);
  const [wilayas, setWilayas] = useState<string[]>([]);

  useEffect(() => {
    const fetchWilayas = async () => {
      const querySnapshot = await getDocs(collection(db, "wilayas"));
      const names = querySnapshot.docs.map((doc) => doc.id);
      setWilayas(names);
    };

    fetchWilayas();
  }, []);

  useEffect(() => {
    const fetchDestinationNames = async () => {
      const querySnapshot = await getDocs(collection(db, "destinations"));
      const names = querySnapshot.docs.map((doc) => doc.id);
      setDestinationNames(names);
    };

    fetchDestinationNames();
  }, []);

  const handleAddPlannedTrip = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!wilayaName || selectedDestinations.length === 0) {
        throw new Error("Wilaya and Destinations cannot be empty");
      }

      const tripData = {
        wilaya: wilayaName,
        destinations: selectedDestinations.reduce((acc: { [key: string]: boolean }, destination: string) => {
          acc[destination] = true;
          return acc;
        }, {}),
      };

      await setDoc(doc(db, "MarhbaBikTrips", wilayaName), tripData, {
        merge: true,
      });

      toast.success("Planned trip added successfully!");

      // Reset form fields
      setWilayaName("");
      setSelectedDestinations([]);
    } catch (error) {
      console.error("Error adding planned trip:", error);
      toast.error("Failed to add planned trip");
    }
  };

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleAddPlannedTrip} className="flex flex-col gap-4">
        <div>
          <Label htmlFor="wilayaName" value="Select Wilaya" />
          <Select
            id="wilayaName"
            required
            shadow
            value={wilayaName}
            onChange={(e) => setWilayaName(e.target.value)}
          >
            <option value="" disabled>
              Select Wilaya
            </option>
            {wilayas.map((wilaya) => (
              <option key={wilaya} value={wilaya}>
                {wilaya}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <Label htmlFor="destinationNames" value="Select Destinations" />
          <Select
            id="destinationNames"
            required
            shadow
            multiple
            value={selectedDestinations}
            onChange={(e) => {
              const selectedOptions = Array.from(e.target.selectedOptions).map((option) => option.value);
              setSelectedDestinations(selectedOptions);
            }}
          >
            {destinationNames.map((destination) => (
              <option key={destination} value={destination}>
                {destination}
              </option>
            ))}
          </Select>
        </div>
        <Button type="submit">Add Planned Trip</Button>
      </form>
    </>
  );
};

export default AddPlannedTrip;
