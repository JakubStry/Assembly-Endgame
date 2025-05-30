export default function WordToGuess({ currentWord }) {
  const word = currentWord.toUpperCase();
  const letters = [...word];

  return (
    <section className="letters-container">
      {letters.map((letter, index) => (
        <span key={index} className="letter">
          {letter}
        </span>
      ))}
    </section>
  );
}
