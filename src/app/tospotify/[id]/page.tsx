'use client'
import React  from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'
import GetSpotifyToken from '@/shared/utils/toSpotifyServer/getSpotifyToken'
import toast from 'react-hot-toast'
import YoutubeData from '@/shared/table/youtubeData'
 
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
    router.push("/tospotify");
    const token = await GetSpotifyToken();
    console.log(token);
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
      <Button className="sticky font-bold bottom-0 w-1/2 shadow-md self-center dark:bg-gradient-to-r to-green-600 via-purple-600 from-green-600" onClick={handleToSpotify}>
        Proceed To Convert
      </Button>
    </div>
  );
}

export default Page