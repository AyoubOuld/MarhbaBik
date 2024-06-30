import { useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { setDoc, doc } from "firebase/firestore";
import { Button, Label, TextInput, Textarea, Select } from "flowbite-react";
import { toast } from "react-toastify";
//@ts-ignore
import { db } from "../config/firebase"; // Update the path as necessary

const wilayas = [
  "Adrar", "Chlef", "Laghouat", "Oum El Bouaghi", "Batna", "Bejaia", 
  "Biskra", "Bechar", "Blida", "Bouira", "Tamanrasset", "Tebessa", 
  "Tlemcen", "Tiaret", "Tizi Ouzou", "Algiers", "Djelfa", "Jijel", 
  "Setif", "Saida", "Skikda", "Sidi Bel Abbes", "Annaba", "Guelma", 
  "Constantine", "Medea", "Mostaganem", "M'Sila", "Mascara", "Ouargla", 
  "Oran", "El Bayadh", "Illizi", "Bordj Bou Arreridj", "Boumerdes", 
  "El Tarf", "Tindouf", "Tissemsilt", "El Oued", "Khenchela", 
  "Souk Ahras", "Tipaza", "Mila", "Ain Defla", "Naama", "Ain Temouchent", 
  "Ghardaia", "Relizane"
];

const AddWilaya = () => {
  const [title, setTitle] = useState("");
  const [wilayaID, setWilayaID] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [regions, setRegions] = useState<string[]>([]);
  const [image, setImage] = useState<File | null>(null);

  const handleImageUpload = async (imageFile: File) => {
    const storage = getStorage();
    const storageRef = ref(storage, `wilayas/${imageFile.name}`);
    await uploadBytes(storageRef, imageFile);
    const url = await getDownloadURL(storageRef);
    return url;
  };

  const handleAddWilaya = async () => {
    try {
      if (image) {
        const imageUrl = await handleImageUpload(image);

        const wilayaDocRef = doc(db, "wilayas", wilayaID);

        await setDoc(wilayaDocRef, {
          title,
          wilayaID,
          name,
          description,
          regions,
          imageUrl,
        });

        // Reset form
        setTitle("");
        setWilayaID("");
        setName("");
        setDescription("");
        setRegions([]);
        setImage(null);

        toast.success("Wilaya added successfully!");
      } else {
        alert("Please select an image.");
      }
    } catch (error) {
      console.error("Error adding wilaya:", error);
      alert("Error adding wilaya.");
    }
  };

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setRegions(selectedOptions);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleAddWilaya();
      }}
      className="max-w-md mx-auto p-4 border rounded-lg"
    >
      <div className="mb-4">
        <Label htmlFor="title" value="Title" />
        <TextInput
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="name" value="Name" />
        <Select
          id="wilayaID"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        >
          <option value="" disabled>Select Wilaya</option>
          {wilayas.map((wilaya) => (
            <option key={wilaya} value={wilaya}>{wilaya}</option>
          ))}
        </Select>
      </div>
      <div className="mb-4">
        <Label htmlFor="wilayaID" value="wilayaID" />
        <TextInput
          id="name"
          type="text"
          value={wilayaID}
          onChange={(e) => setWilayaID(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="description" value="Description" />
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="regions" value="Regions" />
        <Select
          id="regions"
          multiple
          value={regions}
          onChange={handleRegionChange}
          required
        >
          <option value="center">Center</option>
          <option value="kabylie">Kabylie</option>
          <option value="west">West</option>
          <option value="east">East</option>
          <option value="aures">Aures</option>
          <option value="sahara">Sahara</option>
        </Select>
      </div>
      <div className="mb-4">
        <Label htmlFor="image" value="Image" />
        <input
          id="image"
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files) {
              setImage(e.target.files[0]);
            }
          }}
          required
        />
      </div>
      <Button type="submit">Add Wilaya</Button>
    </form>
  );
};

export default AddWilaya;
