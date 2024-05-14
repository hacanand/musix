'use client'
import React  from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'
import GetSpotifyToken from '@/shared/utils/toSpotifyServer/getSpotifyToken'
import toast from 'react-hot-toast'
import YoutubeData from '@/shared/table/youtubeData'
import ConvertToSpotify from '@/shared/utils/toSpotifyServer/convertToSpotify'
 
const Page = () => {
  const router = useRouter();
  const ref = useRef<HTMLInputElement>(null);
  const handleConvert = () => {
    if (ref.current?.value) {
    const url = ref.current.value;
      localStorage.setItem("url", url);
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
   
   
  const handleToSpotify = async () => {
    const pathname = window.location.pathname;
    const params = pathname.split("/").pop();
    const res = await ConvertToSpotify(params as string);
    console.log(res);
    
  };
 
  return (
    <div className="w-full h-screen  flex flex-col mt-20  ">
      <div className="flex justify-center gap-6">
        <Input
          type="text"
          placeholder="Paste your Youtube public or unlisted playlist URL to convert"
          className=" ring-2 ring-pink-600  w-[600px]   placeholder:capitalize"
          ref={ref}
        />

        <Button className="font-bold" onClick={handleConvert}>
          Convert
        </Button>
      </div>
      <div className="w-1/2 self-center mt-10">
        <YoutubeData />
      </div>
      <Button className="sticky font-bold bottom-0 w-1/2 shadow-md self-center dark:bg-gradient-to-r to-red-600 via-green-600 from-red-600" onClick={handleToSpotify}>
        Proceed To Convert
      </Button>
    </div>
  );
}

export default Page