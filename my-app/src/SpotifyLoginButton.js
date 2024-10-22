

function SpotifyLoginButton(){

    const handleLogin = (e) =>{
        e.preventDefault();
        console.log("in handle")
        window.location.href = 'http://localhost:5000/auth/login';
    }


    return(
        <button onClick = {handleLogin} >login to spotify</button>
    )
}

export default SpotifyLoginButton;