import React, { useState } from "react";
import { Button, Label, TextInput, FileInput, Select } from "flowbite-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
//@ts-ignore
import { db, storage } from "../config/firebase";

const AddActivities = () => {
  const [name, setName] = useState("");
  const [wilaya, setWilaya] = useState("");
  const [destination, setDestination] = useState("");
  const [categories, setCategory] = useState<string[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setImageUrl(URL.createObjectURL(e.target.files[0])); // Update image preview
    }
  };

  const wilayas = [
    "Adrar","Ain Defla","Ain Temouchent","Algiers","Annaba",
    "Batna","Bechar","Bejaia","Biskra","Blida","Bordj Bou Arreridj","Bouira","Boumerdes",
    "Chlef","Constantine",
    "Djelfa","El Bayadh","El Oued","El Tarf",
    "Ghardaia","Guelma",
    "Illizi",
    "Jijel",
    "Khenchela",
    "Laghouat",
    "Mascara","Medea","Mila","Mostaganem","M'Sila",
    "Naama",
    "Oran","Ouargla","Oum El Bouaghi",
    "Relizane",
    "Saida","Setif","Sidi Bel Abbes","Skikda","Souk Ahras","Tamanrasset",
    "Tebessa","Tiaret","Tindouf","Tipaza","Tissemsilt","Tizi Ouzou","Tlemcen",
  ];

  const category = ["Sports", "Leisure", "Adventure", "Cultural", "Family"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!image) {
        toast.error("Please upload an image.");
        return;
      }
      
      // Upload image to Firebase Storage
      const imageRef = ref(storage, `activities/${image.name}`);
      await uploadBytes(imageRef, image);
      const url = await getDownloadURL(imageRef);

      // Store activity data in Firestore
      await setDoc(doc(db, "activities", name), {
        name,
        destination,
        categories,
        wilaya,
        imageUrl: url,
      });

      toast.success("Activity added successfully!");
      // Reset form fields
      setName("");
      setWilaya("");
      setDestination("");
      setCategory([]);
      setImage(null);
      setImageUrl(null);
    } catch (error) {
      console.error("Error adding activity:", error);
      toast.error("Failed to add activity");
    }
  };

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <Label htmlFor="name" value="Activity Name" />
          <TextInput
            id="name"
            type="text"
            required
            shadow
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="wilaya" value="Home Wilaya" />
          <Select
            id="wilaya"
            required
            shadow
            value={wilaya}
            onChange={(e) => setWilaya(e.target.value)}
          >
            {wilayas.map((wilaya) => (
              <option key={wilaya} value={wilaya}>
                {wilaya}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <Label htmlFor="destination" value="Destination Name" />
          <TextInput
            id="destination"
            type="text"
            required
            shadow
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="categories" value="Categories" />
          <Select
            id="categories"
            required
            shadow
            value={categories}
            multiple
            onChange={(e) =>
              setCategory(Array.from(e.target.selectedOptions, (option) => option.value))
            }
          >
            {category.map((categories) => (
              <option key={categories} value={categories}>
                {categories}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <Label htmlFor="image" value="Image" />
          <FileInput
            id="image"
            accept="image/*"
            onChange={handleImageChange}
          />
          {imageUrl && (
            <div className="flex justify-center mt-4">
              <img
                src={imageUrl}
                alt="Image Preview"
                className="max-h-40 rounded-lg"
              />
            </div>
          )}
        </div>
        <Button type="submit">Add Activity</Button>
      </form>
    </>
  );
};

export default AddActivities;