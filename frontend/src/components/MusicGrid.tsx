import { useEffect, useState } from "react";
import axios from "axios";
import ErrorMessage from "./ErrorMsg";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { motion, useInView, useAnimation } from "framer-motion";

const MusicGrid = () => {
  const [token, setToken] = useState("");
  const [auth, setAuth] = useState(false);
  const [artists, setArtists] = useState([]);
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState([]);
  const [score, setScore] = useState(0);
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
    let scoreArray = [
      10000, 9000, 8000, 7000, 6000, 5000, 4000, 3000, 2000, 1000, 900, 800,
      700, 600, 500, 400, 300, 200, 100, 50
    ];
    e.preventDefault();
    if (!guesses.includes(currentGuess)) {
      setGuesses((arr) => {
        return [...arr, currentGuess];
      });

      if (artists.includes(currentGuess)) {
        setScore(score + scoreArray[artists.indexOf(currentGuess)]);
      }
    }
    console.log(guesses);
  };
  return (
    <div className="flex flex-col gap-10 items-center text-center">
      {guesses.length >= 5 ? (
        <motion.div
          className="flex flex-col gap-10 text-center ga"
          variants={{
            hidden: { opacity: 0, y: 90 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate="visible"
        >
          <h1 className="flex scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl items-center text-center">
            🎉Final score: {score} 🎉
          </h1>
        </motion.div>
      ) : (
        ""
      )}

      <div className="flex flex-col  gap-20 items-center text-center">
        <div className="grid grid-cols-2 gap-x-80 gap-y-2">
          {artists.map((artist, index) => (
            <h3
              className="scroll-m-20 text-2xl font-semibold tracking-tight bg-[#2dac5c] text-white rounded min-w-[15rem] min-h-[2.2rem] "
              key={artist}
            >
              {guesses.includes(artist) || guesses.length >= 5 ? (
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 75 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  initial="hidden"
                  animate="visible"
                >
                  {index + 1}. {artist}{" "}
                </motion.div>
              ) : (
                index + 1
              )}
            </h3>
          ))}
        </div>
       

          {guesses.length >= 5 ? (
            ""
          ) : (
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
              <Input
                type="text"
                placeholder="Enter name of Artist..."
                onChange={(e) => setCurrentGuess(e.target.value)}
              />
              <Button type="submit">Enter</Button>
            </div>
            </form>
          )}
      
      </div>
    </div>
  );
};

export default MusicGrid;
