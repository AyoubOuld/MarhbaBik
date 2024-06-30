"use client";

import { ContainerScroll } from "../ui/container-scroll-animation";

import { Testimonial } from "../components/Testimonial";


export function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden scale-75">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-mh-dark dark:text-white">
              What are people saying about <br />
              <span className="text-4xl md:text-[6rem] text-mh-blue font-bold mt-1 leading-none">
                MarhbaBik
              </span>
            </h1>
          </>
        }
      >
        <Testimonial/>
        
      </ContainerScroll>
    </div>
  );
}
