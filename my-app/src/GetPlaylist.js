import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';

const PLAYLIST_ENDPOINT = "https://api.spotify.com/v1/me/player/currently-playing"

function GetPlaylist() {
    const [token, setToken] = useState("")
    const[data, setData] = useState({})
    const[artist, setArtists] = useState("")
    const[name, setName] = useState("")
    const[albumCover, setAlbumCover] = useState("")

    

    useEffect(()=>{
        if(localStorage.getItem('accessToken')){
            setToken(localStorage.getItem("accessToken"))
        }
    }, []);

    const handleGetPlaylist = () =>{
        axios.get(PLAYLIST_ENDPOINT, {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then(response =>{
            setData(response.data)
          // console.log(response.data.item)
            setArtists(response.data.item.artists)
            setName(response.data.item.name)
            setAlbumCover(response.data)
            const albumImageUrl = response.data.item.album.images[0].url;
            setAlbumCover(albumImageUrl);

            console.log("Album cover URL:", albumImageUrl); // Log the correct URL
           
        })
        .catch((error) =>{
            console.log(error)
        })
    }

    return(
        <div>
            <button onClick = {handleGetPlaylist}>get playlist</button>
            {albumCover ? (
                <img
                    src={albumCover}
                    alt={`Album cover of ${name}`}
                    style={{ width: '300px', height: '300px' }}
                    onError={() => console.error("Failed to load image.")}
                />
            ) : (
                <p>No album cover available</p>
            )}
        </div>
    )
}

export default GetPlaylist;

