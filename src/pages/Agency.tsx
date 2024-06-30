import { Button } from "flowbite-react";
import { FooterMB } from "../components/FooterMB";
import trip from "../imgs/trip.png";
import step1 from "../imgs/Step1.png";
import step2_trip from "../imgs/Step2-Trip.png";
import step3 from "../imgs/Step3.png";
import step4_trip from "../imgs/Step4-Trip.png";
import { Testimonial } from "../components/Testimonial";
import numbers from "../imgs/numbers.png";
import { CardHoverEffectDemo } from "../ui/card-hover-effectComp";

export const Agency = () => {
  return (
    <>
      <div className="bg-white pt-16">
        <div className="lg:flex lg:flex-row-reverse bg-mh-dark p-24">
          <div className=" lg:w-1/2 flex flex-col justify-center p-4 items-center md:items-start gap-8">
            <p className="text-white font-900 text-5xl md:text-left leading-normal">
              Host with MarhbaBik,{" "}
              <p className="text-mh-blue">Earn from Your Home.</p>
            </p>
            <p className="text-white font-300 text-xl leading-normal text-center md:text-left">
              Thousands of homeowners have boosted their income with MarhbaBik.
              Now it’s your turn!
            </p>
            <Button className="p-2 bg-mh-blue font-500" pill size="lg">
              Join Marhbabik
            </Button>
          </div>
          <div className="mb-8 lg:w-1/2 lg:h-1/2 md:mb-0 md:mr-8 flex justify-center">
            <img src={trip} alt="Service Image" className="" />
          </div>
        </div>
        <div className="bg-mh-blue p-8 md:p-32 box-border">
          <div className="flex justify-center mb-8">
            <span className="text-white font-bold text-3xl md:text-5xl text-center p-4 md:p-8">
              Become a part of <span className="text-mh-dark">MarhbaBik</span>
            </span>
          </div>
          <div className="flex flex-col md:flex-row overflow-hidden">
            <div className="flex-1 mb-8 flex justify-center">
              <img src={step1} alt="Service Image" className="max-w-full" />
            </div>
            <div className="flex-1 flex flex-col justify-center items-center md:items-start gap-4 md:gap-8 box-border">
              <div className="bg-white p-4 md:p-8 rounded-3xl box-border">
                <p className="text-mh-dark font-bold text-3xl md:text-5xl md:text-left leading-loose">
                  Registration
                </p>
                <p className="text-mh-dark font-medium text-lg md:text-xl leading-normal text-center md:text-left">
                  Register by clicking on the button below and fill in all the
                  necessary information regarding you and your vehicle.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row py-16 md:py-32 px-8 md:px-20 ">
          <div className="flex-1 flex flex-col justify-center items-center md:items-start gap-4 md:gap-8">
            <div className="bg-mh-blue p-4 md:p-8 rounded-3xl w-auto">
              <p className="text-white font-bold text-3xl md:text-5xl md:text-left leading-loose">
                Registration
              </p>
              <p className="text-white font-medium text-lg md:text-xl leading-normal text-center md:text-left">
                You can now list your house as a homestay on MarhbaBik.
              </p>
            </div>
          </div>
          <div className="flex-1 mb-8 flex justify-center">
            <img src={step2_trip} alt="Service Image" className="max-w-full" />
          </div>
        </div>

        <div className="flex flex-col md:flex-row bg-mh-red py-16 md:py-32 px-8 md:px-20">
          <div className="flex-1 mb-8 flex justify-center">
            <img src={step3} alt="Service Image" className="max-w-full" />
          </div>
          <div className="flex-1 flex flex-col justify-center items-center md:items-start gap-4 md:gap-8">
            <div className="bg-white p-4 md:p-8 rounded-3xl">
              <p className="text-mh-red font-bold text-3xl md:text-5xl md:text-left leading-loose">
                Registration
              </p>
              <p className="text-mh-red font-medium text-lg md:text-xl leading-normal text-center md:text-left">
                You can now list your house as a homestay on MarhbaBik.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row bg-white py-16 md:py-32 px-8 md:px-20">
          <div className="flex-1 flex flex-col justify-center items-center md:items-start gap-4 md:gap-8">
            <div className="bg-mh-blue p-4 md:p-8 rounded-3xl">
              <p className="text-white font-bold text-3xl md:text-5xl md:text-left leading-loose">
                Registration
              </p>
              <p className="text-white font-medium text-lg md:text-xl leading-normal text-center md:text-left">
                You can now list your house as a homestay on MarhbaBik.
              </p>
            </div>
          </div>
          <div className="flex-1 mb-8 flex justify-center">
            <img src={step4_trip} alt="Service Image" className="max-w-full" />
          </div>
        </div>
        <div className="p-8 md:p-20 lg:p-32 bg-mh-dark flex flex-col items-center justify-center text-center">
          <span className="text-white text-5xl font-900 mb-8">
            MarhbaBik is <span className="text-mh-blue">Growing!</span>
          </span>
          <div className="flex flex-col md:flex-row lg:flex-row items-center justify-center w-full">
            <div className="mb-8 md:mb-0 md:mr-8 lg:mr-8">
              <img src={numbers} alt="" />
            </div>
            <div className="flex items-center justify-center flex-col">
              <CardHoverEffectDemo />
            </div>
          </div>
        </div>
        <div className="p-32 bg-white">
          <Testimonial />
        </div>
        <FooterMB />
      </div>
    </>
  );
};
