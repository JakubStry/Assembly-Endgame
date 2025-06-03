import { useState } from 'react';
import clsx from 'clsx';
import { languages } from '../languages';
import { getFarewellText } from '../utils';
import Header from './components/Header';
import GameStatus from './components/GameStatus';
import Languages from './components/Languages';
import WordToGuess from './components/WordToGuess';
import Keyboard from './components/Keyboard';
import NewGameBtn from './components/NewGameBtn';

function App() {
  const [currentWord, setCurrentWord] = useState('react');
  const [guessedLetters, setGuessedLetters] = useState([]);

  const maxWrongGuesses = languages.length - 1;
  const wrongGuessCount = guessedLetters.filter(
    (letter) => !currentWord.includes(letter)
  ).length;
  const guessesLeft = maxWrongGuesses - wrongGuessCount;
  const isGameWon = currentWord
    .split('')
    .every((letter) => guessedLetters.includes(letter));
  const isGameLost = wrongGuessCount >= maxWrongGuesses;
  const isGameEnd = isGameWon || isGameLost;
  const lastGuessedLetter = guessedLetters[guessedLetters.length - 1];
  const isLastGuessIncorrect =
    lastGuessedLetter && !currentWord.includes(lastGuessedLetter);

  function addGuessedLetter(letter) {
    setGuessedLetters((prevLetters) =>
      prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter]
    );
  }

  function checkLetter(letter) {
    if (!guessedLetters.includes(letter)) return null;
    return currentWord.includes(letter) ? 'right-letter' : 'wrong-letter';
  }

  const gameStatusClass = clsx('game-status', {
    won: isGameWon,
    lost: isGameLost,
    farewell: !isGameEnd && isLastGuessIncorrect,
  });

  function renderGameStatus() {
    if (!isGameEnd && isLastGuessIncorrect) {
      return (
        <p className="farewell-message">
          {getFarewellText(languages[wrongGuessCount - 1].name)}
        </p>
      );
    }

    if (isGameWon) {
      return (
        <>
          <h2>You win!</h2>
          <p>Well done! 🎉</p>
        </>
      );
    }

    if (isGameLost) {
      return (
        <>
          <h2>Game over!</h2>
          <p>You lose! Better start learning Assembly 😭</p>
        </>
      );
    }

    return null;
  }

  return (
    <main>
      <Header />
      <GameStatus
        renderGameStatus={renderGameStatus}
        gameStatusClass={gameStatusClass}
      />
      <Languages wrongGuessCount={wrongGuessCount} />
      <WordToGuess currentWord={currentWord} guessedLetters={guessedLetters} />
      {/* Screen reader only section*/}
      <section className="sr-only" aria-live="polite">
        <p>
          {currentWord.includes(lastGuessedLetter)
            ? `Correct! The letter ${lastGuessedLetter} is in the world.`
            : `Sorry, the letter ${lastGuessedLetter} is not in the world.`}
          You have {guessesLeft} attemps left.
        </p>
        <p>
          Current word:{' '}
          {currentWord
            .split('')
            .map((letter) =>
              guessedLetters.includes(letter) ? letter + '.' : 'blank'
            )
            .join(' ')}
          dd
        </p>
      </section>
      <Keyboard
        checkLetter={checkLetter}
        addGuessedLetter={addGuessedLetter}
        isGameEnd={isGameEnd}
        guessedLetters={guessedLetters}
      />
      {isGameEnd && <NewGameBtn />}
    </main>
  );
}

export default App;
