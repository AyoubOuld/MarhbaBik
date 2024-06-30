"use client";

import { Button } from "flowbite-react";
import { Tabs } from "../ui/tabs";
import service1 from "../imgs/Service1.png";

export function TabsDemo() {
  const tabs = [
    {
      title: "Accommodation",
      value: "Accommodation",
      content: (
        <div className="w-full h-full overflow-hidden rounded-3xl flex flex-col md:flex-row bg-mh-blue px-4 md:px-12">
          <div className="flex-1 flex flex-col justify-center p-4 items-center md:items-start gap-4">
            <span className="text-white font-900 text-2xl md:text-5xl text-center md:text-left">
              Book a <span className="text-mh-dark">homestay</span> in one click
            </span>
            <p className="text-white font-300 text-sm md:text-xl lg:text-xl leading-normal text-center md:text-left">
            Discover diverse accommodations with verified hosts. Enjoy seamless booking and authentic hospitality with MarhbaBik.
            </p>
            <Button className="p-2 bg-mh-dark font-500" pill size="lg">
              Download the app
            </Button>
          </div>
          <div className="flex-1 flex justify-center md:justify-end">
            <img
              src={service1}
              alt="Service Image"
              className="hidden md:block max-w-full h-auto md:max-h-full md:max-w-full"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Join trips",
      value: "join trips",
      content: (
        <div className="w-full h-full overflow-hidden rounded-3xl flex flex-col md:flex-row bg-mh-blue px-4 md:px-12">
          <div className="flex-1 flex justify-center md:justify-end">
          <img
              src={service1}
              alt="Service Image"
              className="hidden md:block max-w-full h-auto md:max-h-full md:max-w-full"
            />
          </div>
          <div className="flex-1 flex flex-col justify-center p-4 items-center md:items-start gap-4">
            <span className="text-white font-900 text-2xl md:text-5xl text-center md:text-left">
              Book a <span className="text-mh-dark">Trip</span> in one click
            </span>
            <p className="text-white font-300 text-sm md:text-xl lg:text-xl leading-normal text-center md:text-left">
            Explore and book unforgettable experiences effortlessly with MarhbaBik.
            </p>
            <Button className="p-2 bg-mh-dark font-500" pill size="lg">
              Download the app
            </Button>
          </div>
        </div>
      ),
    },
    {
      title: "Car rental",
      value: "car rental",
      content: (
        <div className="w-full h-full overflow-hidden rounded-3xl flex flex-col md:flex-row bg-mh-blue px-4 md:px-12">
          <div className="flex-1 flex flex-col justify-center p-4 items-center md:items-start gap-4">
            <span className="text-white font-900 text-2xl md:text-5xl text-center md:text-left">
              Book a <span className="text-mh-dark">Car rental</span> in one click
            </span>
            <p className="text-white font-300 text-sm md:text-xl lg:text-xl leading-normal text-center md:text-left">
            Discover easy car rentals tailored to your journey. Rent with confidence through MarhbaBik.
            </p>
            <Button className="p-2 bg-mh-dark font-500" pill size="lg">
              Download the app
            </Button>
          </div>
          <div className=" flex justify-center md:justify-end">
          <img
              src={service1}
              alt="Service Image"
              className="hidden md:block max-w-full h-auto md:max-h-full md:max-w-full"
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="h-[25rem] md:h-[35rem] [perspective:1000px] flex flex-col max-w-5xl mx-auto w-3/4 items-start justify-start">
      <Tabs tabs={tabs} />
    </div>
  );
}
