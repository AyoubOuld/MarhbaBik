import { Button } from "flowbite-react";
import { FlipWords } from "../ui/flip-words";

// Define FlipWordsDemo component
export function FlipWordsDemo() {
  const words = ["Homestays", "Organized-Trips", "Car-rental"];

  return (
    <div className="h-[40rem] flex justify-start md:justify-center items-center flex-col p-8">
      <div className="text-5xl mx-auto font-700 text-mh-dark dark:text-neutral-400 leading-normal">
        Book{" "}
        {/* Render FlipWords component with words array */}
        <FlipWords words={words} className="text-mh-blue" /> <br />
        all in one with <span className="text-mh-blue">MarhbaBik</span>
      </div>
      <Button className="p-2 bg-mh-blue font-500 mt-4" pill size="lg">Download the app</Button>
    </div>
  );
}
