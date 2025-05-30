import { useState } from 'react';
import Header from './components/Header';
import GameStatus from './components/GameStatus';
import Languages from './components/Languages';
import WordToGuess from './components/WordToGuess';
import Keyboard from './components/Keyboard';
import NewGameBtn from './components/NewGameBtn';

function App() {
  const [currentWord, setCurrentWord] = useState('react');
  const [guessedLetters, setGuessedLetters] = useState([]);

  function chooseLetter(event) {
    const clickedLetter = event.target.textContent;
    if (guessedLetters.find((letter) => letter === clickedLetter)) {
      return;
    }
    return setGuessedLetters((prevLetters) => [...prevLetters, clickedLetter]);
  }
  console.log(guessedLetters);

  return (
    <main>
      <Header />
      <GameStatus />
      <Languages />
      <WordToGuess currentWord={currentWord} />
      <Keyboard chooseLetter={chooseLetter} />
      <NewGameBtn />
    </main>
  );
}

export default App;
