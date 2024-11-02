import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';

const PLAYLIST_ENDPOINT = "https://api.spotify.com/v1/me/player/currently-playing"
const PLAY_SONG_ENDPOINT = "https://api.spotify.com/v1/me/player/play"
const PAUSE_SONG_ENDPOINT = "https://api.spotify.com/v1/me/player/pause";
const GET_PLAYBACK_STATE = "https://api.spotify.com/v1/me/player";
const NEXT_SONG = "https://api.spotify.com/v1/me/player/next";
const BACK_SONG = "https://api.spotify.com/v1/me/player/previous";


function GetPlaylist() {
    const [token, setToken] = useState("")
    const[data, setData] = useState({})
    const[artist, setArtists] = useState("")
    const[name, setName] = useState("")
    const[albumCover, setAlbumCover] = useState("")
    const[songPaused, setSongPaused] = useState(false);

    

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
            getPlayBackState()
        })
        .catch((error) =>{
            console.log(error)
        })
    }

    const playSong = () => {
        setSongPaused(false)
        axios
          .put(PLAY_SONG_ENDPOINT, {}, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(() => console.log('Playback started'))
          .catch((error) => console.error('Error playing song:', error));
      };

  

    const pauseSong = () => {
        setSongPaused(true)
        if (!token) {
            console.error("Access token is missing.");
            return;
        }
        console.log("Using Token:", token); // Verify token
        axios.put(PAUSE_SONG_ENDPOINT, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).catch((error) => console.error("Error pausing song:", error));
    };

    const nextSong = () =>{
        if(!token){
            console.error("Access token is missing")
            return;
        }
        axios.post(NEXT_SONG, {}, {
            headers:{
                Authorization: `Bearer ${token}`,
            },
        }).catch((error) => console.error("Error playing next song", error));
    }

    const backSong = () =>{
        if(!token){
            console.error("Access token is missing")
            return;
        }
        axios.post(BACK_SONG, {}, {
            headers:{
                Authorization: `Bearer ${token}`,
            },
        }).catch((error) => console.error("Error playing previous song", error));
    }

    const getPlayBackState = () =>{
        axios.get(GET_PLAYBACK_STATE, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => console.log(response))
        .catch((error) => console.log("error getting playback state"));
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
            <div className = "nextButton">
                <button onClick = {nextSong}>
                <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24" id="next">
                    <path d="M8.7,7.3c-0.4-0.4-1-0.4-1.4,0c-0.4,0.4-0.4,1,0,1.4l3.3,3.3l-3.3,3.3C7.1,15.5,7,15.7,7,16c0,0.6,0.4,1,1,1
                        c0.3,0,0.5-0.1,0.7-0.3l4-4c0,0,0,0,0,0c0.4-0.4,0.4-1,0-1.4L8.7,7.3z M16,7c-0.6,0-1,0.4-1,1v8c0,0.6,0.4,1,1,1s1-0.4,1-1V8
                        C17,7.4,16.6,7,16,7z"></path>
                    </svg>  
                </button>
            </div>

            <div className = "backButton">
                <button onClick = {backSong}>
                    <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24" id="back">
                        <path d="M16.7,15.3L13.4,12l3.3-3.3c0.4-0.4,0.4-1,0-1.4c-0.4-0.4-1-0.4-1.4,0l-4,4c0,0,0,0,0,0c-0.4,0.4-0.4,1,0,1.4l4,4
                            c0.2,0.2,0.4,0.3,0.7,0.3c0.3,0,0.5-0.1,0.7-0.3C17.1,16.3,17.1,15.7,16.7,15.3z M8,7C7.4,7,7,7.4,7,8v8c0,0.6,0.4,1,1,1s1-0.4,1-1
                            V8C9,7.4,8.6,7,8,7z"></path>
                    </svg>
                </button>
            </div>

            {songPaused 
            ?
            <button onClick = {playSong}>
                 <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" id="play">
                    <path fill="none" d="M0 0h48v48H0z"></path>
                     <path d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm-4 29V15l12 9-12 9z"></path>
                </svg>
            </button>
            :
            <button  onClick={pauseSong}>
                 <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" id="pause">
                <path fill="#000" d="M8 5a2 2 0 0 0-2 2v10a2 2 0 1 0 4 0V7a2 2 0 0 0-2-2zm8 0a2 2 0 0 0-2 2v10a2 2 0 1 0 4 0V7a2 2 0 0 0-2-2z"></path>
                </svg>
            </button>
            }

          

          
        </div>
    )
}

export default GetPlaylist;

