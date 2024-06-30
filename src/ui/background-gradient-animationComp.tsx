import { BackgroundGradientAnimation } from "../ui/background-gradient-animation";
import { AnimatedPinDemo } from "../ui/3d-pinComp";

export function BackgroundGradientAnimationDemo() {
  return (
    <BackgroundGradientAnimation>
      <div className="flex justify-center items-center p-8">
      <AnimatedPinDemo />
      </div>
      
    </BackgroundGradientAnimation>
  );
}