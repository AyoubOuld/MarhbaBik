import { useState } from "react";
import { Button, Label, TextInput, FileInput, Checkbox } from "flowbite-react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
} from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

//@ts-ignore
import { auth, googleProvider, db, storage } from "../config/firebase"; // Assuming firestore is initialized


const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [profilePicture, setProfileImage] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      let imageUrl = null;
      // Upload profile image to Firebase Storage
      if (profilePicture) {
        const storageRef = ref(
          storage,
          `ProfilePictures/${user.uid}/${profilePicture.name}`
        );
        await uploadBytes(storageRef, profilePicture);
        imageUrl = await getDownloadURL(storageRef);
      }

      await sendEmailVerification(user);
      toast.success("Signup successful! Verification email sent.");

      // Create a Firestore collection for the user
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, {
        email: user.email,
        firstName: firstName,
        lastName: lastName,
        personalDataProvided: "true",
        phoneNumber: phone,
        profilePicture: imageUrl, // Add the imageUrl field
        role: "traveler",
        uid: user.uid,
      });
    } catch (e) {
      console.error(e);
      toast.error("Signup failed");
    } 
  };

  const handleSigninWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Sign in with Google successful!");
      navigate("/Welcome");
    } catch (e) {
      console.error(e);
      toast.error("Sign in with Google failed");
    }
  };

  return (
    <>
      <ToastContainer />
      <form className="flex max-w-md flex-col gap-4 my-5 bg-slate-100 p-4 rounded-md">
        <div>
          <Label htmlFor="profileImage" value="Profile Picture"/>
          <FileInput id="dropzone-file" className="hidden"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setProfileImage(e.target.files[0]);
                setImagePreviewUrl(URL.createObjectURL(e.target.files[0]));
              }
            }} />
        </div>
        <div className="flex w-full items-center justify-center">
          <Label
            htmlFor="dropzone-file"
            className="flex h-32 w-32 cursor-pointer flex-col items-center justify-center rounded-full border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pb-6 pt-5">
              <svg
                className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span>
              </p>
            </div>
            
          </Label>
        </div>
        {imagePreviewUrl && <img src={imagePreviewUrl} alt="Profile Preview" />}
        <div>
          <Label htmlFor="email2" value="Your email" />
          <TextInput
            id="email2"
            type="email"
            placeholder="name@gmail.com"
            required
            shadow
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="password2" value="Your password" />
          <TextInput
            id="password2"
            type="password"
            placeholder=""
            required
            shadow
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label htmlFor="text" value="Your First Name" />
            <TextInput
              id="text1"
              type="text"
              required
              shadow
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Insert your first name"
            />
          </div>
          <div>
            <Label htmlFor="text" value="Your Last Name" />
            <TextInput
              id="text"
              type="text"
              required
              shadow
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Insert your last name"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="tel" value="Your Phone Number" />
          <TextInput
            id="tel"
            type="tel"
            required
            shadow
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Insert your phone number"
          />
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="agree" className="flex">
            <Checkbox className="mx-1"/>
                Agree to the 
              <Link to="/Terms&Conditions" className="text-green-700 underline mx-1">  terms & conditions.</Link>
          </Label>
        </div>
        
        <Button onClick={handleSignup}>Register new account</Button>
        <Button color="green" onClick={handleSigninWithGoogle}>
          Register with Google
        </Button>
        <div className="flex justify-center gap-2">
          <Label htmlFor="agree" className="flex">
            Already have an account ?
              <Link to="/Login" className="text-green-700 underline"> Log in here</Link>
          </Label>
        </div>
      </form>
    </>
  );
};

export default SignupForm;
