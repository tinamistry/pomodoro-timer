import { useEffect } from "react";


function SpotifyLoginButton(){

    const handleLogin = (e) =>{
        e.preventDefault()
        window.location.href = 'http://localhost:5000/auth/login';
     
    }

    const getReturnedParamsFromSpotifyAuth = (hash) =>{
        const stringAfterHash = hash.substring(1);
        const paramInUrl = stringAfterHash.split("&");
        const paramSplit = paramInUrl.reduce((accumulator, currentValue) => {
            const[key,value] = currentValue.split("=");
            accumulator[key] = value;
            return accumulator;
        }, {});

        return paramSplit

    }

    useEffect(() =>{
        if (window.location.hash){
            const{
                access_token,
                expires_in,
                token_type
            } = getReturnedParamsFromSpotifyAuth(window.location.hash)
            localStorage.clear();
            localStorage.setItem("accessToken", access_token)
            localStorage.setItem("tokenType", token_type)
            localStorage.setItem("expiresIn", expires_in)
       
            
        }
    })

    return(
        <button type="button" onClick = {handleLogin} >login to spotify</button>
    )
}

export default SpotifyLoginButton;