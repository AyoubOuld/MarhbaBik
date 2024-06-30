import { FooterMB } from "../components/FooterMB";
import Signupform from "../components/Signupform";
import Man from "../imgs/man.png";

export function Signup() {
  return (
    <>
      <div className="bg-white py-16">
        <div className="w-full font-800 mt-14 mb-10">
          <h1 className="text-5xl text-center text-black">
            Sign up <span className="text-mh-blue">now!</span>
          </h1>
        </div>
        <div className="lg:flex w-full flex-row-reverse">
          <div className=" w-full flex justify-center">
            <Signupform />
          </div>
          <div className="lg:w-2/3 lg:pl-10 lg:px-0 px-5 flex h-full self-center">
            <img src={Man} alt="" />
          </div>
        </div>
      </div>
      <FooterMB />
    </>
  );
}
