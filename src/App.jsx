// Import Hooks
import { useCallback, useState, useEffect } from "react";

// Import CSS
import "./App.css";

// Dados
import { wordsList } from "./data/words";

// Import Componentes
import StartScreen from "./components/StartScreen";
import Game from "./components/Game";
import GameOver from "./components/GameOver";

const stages = [
  {
    id: 1,
    name: "start",
  },
  {
    id: 2,
    name: "game",
  },
  {
    id: 3,
    name: "end",
  },
];

const guesseQtdy = 5;

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(5);
  const [score, setScore] = useState(0);

  const pickWordAnCategory = useCallback(() => {
    const categories = Object.keys(words);
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)];

    const word =
      words[category][Math.floor(Math.random() * words[category].length)];

    return { word, category };
  }, [words]);

  const startGame = useCallback(() => {
    const { word, category } = pickWordAnCategory();

    let wordLettes = word.split("");
    wordLettes = wordLettes.map((l) => l.toLowerCase());

    clearAllStates();
    setPickedCategory(category);
    setPickedWord(word);
    setLetters(wordLettes);

    setGameStage(stages[1].name);
  }, [pickWordAnCategory]);

  const verifyLetter = (letter) => {
    const normalizeLetter = letter.toLowerCase();

    if (
      guessedLetters.includes(normalizeLetter) ||
      wrongLetters.includes(normalizeLetter)
    ) {
      return;
    }

    if (letters.includes(normalizeLetter)) {
      setGuessedLetters((prevGuessedLetters) => [
        ...prevGuessedLetters,
        normalizeLetter,
      ]);
    } else {
      setWrongLetters((prevWrongLetters) => [
        ...prevWrongLetters,
        normalizeLetter,
      ]);
      setGuesses(guesses - 1);
    }
  };

  const clearAllStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  };

  useEffect(() => {
    if (guesses <= 0) {
      setGameStage(stages[2].name);
    }
  }, [guesses]);

  useEffect(() => {
    const uniqueLetters = [...new Set(letters)];

    if (guessedLetters.length === uniqueLetters.length) {
      setScore((prevScore) => (prevScore += 100));

      clearAllStates();
      startGame();
    }
  }, [guessedLetters]);

  const restartGame = () => {
    setGuesses(guesseQtdy);
    setScore(0);
    setGameStage(stages[0].name);
  };

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" && (
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
      {gameStage === "end" && (
        <GameOver
          restartGame={restartGame}
          score={score}
          pickedWord={pickedWord}
        />
      )}
    </div>
  );
}

export default App;
