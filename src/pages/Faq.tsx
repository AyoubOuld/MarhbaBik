import { AccordionFAQ } from "../components/AccordionFAQ";
import { FooterMB } from "../components/FooterMB";
import faq from "../imgs/faq.png";
export const Faq = () => {
  return (
    <>
      <div className="bg-white pt-16">
        <div className="py-40 flex flex-col items-center justify-center bg-mh-blue gap-10">
          <span className="font-700 text-6xl text-center">
            <span className="text-white">Frequently </span>
            <span className="text-mh-dark">asked </span>
            <span className="text-white">questions</span>
          </span>
          <p className="w-4/5 text-center text-white font-200 text-2xl leading-loose">
            Welcome to our FAQ section! Below, you'll find answers to commonly
            asked questions about MarhbaBik and our services. If you have any
            other questions not covered here, feel free to reach out to us
            directly.
          </p>
        </div>
        <div className="flex justify-center mt-[-10rem]">
          <img src={faq} alt="" className="w-1/2" />
        </div>
        <div className="flex justify-center mb-24">
          <div className="w-3/4">
            <AccordionFAQ />
          </div>
        </div>
        <FooterMB />
      </div>
    </>
  );
};
