import React, { useState, useEffect } from "react";
import { Button, Label, TextInput, FileInput, Textarea } from "flowbite-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc, collection, getDocs } from "firebase/firestore";
//@ts-ignore
import { db, storage } from "../config/firebase"; // Assuming firestore and storage are initialized

const AddDestination = () => {
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [region, setRegion] = useState("");
  const [wilaya, setWilaya] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [otherPictures, setOtherPictures] = useState<File[]>([]);
  const [thumbnailPreviewUrl, setThumbnailPreviewUrl] = useState<string | null>(
    null
  );
  const [otherPicturesPreviewUrls, setOtherPicturesPreviewUrls] = useState<
    string[]
  >([]);
  const [wilayas, setWilayas] = useState<string[]>([]);

  const regions = ["aures", "kabylie", "center", "west", "east", "sahara"];
  const categories = ["Arcade", "Natural", "Cultural", "Historical"];

  useEffect(() => {
    const fetchWilayas = async () => {
      const wilayasCollection = collection(db, "wilayas");
      const wilayasSnapshot = await getDocs(wilayasCollection);
      const wilayasList = wilayasSnapshot.docs.map((doc) => doc.data().name);
      setWilayas(wilayasList);
    };

    fetchWilayas();
  }, []);

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setThumbnail(e.target.files[0]);
      setThumbnailPreviewUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleOtherPicturesChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setOtherPictures(filesArray);
      const urls = filesArray.map((file) => URL.createObjectURL(file));
      setOtherPicturesPreviewUrls(urls);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!thumbnail) {
        toast.error("Please upload a thumbnail picture.");
        return;
      }

      // Upload thumbnail to Firebase Storage
      const thumbnailRef = ref(storage, `destinations/${thumbnail.name}`);
      await uploadBytes(thumbnailRef, thumbnail);
      const thumbnailUrl = await getDownloadURL(thumbnailRef);

      // Upload other pictures to Firebase Storage
      const otherPicturesUrls = await Promise.all(
        otherPictures.map(async (file) => {
          const otherPictureRef = ref(storage, `destinations/${file.name}`);
          await uploadBytes(otherPictureRef, file);
          return getDownloadURL(otherPictureRef);
        })
      );

      // Store destination data in Firestore
      await setDoc(doc(db, "destinations", name), {
        title, // Add title field here
        name,
        region,
        wilaya,
        category,
        description,
        thumbnailUrl,
        otherPicturesUrls,
      });

      toast.success("Destination added successfully!");

      // Reset form fields
      setTitle("");
      setName("");
      setRegion("");
      setWilaya("");
      setCategory("");
      setDescription("");
      setThumbnail(null);
      setOtherPictures([]);
      setThumbnailPreviewUrl(null);
      setOtherPicturesPreviewUrls([]);
    } catch (error) {
      console.error("Error adding destination:", error);
      toast.error("Failed to add destination");
    }
  };

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <Label htmlFor="title" value="Title" />
          <TextInput
            id="title"
            type="text"
            required
            shadow
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="name" value="Destination Name" />
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
          <select
            id="wilaya"
            required
            className="block w-full px-4 py-2 mt-2 text-base text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            onChange={(e) => setWilaya(e.target.value)}
            value={wilaya}
          >
            <option disabled>select a wilaya</option>
            {wilayas.map((wilaya) => (
              <option key={wilaya} value={wilaya}>
                {wilaya}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="region" value="Home Region" />
          <select
            id="region"
            required
            className="block w-full px-4 py-2 mt-2 text-base text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            onChange={(e) => setRegion(e.target.value)}
            value={region}
          >
              <option disabled>select a region</option>
            {regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="category" value="Category" />
          <select
            id="category"
            required
            className="block w-full px-4 py-2 mt-2 text-base text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          >
            <option disabled>select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="description" value="Destination Description" />
          <Textarea
            id="description"
            required
            shadow
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="thumbnail" value="Thumbnail Picture" />
          <FileInput
            id="thumbnail"
            className="hidden"
            accept="image/*"
            onChange={handleThumbnailChange}
          />
          <div className="flex justify-center">
            {thumbnailPreviewUrl && (
              <img
                src={thumbnailPreviewUrl}
                alt="Thumbnail Preview"
                className="max-h-40 rounded-lg"
              />
            )}
          </div>
          <Label htmlFor="thumbnail" className="thumbnail-label">
            Click to upload thumbnail
          </Label>
        </div>
        <div>
          <Label htmlFor="otherPictures" value="Other Pictures" />
          <FileInput
            id="otherPictures"
            className="hidden"
            accept="image/*"
            multiple
            onChange={handleOtherPicturesChange}
          />
          <div className="flex flex-wrap justify-center">
            {otherPicturesPreviewUrls.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Other Picture ${index + 1} Preview`}
                className="rounded mx-1 max-h-28"
              />
            ))}
          </div>
          <Label htmlFor="otherPictures" className="other-picture-label">
            Click to upload other pictures
          </Label>
        </div>
        <Button type="submit">Add Destination</Button>
      </form>
    </>
  );
};

export default AddDestination;
