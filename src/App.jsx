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

  const wrongGuessesCount = guessedLetters.filter(
    (letter) => !currentWord.includes(letter)
  ).length;

  console.log(wrongGuessesCount);

  function addGuessedLetter(letter) {
    if (guessedLetters.includes(letter)) return;
    setGuessedLetters((prevLetters) => [...prevLetters, letter]);
  }

  function checkLetter(letter) {
    if (!guessedLetters.includes(letter)) return null;
    return currentWord.includes(letter) ? 'right-letter' : 'wrong-letter';
  }

  return (
    <main>
      <Header />
      <GameStatus />
      <Languages wrongGuessesCount={wrongGuessesCount} />
      <WordToGuess currentWord={currentWord} guessedLetters={guessedLetters} />
      <Keyboard addGuessedLetter={addGuessedLetter} checkLetter={checkLetter} />
      <NewGameBtn />
    </main>
  );
}

export default App;
