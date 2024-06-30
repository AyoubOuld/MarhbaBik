"use client";

import { Carousel } from "flowbite-react";

export function CoreValues() {
  return (
    <div className="h-80 sm:h-72 xl:h-80 2xl:h-96">
      <Carousel leftControl=" " rightControl=" " slideInterval={1000}>
        <div className="flex flex-col p-4 gap-4">
          <span className="text-mh-dark font-900 text-4xl md:text-2xl lg:text-5xl">
          Trust
          </span>
          <p className="text-white font-normal sm:text-md md:text-lg lg:text-xl leading-normal">
          Ensuring safety and reliability through verified listings and transparent processes, building a community where both travelers and hosts can interact with confidence.
          </p>
        </div>
        <div className="flex flex-col p-4 gap-4">
          <span className="text-mh-dark font-900 text-4xl md:text-2xl lg:text-5xl">
          Convenience
          </span>
          <p className="text-white font-normal sm:text-md md:text-lg lg:text-xl leading-normal">
          Offering a seamless, user-friendly platform that simplifies booking accommodations, car rentals, and trips, ensuring a hassle-free travel experience.
          </p>
        </div>
        <div className="flex flex-col p-4 gap-4">
          <span className="text-mh-dark font-900 text-4xl md:text-2xl lg:text-5xl">
          Authenticity
          </span>
          <p className="text-white font-normal sm:text-md md:text-lg lg:text-xl leading-normal">
          Providing travelers with genuine, local experiences by connecting them with trusted hosts and services that reflect the true culture and hospitality of the region.
          </p>
        </div>
      </Carousel>
    </div>

  );
}