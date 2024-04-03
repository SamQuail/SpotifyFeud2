import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
   
  } from "@/components/ui/dialog"
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";

const getAccessTokenFromAuthURL = (hash: any) => {
  // this splits up the returned values after the hashtag, thus removing the localhost
    const afterHashtag = hash.substring(1);
  // this separates each value from the string
    const params = afterHashtag.split("&");
  // at the moment params contains all the values we need, but are grouped together, making it difficult to interact with
  // to solve this problem .reduce was used to iterate through params and septate them into key-value pairs.
    const paramsSplit = params.reduce((accumulator: any, currentValue: any) => {  
        const [key, value] = currentValue.split("=");
        accumulator[key] = value;
        return accumulator;
    }, {})
    return paramsSplit
}

  
const AuthModal = ( ) => {
  const [open, setOpen] = useState(true);
  const [auth, setAuth] = useState(false)

  //these are required parameters are required for the authorization process 
  const clientID = import.meta.env.VITE_CLIENT_ID
  const clientSecret = import.meta.env.VITE_CLIENT_SECRET
  const spotifyAuthEndpoint = 'https://accounts.spotify.com/authorize'
  const redirectURL = 'http://localhost:5173/'

  // SCOPES - this is a list setting the data I want to obtain with the spotify api
  const scopes = ["user-top-read"]
  // this is done for format the scope if multiple are stated, as %20 is a space
  const scopeURL = scopes.join("%20")

  useEffect(() => {
    if (window.location.hash) {
        const {access_token, expires_in, token_type } = getAccessTokenFromAuthURL(window.location.hash)
        localStorage.clear()
        localStorage.setItem("accessToken", access_token)
        localStorage.setItem("expiresIn", expires_in)
        localStorage.setItem("tokenType", token_type)
  
  setAuth(true)
}
})
const handleLogin = () => {
  // using Template Literals and window.location to redirect the user to authenticate 
  window.location = `${spotifyAuthEndpoint}?client_id=${clientID}&redirect_uri=${redirectURL}&scope=${scopeURL}&response_type=token&show_dialog=true`
}


    return (
        <div>
          {
            auth? " ":
       <Dialog open={open} onOpenChange={setOpen}>

      <DialogContent className="sm:max-w-[425px]">
         To use this application you must sign-in via Spotify, this is so the application can 
         obtain your Spotify statistics.
        <DialogFooter>
          <Button
          onClick={
            handleLogin
          }
       
    
            type="submit"
          >
            Auth
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
}

        </div>
    )
}

export default AuthModal;