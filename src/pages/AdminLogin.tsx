import { useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
//@ts-ignore
import { auth, googleProvider, db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Check if the user has the role of "admin" in Firestore
      const userRef = doc(db, "users", user.uid);
      const userSnapshot = await getDoc(userRef);
      const userData = userSnapshot.data();

      if (userData && userData.role === "admin") {
        navigate("/Add");
        toast.success("Log in successful!");
      } else {
        toast.error("You do not have permission to log in as an admin.");
      }
    } catch (e) {
      console.error(e);
      toast.error("Log in failed");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="flex justify-center bg-white">
        <form className="flex max-w-md flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email2" value="Admin's email" />
            </div>
            <TextInput
              id="email2"
              type="email"
              placeholder="name@flowbite.com"
              required
              shadow
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password2" value="Admin's password" />
            </div>
            <TextInput
              id="password2"
              type="password"
              required
              shadow
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="agree" className="flex">
              Please enter your correct data Admin!
            </Label>
          </div>
          <Button onClick={handleLogin}>Log in</Button>
        </form>
      </div>
    </>
  );
};

export default AdminLogin;
