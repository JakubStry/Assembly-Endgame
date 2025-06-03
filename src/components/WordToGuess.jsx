export default function WordToGuess({
  currentWord,
  guessedLetters,
  isGameLost,
}) {
  const letters = [...currentWord];

  const wordElements = letters.map((letter, index) => {
    const shouldShow = isGameLost || guessedLetters.includes(letter);
    const displayLetter = shouldShow ? letter.toUpperCase() : '';

    return (
      <span key={index} className="letter">
        {displayLetter}
      </span>
    );
  });

  return <section className="letters-container">{wordElements}</section>;
}
