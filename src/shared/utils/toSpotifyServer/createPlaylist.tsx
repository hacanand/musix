'use client'
import React from 'react'
import ConvertToSpotify from '@/shared/utils/toSpotifyServer/convertToSpotify'

const CreatePlaylist = async () => {
const pathname = window.location.pathname;
const params = pathname.split("/").pop();
const data = await ConvertToSpotify(params as string)
 
}

export default CreatePlaylist