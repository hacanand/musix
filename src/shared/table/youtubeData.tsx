"use client";
import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

const YoutubeData = () => {
  const [data, setData] = useState<any[]>([]);
  const [loaded, setLoaded] = useState<boolean>(true);
  const pathname = window.location.pathname;
  const params = pathname.split("/").pop();

  useEffect(() => {
    fetchYoutubeData();
    setLoaded(false);
  }, []);

  const fetchYoutubeData = async () => {
    try {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${params}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`
      );
      const json = await res.json();
      setData(json?.items);
    } catch (error) {
      console.log(error);
    }
  };
  //console.log(data);
  return (
    <div className="relative overflow-x-auto shadow-md pb-10  sm:rounded-lg">
      <table className="w-full pb-10 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-200">
        <thead className="text-xs text-gray-900 uppercase bg-gray-50 dark:bg-red-800 dark:text-gray-100">
          <tr>
            <th scope="col" className="px-16 py-3">
              <span className="sr-only">Thumbnail</span>
              Thumbnail
            </th>
            <th scope="col" className="px-3 py-3 text-center">
              Description
            </th>
            <th scope="col" className=" flex px-6 py-3 text-center ">
              <input
                id="vue-checkbox"
                type="checkbox"
                value=""
                className="w-5 h-5 rounded-full text-blue-600 bg-blue-600 border-gray-300  focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-blue-600 dark:border-gray-500"
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {loaded && (
            <tr className="bg-white border-b dark:bg-red-700 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-red-500">
              <td className="px-4 py-4 font-semibold text-gray-900 dark:text-white">
                <Skeleton className="h-20 w-32 rounded" />
              </td>
              <td className="px-4 py-2">
                <Skeleton className="h-4 w-[400px]" />
                <Skeleton className="h-2 mt-2 w-[410px]" />{" "}
                <Skeleton className="h-2 mt-2 w-[430px]" />
                <Skeleton className="h-2 mt-2 w-[450px]" />
              </td>
              <td className="text-center">
                <input type="checkbox" />
              </td>
            </tr>
          )}

          {!loaded && data.map((item) => (
            <tr
              key={item.id}
              className="bg-white border-b dark:bg-red-700 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-red-500"
            >
              <td className="px-4 py-4 font-semibold text-gray-900 dark:text-white">
                {loaded ? (
                  <Skeleton className="h-20 w-32 rounded" />
                ) : (
                  <img src={item?.snippet?.thumbnails?.default?.url} alt="" />
                )}
              </td>
              <td className="px-4 py-2">
                {loaded ? (
                  <Skeleton className="h-4 w-[400px]" />
                ) : (
                  <div className="flex items-center font-bold text-xl">
                    {item?.snippet?.title}
                  </div>
                )}
                {loaded ? (
                  <>
                    <Skeleton className="h-2 mt-2 w-[410px]" />{" "}
                    <Skeleton className="h-2 mt-2 w-[430px]" />
                    <Skeleton className="h-2 mt-2 w-[450px]" />
                  </>
                ) : (
                  <div className=" line-clamp-3">
                    {item?.snippet?.description}
                  </div>
                )}
              </td>
              <td className="text-center">
                <input type="checkbox" />
              </td>
            </tr>
          ))}
        </tbody>
     
      </table>
    </div>
  );
};

export default YoutubeData;
