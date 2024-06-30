"use client";

import { InfiniteMovingCards } from "../ui/infinite-moving";

export function Testimonial() {
  return (
    <div className="py-28 rounded-md flex flex-col antialiased dark:bg-white dark:bg-grid-black/[0.05] items-center justify-center relative overflow-hidden ">
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="fast"
      />
    </div>
  );
}

const testimonials = [
  {
    quote:
      "MarhbaBik made my trip unforgettable! The hosts were incredibly welcoming, and the accommodations were perfect. The platform is so easy to use, and I felt like I got a true taste of the local culture.",
    name: "Amina B.",
    title: "",
  },
  {
    quote:
      "Renting a car through MarhbaBik was a breeze. The vehicle was in great condition, and the process was seamless. It made exploring the beautiful regions so much more convenient.",
    name: "Karim H.",
    title: "",
  },
  {
    quote: "Booking a trip with MarhbaBik was the best decision I made. The curated experiences were amazing, and I loved how everything was organized. I highly recommend it to anyone looking for an authentic travel experience.",
    name: "Sofia R.",
    title: "",
  },
  {
    quote:
      "I used MarhbaBik to find a homestay for my vacation, and it exceeded my expectations. The host was friendly and helpful, and the home was cozy and well-maintained. I will definitely use this platform again.",
    name: "Youssef K.",
    title: "",
  },
  {
    quote:
      "MarhbaBik connected me with the best travel agency for my tour. The whole process was smooth, and the trip was well-planned and enjoyable. It's the perfect platform for discovering new places and making memories.",
    name: "Lina M.",
    title: "",
  },
];
