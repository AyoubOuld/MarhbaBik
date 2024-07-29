import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { getAuth } from "firebase/auth";
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import '../assets/App.css'
//@ts-ignore
import { db, storage } from "../config/firebase";

const categories = ["Cultural", "Historical", "Fun", "Informative", "Reviews", "Other"];
const wilayas = [
    "Adrar",
    "Chlef",
    "Laghouat",
    "Oum El Bouaghi",
    "Batna",
    "Béjaïa","Biskra","Béchar","Blida","Bouira",
    "Tamanrasset","Tébessa","Tlemcen","Tiaret","Tizi Ouzou",
    "Alger",
    "Djelfa",
    "Jijel",
    "Sétif","Saïda","Skikda","Sidi Bel Abbès",
    "Annaba",
    "Guelma",
    "Constantine",
    "Médéa","Mostaganem","M'Sila","Mascara",
    "Ouargla","Oran",
    "El Bayadh",
    "Illizi",
    "Bordj Bou Arréridj","Boumerdès",
    "El Tarf",
    "Tindouf","Tissemsilt",
    "El Oued",
    "Khenchela",
    "Souk Ahras",
    "Tipaza",
    "Mila",
    "Aïn Defla",
    "Naâma",
    "Aïn Témouchent",
    "Ghardaïa",
    "Relizane",
  ];  

const AddBlog = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [images, setImages] = useState<FileList | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedWilaya, setSelectedWilaya] = useState<string>("");
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const auth = getAuth();
  const user = auth.currentUser;

  const handleImageUpload = async (image: File) => {
    const imageRef = ref(storage, `blogs/${title}/${uuidv4()}`);
    const uploadTask = uploadBytesResumable(imageRef, image);

    return new Promise<string>((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          console.error("Image upload failed:", error);
          reject(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        }
      );
    });
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((cat) => cat !== category) : [...prev, category]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      alert("You must be logged in to submit a blog post.");
      return;
    }

    if (!title || !content || !images || images.length === 0 || selectedCategories.length === 0 || !selectedWilaya) {
      alert("Please fill in all fields, select at least one category, and select a wilaya.");
      return;
    }

    try {
      const blogId = uuidv4();
      const imageUrls = await Promise.all(
        Array.from(images).map((image) => handleImageUpload(image))
      );

      const blogData = {
        title,
        content,
        imageUrls,
        categories: selectedCategories,
        wilaya: selectedWilaya,
        timestamp: new Date(),
      };

      const userBlogRef = doc(db, "Blogs", user.uid);
      const userBlogSnap = await getDoc(userBlogRef);

      if (userBlogSnap.exists()) {
        await updateDoc(userBlogRef, {
          [`blogs.${blogId}`]: blogData,
        });
      } else {
        await setDoc(userBlogRef, {
          userId: user.uid,
          blogs: {
            [blogId]: blogData,
          },
        });
      }

      setTitle("");
      setContent("");
      setImages(null);
      setSelectedCategories([]);
      setSelectedWilaya("");
      setUploadProgress(0);
      alert("Blog post submitted successfully!");
    } catch (error) {
      console.error("Error submitting blog post:", error);
      alert("Failed to submit blog post.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-black">Tell us a <span className="text-mh-blue">story</span></h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="block text-gray-700 font-bold mb-2">Content</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="images" className="block text-gray-700 font-bold mb-2">Images</label>
            <input
              type="file"
              id="images"
              multiple
              onChange={(e) => setImages(e.target.files)}
              required
              className="w-full px-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Categories</label>
            <div className="flex flex-wrap">
              {categories.map((category) => (
                <label key={category} className="inline-flex items-center mr-4 mt-2">
                  <input
                    type="checkbox"
                    value={category}
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                    className="form-checkbox h-5 w-5 text-mh-blue rounded-full"
                  />
                  <span className="ml-2 text-gray-700">{category}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="wilaya" className="block text-gray-700 font-bold mb-2">Wilaya</label>
            <select
              id="wilaya"
              value={selectedWilaya}
              onChange={(e) => setSelectedWilaya(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>Select a Wilaya</option>
              {wilayas.map((wilaya) => (
                <option key={wilaya} value={wilaya}>{wilaya}</option>
              ))}
            </select>
          </div>
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="w-full px-4 py-3 mt-5 bg-mh-blue text-white font-bold rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 "
            >
              Submit
            </button>
          </div>
          {uploadProgress > 0 && (
            <div className="mt-4">
              <progress value={uploadProgress} max="100" className="w-full"></progress>
              <span>{uploadProgress.toFixed(2)}%</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
