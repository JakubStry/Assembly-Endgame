export default function WordToGuess({ currentWord, guessedLetters }) {
  const word = currentWord;
  const letters = [...word];

  const wordElements = letters.map((letter, index) => (
    <span key={index} className="letter">
      {guessedLetters.includes(letter) ? letter.toUpperCase() : ''}
    </span>
  ));

  return <section className="letters-container">{wordElements}</section>;
}
