import { useEffect, useState } from "react";
import axios from "axios";
import ErrorMessage from "./ErrorMsg";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const MusicGrid = () => {
  const [token, setToken] = useState("");
  const [auth, setAuth] = useState(false);
  const [artists, setArtists] = useState([]);
  const [guesses, setGuesses] =useState([])
  const [currentGuess, setCurrentGuess] = useState([])
  const [score, setScore] = useState(0)
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setToken(localStorage.getItem("accessToken"));
      console.log("got token");
      setAuth(true);
    }
  }, []);

  const getTopArtists = async () => {
    const url = "https://api.spotify.com/v1/me/top/artists";
    const axiosConfig = { headers: { Authorization: "Bearer " + token } };

    await axios
      .get(url, axiosConfig)
      .then((res) => {
        setArtists([]);
        for (let i in res.data.items) {
          let currentArtist = res.data.items[i].name;
          console.log(currentArtist);

          setArtists((arr) => {
            return [...arr, currentArtist];
          });
        }
      })
      .catch((err) => <ErrorMessage message={err} />);
  };
  useEffect(() => {
    const getData = async () => {
      await getTopArtists();
    };
    getData();
    console.log(artists);
  }, [auth]);

  const handleSubmit = (e) => {
    let scoreArray = [10000, 9000,8000,7000,6000,5000,4000,3000,2000,1000, 900, 800, 700, 600, 500, 400, 300, 200, 100]
    e.preventDefault();
    if(!guesses.includes(currentGuess)){
    setGuesses((arr) => {
        return [...arr, currentGuess];
      });

    if (artists.includes(currentGuess)){
        setScore(score + scoreArray[artists.indexOf(currentGuess)])
    }



    }
      console.log(guesses)
  }
  return (
    <div className="flex flex-col gap-10">
      { guesses.length < 5 ? (
        <div className="grid grid-cols-2 gap-4">
          {artists.map((artist, index) => (
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight " key={artist}>
              {index + 1}. {guesses.includes(artist) && guesses ? artist : "?????" }
            </h3>
          ))}
        </div>
      ) : (
        <h1 className="flex scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl items-center text-center">
        🎉Final score: {score} 🎉
      </h1>
      )}
      <form onSubmit={handleSubmit}>
        <div className="flex flex-row gap-10 mb-2">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-left ">
              score: {score}
              
            </h3>
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-left ">
            guess remaining: {5 - guesses.length}
              
            </h3>
            </div>
       
      <div className="flex w-full max-w-sm items-center gap-4 ">
  

        <Input type="text" placeholder="Enter name of Artist..."  onChange={(e) => setCurrentGuess(e.target.value)}/>
        <Button type="submit">Enter</Button>
        
      </div>
      </form>
    </div>
  );
};

export default MusicGrid;
