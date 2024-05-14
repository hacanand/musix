"use client";

import React, { useState } from "react";
const common_words = [
  "wshh exclusive official music video",
  "official animated music video",
  "official hd music video",
  "official music video",
  "video clip official",
  "videoclip oficial",
  "vertical video",
  "wshh exclusive",
  "official video",
  "official audio",
  "video official",
  "clipe ofiical",
  "video oficial",
  -"original mix",
  "bass boosted",
  "music video",
  "lyric video",
  "visualizer",
  "lyrics",
  "audio",
  "feat",
  "ft",
];

const ConvertToSpotify = async (params:string) => {
    const [songData, setSongData] = useState<any[]>([]);
    try {
         
        const res = await fetch(
            `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${params}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`
        );
        const json = await res.json();
        json?.items?.map((item: any) => {
            setSongData([...songData, { title: item.snippet.title }]);
        });
        for (let i = 0; i < songData.length; i++) {
            try {
                //remove common words
                songData[i].title = songData[i]?.title
                    .replace(/[^\x00-\x7F]/g, " ")
                    .replace(/[^\word\s]/gi, " "); //remove non ascii and special characters

                common_words.forEach((word) => {
                    //Loop troughout a list of common words
                    if (songData[i].title.toLowerCase().includes(word)) {
                        songData[i].title = songData[i].title.toLowerCase().replace(word, ""); //remove common words
                    }
                });
                try {
                    songData[i].title = songData[i].title
                        .toLowerCase()
                        .split("prod")[0]
                        .trim();
                } catch {
                    continue;
                }
                try {
                    songData[i].title = songData[i].title
                        .toLowerCase()
                        .split("directed")[0]
                        .trim();
                } catch {
                    continue;
                }
                try {
                    songData[i].title = songData[i].title
                        .toLowerCase()
                        .split("dir")[0]
                        .trim();
                } catch {
                    continue;
                }
                try {
                    songData[i].title = songData[i].title
                        .toLowerCase()
                        .split("ft")[0]
                        .trim();
                } catch {
                    continue;
                }

                songData[i].title = songData[i].title.replace(/\s{2,}/g, " "); //remove multiple spaces from string
            } catch (e) {
                continue;
            }
        }
        return songData;
    } catch (error) {
        console.log(error);
    }
};

export default ConvertToSpotify;
