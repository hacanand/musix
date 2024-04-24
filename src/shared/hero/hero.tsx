"use client";
import React   from "react";
import { Button } from "@/components/ui/button";
import Lottie from "react-lottie";
import animationData from "../../../public/headphone_animation.json";
import {useRouter} from 'next/navigation'
const Hero = () => {
  const router = useRouter();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const handleGetsStart = () => {
    router.push("/tospotify");
    
  };
  return (
    <div className="relative ">
      <div className="mt-0 h-screen max-w-full">
        <Lottie options={defaultOptions} />
      </div>
      <div className=" w-full h-full absolute top-0">
        <div className="flex justify-center items-center pt-48 flex-col">
          <div className="text-5xl text-center dark:text-slate-200 font-bold capitalize">
            Convert your <span className="text-red-600">youtube </span> song playlist
            <br /> to <br /> <span className="text-green-600">
              spotify  
            </span>{" "}
            song playlist{" "}
          </div> 
         <Button className="mt-10 font-bold dark:bg-gradient-to-r to-green-600 from-red-600 px-8 py-6 dark:text-white after:scale-95 transition-all" onClick={handleGetsStart}>Gets Start</Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
