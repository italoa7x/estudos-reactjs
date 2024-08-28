import { useCallback, useEffect, useState } from "react";
import "./App.css";
import Game from "./components/Game";
import GameOver from "./components/GameOver";
import StartScreem from "./components/StartScreem";

import { wordsList } from "./data/words";
const stages = [
  {
    id: 1,
    name: "Start",
  },
  {
    id: 2,
    name: "Game",
  },
  {
    id: 3,
    name: "End",
  },
];
function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);
  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(3);
  const [score, setScore] = useState(0);

  const pickWordAndCategory = useCallback(() => {
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * categories.length)];
    const word =
      words[category][Math.floor(Math.random() * words[category].length)];
    return { word, category };
  }, [words]);

  const startGame = useCallback(() => {
    reset();
    const { word, category } = pickWordAndCategory();
    let wordLetters = word.split("");
    wordLetters = wordLetters.map((x) => x.toLowerCase());

    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);

    setGameStage(stages[1].name);
  }, [pickWordAndCategory]);

  const verifyLetter = (letter) => {
    const normalize = letter?.toLowerCase();
    if (
      guessedLetters?.includes(normalize) ||
      wrongLetters?.includes(normalize)
    ) {
      return;
    }

    if (letters?.includes(normalize)) {
      setGuessedLetters((current) => [...current, normalize]);
    } else {
      setWrongLetters((current) => [...current, normalize]);

      setGuesses((current) => current - 1);
    }
  };

  const retry = () => {
    setGameStage(stages[0].name);
    setScore(0);
    setGuesses(3);
  };

  useEffect(() => {
    if (guesses === 0) {
      setGameStage(stages[2].name);
      reset();
    }
  }, [guesses]);

  useEffect(() => {
    const uniqueLetter = [...new Set(letters)];

    if (guessedLetters.length === uniqueLetter.length) {
      setScore((current) => (current += 100));
      startGame();
    }
  }, [guessedLetters, letters, startGame]);

  const reset = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  };
  return (
    <div className="App">
      {gameStage === "Start" && <StartScreem startGame={startGame} />}
      {gameStage === "Game" && (
        <Game
          verifyLetter={verifyLetter}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />
      )}
      {gameStage === "End" && <GameOver retry={retry} score={score} />}
    </div>
  );
}

export default App;
