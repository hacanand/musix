"use client";
import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
const YoutubeData = ( ) => {
  const [data, setData] = useState<any[]>([]);
  const [loaded, setLoaded] = useState<boolean>();
 
  const pathname = window.location.pathname;
  const params = pathname.split("/").pop();


  
  useEffect(() => {
    fetchYoutubeData();
  }, []);

  const fetchYoutubeData = async () => {
    try {
      setLoaded(true);
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${params}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`
      );
      const json = await res.json();
      setData(json?.items);
      setLoaded(false);
    } catch (error) {
      console.log(error);
      setLoaded(false);
    }
  };
 
  return (
    <div
      className="relative  shadow-md  rounded-lg"
    >
      <table className="w-full text-sm text-left  rtl:text-right text-gray-500 dark:text-gray-200">
        <thead className="text-xs text-gray-900 rounded-lg uppercase bg-gray-50 dark:bg-red-800 dark:text-gray-100">
          <tr>
            <th scope="col" className="px-16 py-3">
              <span className="sr-only">Thumbnail</span>
              Thumbnail
            </th>
            <th scope="col" className="px-3 py-3 text-center">
              Description
            </th>
             
          </tr>
        </thead>
        <tbody>
          {loaded
            ? Array.from({ length: 10 }).map((_, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-red-700 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-red-500"
                >
                  <td className="px-4 py-4 font-semibold text-gray-900 dark:text-white">
                    <Skeleton className="h-20 w-32 rounded" />
                  </td>
                  <td className="px-4 py-2">
                    <Skeleton className="h-4 w-[400px]" />
                    <Skeleton className="h-2 mt-2 w-[450px]" />{" "}
                    <Skeleton className="h-2 mt-2 w-[450px]" />
                    <Skeleton className="h-2 mt-2 w-[450px]" />
                  </td>
                </tr>
              ))
            : data?.map((item) => (
                <tr
                  key={item.id}
                  className="bg-white border-b dark:bg-red-700 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-red-500"
                >
                  <td className="px-4 py-4 font-semibold text-gray-900 dark:text-white">
                    <img src={item?.snippet?.thumbnails?.default?.url} alt="" />
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex items-center font-bold text-xl">
                      {item?.snippet?.title}
                    </div>
                    <div className=" line-clamp-3">
                      {item?.snippet?.description}
                    </div>
                  </td>
                  
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
};

export default YoutubeData;
