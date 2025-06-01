export default function WordToGuess({ currentWord, guessedLetters }) {
  const letters = [...currentWord];

  const wordElements = letters.map((letter, index) => (
    <span key={index} className="letter">
      {guessedLetters.includes(letter) ? letter.toUpperCase() : ''}
    </span>
  ));

  return <section className="letters-container">{wordElements}</section>;
}
