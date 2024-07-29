import { useState } from "react";
import ShowDestination from "../components/ShowDestination";
import WelcomeSlideShow from "../components/WelcomeSlideShow";
import ShowWilaya from "../components/ShowWilaya";
import "../assets/App.css";
import ShowActivities from "../components/ShowActivities";
import { FooterMB } from "../components/FooterMB";
import { Button } from "flowbite-react";
import house_service from "../imgs/house_service.png";
import car_service from "../imgs/car_service.png";
import trip_service from "../imgs/trip_service.png";

const Welcome = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>("");

  return (
    <>
      <div className="bg-white pt-16">
        <WelcomeSlideShow onSelectRegion={setSelectedRegion} />
        {selectedRegion === "" ? (
          <>
            <div className="flex flex-col items-center">
              <h1 className="text-4xl font-bold m-12 text-mh-dark font-800">
                Discover <span className="text-mh-blue">the Beauty</span> of{" "}
                <span className="text-mh-blue">Algeria</span>
              </h1>
              <p className="text-lg text-mh-dark mb-4 text-center px-4 lg:px-32 font-300">
                Kabylie is known for its stunning landscapes, rich culture, and
                vibrant history. Explore the top destinations, activities, and
                more.
              </p>
              <div className="mt-8 w-full">
                <ShowWilaya selectedRegion="kabylie" />
              </div>
              <div className="mt-8 w-full bg-gray-100 lg:px-32">
                <h1 className="w-full text-center text-4xl font-bold pt-12 text-mh-dark font-800">
                  Places to visit in <span className="text-mh-blue">Kabylie</span>
                </h1>
                <ShowDestination selectedRegion="kabylie" />
              </div>
              <div className="mt-8 w-full">
                <h1 className="w-full text-center text-4xl font-bold pt-12 text-mh-dark font-800">
                  Things to do in <span className="text-mh-blue">Kabylie</span>
                </h1>
                <ShowActivities selectedRegion="kabylie" />
              </div>
            </div>
          </>
        ) : (
          <>
            <h1 className="w-full text-center text-4xl font-bold my-12 text-mh-dark font-800">
              Discover <span className="text-mh-blue">the Beauty</span> of{" "}
              <span className="text-mh-blue">
                {selectedRegion.toUpperCase()}
              </span>
            </h1>
            <p className="text-lg text-mh-dark mb-4 text-center px-4 lg:px-32 font-300">
              Algeria, a land of breathtaking landscapes, diverse cultures, and
              ancient history. Discover the top destinations, experiences, and
              hidden gems that this incredible country has to offer.
            </p>
            <div className="p-2">
              <ShowWilaya selectedRegion={selectedRegion} />
            </div>
            <div className=" lg:px-32 bg-gray-100">
              <h1 className="w-full text-center text-4xl font-bold mt-12 pt-12 text-mh-dark font-800">
                Places to visit in{" "}
                <span className="text-mh-blue">
                  {selectedRegion.toUpperCase()}
                </span>
              </h1>
              <div className="mx-5">
                <ShowDestination selectedRegion={selectedRegion} />
              </div>
            </div>
            <h1 className="w-full text-center text-4xl font-bold pt-12 text-mh-dark font-800">
              Things to do in{" "}
              <span className="text-mh-blue">
                {selectedRegion.toUpperCase()}
              </span>
            </h1>
            <ShowActivities selectedRegion={selectedRegion} />
          </>
        )}
      </div>
      <div className="bg-mh-dark flex sm:flex-col md:flex-col lg:flex-row   items-center justify-between">
        <div className="flex-1 p-16">
          <span className="text-5xl font-bold mb-8 text-white block">
            Where to stay?
          </span>
          <p className="text-3xl md:text-3xl sm:text-xl  text-white mb-8">
            Book a place now to Akfadou simply by downloading MarhbaBik mobile
            app
          </p>
          <Button className="p-2 bg-mh-blue font-500" pill size="lg">
            Download the app
          </Button>
        </div>

        <div className="flex justify-end mt-6">
          <img
            src={house_service}
            alt="House service"
            className="w-3/4 h-auto object-contain sm:hidden lg:block"
          />
        </div>
      </div>
      <div className="bg-mh-red flex sm:flex-col md:flex-col lg:flex-row  items-center justify-between">
        <div className="flex justify-start mt-6">
          <img
            src={car_service}
            alt="Car service"
            className="w-3/4 h-auto object-contain sm:hidden lg:block"
          />
        </div>
        <div className="flex-1 p-16">
          <span className="text-5xl font-bold mb-8 text-white block">
            You want a drive?
          </span>
          <p className="text-3xl text-white mb-8">
            Rent a car now simply by downloading MarhbaBik mobile app
          </p>
          <Button className="p-2 bg-white text-mh-red font-500" pill size="lg">
            Download the app
          </Button>
        </div>
      </div>
      <div className="bg-mh-blue flex sm:flex-col md:flex-col lg:flex-row  items-center justify-between">
        <div className="flex-1 p-16">
          <span className="text-5xl font-bold mb-8 text-white block">
            A full experience
          </span>
          <p className="text-3xl text-white mb-8">
            Book a trip now simply by downloading MarhbaBik mobile app
          </p>
          <Button className="p-2 bg-mh-dark font-500" pill size="lg">
            Download the app
          </Button>
        </div>

        <div className="flex justify-end mt-6">
          <img
            src={trip_service}
            alt="Trip service"
            className="w-3/4 h-auto object-contain sm:hidden lg:block"
          />
        </div>
      </div>
      <FooterMB />
    </>
  );
};

export default Welcome;
