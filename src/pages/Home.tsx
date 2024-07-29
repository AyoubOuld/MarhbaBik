import { CoreValues } from "../ui/Core-values";
import { FooterMB } from "../components/FooterMB";
import { BackgroundGradientAnimationDemo } from "../ui/background-gradient-animationComp";
import { HeroScrollDemo } from "../ui/container-scroll-animationComp";
import { FlipWordsDemo } from "../ui/flip-wordsComp";
import { TabsDemo } from "../ui/tabsComp";
import { CardHoverEffectDemo } from "../ui/card-hover-effectComp";
import phones from "../imgs/phones.png";
import values from "../imgs/values.png";
import numbers from "../imgs/numbers.png";

export const Home = () => {
  return (
    <>
      <div className="bg-white pt-16">
        <div className="flex items-center justify-center pb-10 flex-col md:flex-row">
          <div className=" md:w-1/2 px-4 md:px-0">
            <FlipWordsDemo />
          </div>
          <div className="w-full md:w-1/2 px-4 md:px-0">
            <img src={phones} alt="Hand Image" className="w-full" />
          </div>
        </div>

        <div className="flex flex-col justify-center bg-gray-100 py-16 md:py-32 px-4">
          <div className="font-bold text-3xl md:text-5xl text-center mb-8 md:mb-16">
            <span className="text-mh-dark">
              Our <span className="text-mh-blue">services</span>
            </span>
          </div>
          <div className="min-h-screen lg:h-auto w-full">
            <TabsDemo />
          </div>
        </div>

        <div className="bg-mh-blue p-8 md:p-24 flex flex-col md:flex-row items-center">
          <div className="flex flex-col flex-1 text-center md:text-left">
            <span className="text-white font-extrabold text-4xl md:text-7xl my-10">
              Our core values
            </span>
            <CoreValues />
          </div>
          <div className="flex-1 mb-8 md:mb-0 md:mr-16 flex justify-center">
            <img src={values} alt="Core Values" className="max-w-full h-auto" />
          </div>
        </div>

        <div>
          <HeroScrollDemo />
        </div>

        <div className="p-8 md:p-20 lg:p-32 bg-mh-dark flex flex-col items-center justify-center text-center">
          <span className="text-white text-3xl md:text-5xl font-extrabold mb-8">
            MarhbaBik is <span className="text-mh-blue">Growing!</span>
          </span>
          <div className="flex flex-col md:flex-row items-center justify-center w-full">
            <div className="mb-8 md:mb-0 md:mr-8">
              <img src={numbers} alt="Numbers" className="max-w-full h-auto" />
            </div>
            <div className="flex items-center justify-center flex-col">
              <CardHoverEffectDemo />
            </div>
          </div>
        </div>

        <div>
          <BackgroundGradientAnimationDemo />
        </div>
      </div>

      <FooterMB />
    </>
  );
};
