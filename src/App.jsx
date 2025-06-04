import { useState, useEffect } from 'react';
import clsx from 'clsx';
import Confetti from 'react-confetti';
import { languages } from '../languages';
import { getFarewellText, getRandomWord } from '../utils';
import Header from './components/Header';
import GameStatus from './components/GameStatus';
import Languages from './components/Languages';
import WordToGuess from './components/WordToGuess';
import Keyboard from './components/Keyboard';
import NewGameBtn from './components/NewGameBtn';

function App() {
  const [currentWord, setCurrentWord] = useState(() => {
    return localStorage.getItem('savedLetters') || getRandomWord();
  });

  const [guessedLetters, setGuessedLetters] = useState(() => {
    const savedGuessedLetters = localStorage.getItem('savedGuessedLetters');
    return savedGuessedLetters ? JSON.parse(savedGuessedLetters) : [];
  });

  const [farewellText, setFarewellText] = useState(() => {
    return localStorage.getItem('savedFarewellText') || '';
  });

  useEffect(() => {
    localStorage.setItem('savedLetters', currentWord);
    localStorage.setItem('savedGuessedLetters', JSON.stringify(guessedLetters));
  }, [currentWord, guessedLetters]);

  const maxWrongGuesses = languages.length - 1;

  const wrongGuessCount = guessedLetters.filter(
    (letter) => !currentWord.includes(letter)
  ).length;

  const guessesLeft = maxWrongGuesses - wrongGuessCount;

  useEffect(() => {
    const savedWrongCount =
      parseInt(localStorage.getItem('savedWrongGuessCount')) || 0;

    if (wrongGuessCount !== savedWrongCount) {
      const text = getFarewellText(languages[wrongGuessCount - 1]?.name);
      setFarewellText(text);
      localStorage.setItem('savedFarewellText', text);
      localStorage.setItem('savedWrongGuessCount', wrongGuessCount.toString());
    }
  }, [wrongGuessCount]);

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
      return <p className="farewell-message">{farewellText}</p>;
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

  function startNewGame() {
    setCurrentWord(() => getRandomWord());
    setGuessedLetters([]);
    setFarewellText('');
    localStorage.removeItem('savedLetters');
    localStorage.removeItem('savedGuessedLetters');
    localStorage.removeItem('savedFarewellText');
    localStorage.removeItem('savedWrongGuessCount');
  }

  return (
    <main>
      {isGameWon && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={800}
          gravity={0.2}
          tweenDuration={4000}
          recycle={false}
        />
      )}

      <Header />
      <GameStatus
        renderGameStatus={renderGameStatus}
        gameStatusClass={gameStatusClass}
      />
      <Languages wrongGuessCount={wrongGuessCount} />
      <WordToGuess
        currentWord={currentWord}
        guessedLetters={guessedLetters}
        isGameLost={isGameLost}
      />
      {/* Screen reader only section */}
      <section className="sr-only" aria-live="polite">
        <p>
          {currentWord.includes(lastGuessedLetter)
            ? `Correct! The letter ${lastGuessedLetter} is in the word.`
            : `Sorry, the letter ${lastGuessedLetter} is not in the word.`}
          You have {guessesLeft} attempts left.
        </p>
        <p>
          Current word:{' '}
          {currentWord
            .split('')
            .map((letter) =>
              guessedLetters.includes(letter) ? letter + '.' : 'blank'
            )
            .join(' ')}
        </p>
      </section>
      <Keyboard
        checkLetter={checkLetter}
        addGuessedLetter={addGuessedLetter}
        isGameEnd={isGameEnd}
        guessedLetters={guessedLetters}
      />
      {isGameEnd && <NewGameBtn startNewGame={startNewGame} />}
    </main>
  );
}

export default App;
