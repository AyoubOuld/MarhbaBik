import { HoverEffect } from "../ui/card-hover-effect";

export function CardHoverEffectDemo() {
  return (
    <div className="mx-auto">
      <HoverEffect items={projects} />
    </div>
  );
}

export const projects = [
  {
    content: (
      <>
        <div className="flex-1 flex flex-col justify-center items-center gap-4">
          <span className="text-mh-dark font-900 text-2xl md:text-4xl text-center md:text-left">
            1M+
          </span>
          <p className="text-white font-300 text-xl md:text-2xl leading-normal text-center md:text-left">
            app downloads since 2024
          </p>
        </div>
      </>
    ),
  },
  {
    content: (
      <>
        <div className="flex-1 flex flex-col justify-center items-center gap-4">
          <span className="text-mh-dark font-900 text-xl md:text-3xl lg:text-4xl text-center">
            2000+
          </span>
          <p className="text-white font-300 text-lg md:text-xl leading-normal text-center md:text-left">
            active users
          </p>
        </div>
      </>
    ),
  },
  {
    content: (
      <>
        <div className="flex-1 flex flex-col justify-center items-center gap-4">
          <span className="text-mh-dark font-900 text-2xl md:text-4xl text-center md:text-left">
            2000+
          </span>
          <p className="text-white font-300 text-xl md:text-2xl leading-normal text-center md:text-left">
            active users
          </p>
        </div>
      </>
    ),
  },
  {
    content: (
      <>
        <div className="flex-1 flex flex-col justify-center items-center  gap-4">
          <span className="text-mh-dark font-900 text-2xl md:text-4xl text-center md:text-left">
            1M+
          </span>
          <p className="text-white font-300 text-xl md:text-2xl leading-normal text-center md:text-left">
            app downloads since 2024
          </p>
        </div>
      </>
    ),
  },
];
