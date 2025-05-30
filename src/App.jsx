import { useState } from 'react';
import Header from './components/Header';
import GameStatus from './components/GameStatus';
import Languages from './components/Languages';
import WordToGuess from './components/WordToGuess';
import Keyboard from './components/Keyboard';

function App() {
  const [currentWord, setCurrentWord] = useState('react');

  return (
    <main>
      <Header />
      <GameStatus />
      <Languages />
      <WordToGuess currentWord={currentWord} />
      <Keyboard />
    </main>
  );
}

export default App;
