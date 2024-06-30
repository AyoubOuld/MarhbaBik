import { useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import home from "../imgs/home.png";
//@ts-ignore
import { auth, googleProvider } from "../config/firebase";
import { FooterMB } from "./FooterMB";

const Loginform = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/Destinations");
      toast.success("Log in with successful!");
    } catch (e) {
      console.error(e);
      toast.error("Log in failed");
    }
  };

  return (
    <>
      <ToastContainer />

      <div className="pt-16 bg-white">
        <div className="w-full font-800 mt-14 mb-10">
          <h1 className="text-5xl text-center text-black">
            Log in to <span className="text-mh-blue">MarhbaBik</span>
          </h1>
        </div>
        <div className=" lg:flex lg:flex-row-reverse justify-around">
          <div className="w-full flex justify-center">
            <div className="bg-slate-100 p-5 lg:mr-20 m-5 rounded-md">
              <div className="w-full">
                <h1 className="text-mh-blue text-center text-2xl">Log in </h1>
              </div>
              <div className="flex justify-center">
                <form className="flex max-w-md flex-col gap-4">
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="email2" value="Your email" />
                    </div>
                    <TextInput
                      id="email2"
                      type="email"
                      placeholder="marhbabik@gmail.com"
                      required
                      shadow
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="password2" value="Your password" />
                    </div>
                    <TextInput
                      id="password2"
                      type="password"
                      placeholder="********"
                      required
                      shadow
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Label htmlFor="agree" className="flex">
                      please enter your data correctly <br />
                    </Label>
                  </div>
                  <Button onClick={handleLogin}>Log in</Button>
                </form>
              </div>
            </div>
          </div>
          <div className="lg:w-2/3 lg:ml-20 lg:px-0 px-10">
            <div className="flex w-full justify-center">
              <img src={home} alt="" />
            </div>
          </div>
        </div>
      </div>
      <FooterMB />
    </>
  );
};

export default Loginform;
