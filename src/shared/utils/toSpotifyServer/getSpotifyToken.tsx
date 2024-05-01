"use client";
import axios from "axios";
import qs from "qs";

  let data = qs.stringify({
    client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
    client_secret: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET,
    grant_type: "client_credentials",
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://accounts.spotify.com/api/token",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: data,
};
  
const GetSpotifyToken = async () => {
   try {
     const response = await axios(config);
      return response.data.access_token;
   } catch (error) {
    console.log(error);
   }
};

export default GetSpotifyToken;
