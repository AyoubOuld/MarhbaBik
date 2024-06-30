import { FooterMB } from "../components/FooterMB";
import { Testimonial } from "../components/Testimonial";
import "../index.css";
import "../assets/App.css";
import woman from "../imgs/aboutus.png";
import { CardHoverEffectDemo } from "../ui/card-hover-effectComp";
import numbers from "../imgs/numbers.png";
import bg from "../imgs/bg.jpg";

export const About = () => {
  return (
    <>
      <div className="bg-white pt-16">
        <div className="py-40 flex flex-col items-center justify-center gap-10 bg-cover bg-center bg-no-repeat w-full h-screen"
        style={{ backgroundImage: `url(${bg})` }}>
          <span className="font-700 text-6xl">
            <span className="text-mh-dark">About </span>
            <span className="text-mh-blue">us </span>
          </span>
          <p className="w-4/5 text-center text-mh-dark font-200 text-2xl leading-loose ">
            Welcome to <span className="text-mh-blue font-700">MarhbaBik</span>, your gateway to experiencing the authentic
            charm and beauty of our homeland. We are a passionate team dedicated
            to revolutionizing travel by connecting you with genuine local
            experiences in a seamless and enjoyable way.
          </p>
        </div>
        <div className="p-8 md:p-20 lg:p-32 bg-mh-dark flex flex-col items-center justify-center text-center">
          <span className="text-white text-5xl font-900 mb-8">
            MarhbaBik is <span className="text-mh-blue">Growing!</span>
          </span>
          <div className="lg:flex flex-col md:flex-row lg:flex-row items-center justify-center w-full">
            <div className="mb-8 md:mb-0 md:mr-8 lg:mr-8">
              <img src={numbers} alt="" />
            </div>
            <div className="flex items-center justify-center flex-col">
              <CardHoverEffectDemo />
            </div>
          </div>
        </div>
        <div className=" flex flex-col items-center bg-mh-blue">
          <div className="flex flex-col items-center">
            <Testimonial />
          </div>
          <img src={woman} alt="" className="" />{" "}
        </div>

        <FooterMB />
      </div>
    </>
  );
};
