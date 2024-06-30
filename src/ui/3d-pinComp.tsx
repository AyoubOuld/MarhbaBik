"use client";

import { PinContainer } from "./3d-pin";
import { Button } from "flowbite-react";

export function AnimatedPinDemo() {
    return (
        
            <PinContainer
                title="/MarhbaBik"
                href="https://twitter.com/mannupaaji"
            >
                <div className="flex basis-full flex-col p-4  text-slate-100/50 sm:basis-1/2 w-[20rem] h-[12rem] gap-2">
                    <span className="max-w-xs pb-2 m-0 font-medium text-3xl text-slate-100 text-center">
                        Get started
                    </span>
                    <div className="text-base m-0 p-0 font-normal text-center">
                        <span className="text-slate-500">
                            Start using our services by downloading MarhbaBik
                        </span>
                    </div>
                    <Button className="p-2 bg-mh-blue font-700 w-full" pill size="lg">Download the app</Button>
                    
                </div>
            </PinContainer>
        
    );
}