 'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import  {useRouter}  from "next/navigation";
import React, { useRef } from "react";
import toast from "react-hot-toast";

const Page = () => {
  //https://youtube.com/playlist?list=PLbpi6ZahtOH6yawKJgeBC9g3FGSMN8rQH&si=ANmkcSs4LyRprtrB

  const router=useRouter()
  const ref = useRef<HTMLInputElement>(null);
  const handleConvert = () => {
    if (ref.current?.value) {
      const url = ref.current.value;
      localStorage.setItem("url",url)
      if (url.includes("playlist")) {
        const playlistId = url.split("list=")[1];
        if (playlistId) {
          router.push(`/tospotify/${playlistId}`);
        } else {
          toast.error("Invalid URL");
        }
      } else {
        toast.error("Invalid URL");
      }
    } else {
      toast.error("Please enter a URL");
    }
  };
  return (
    <div className="w-full  h-screen  gap-6 flex flex-col   items-center">
      <div className=" mt-20 ">
        <Input
          type="text"
          placeholder="Paste your Youtube public or unlisted playlist URL to convert"
          className=" ring-2 ring-pink-600    w-[600px]   placeholder:capitalize"
          ref={ref}
        />
      </div>
      <Button className="font-bold" onClick={handleConvert}>
        Convert
      </Button>
    </div>
  );
};

export default Page;
