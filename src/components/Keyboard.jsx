export default function Keyboard({ addGuessedLetter }) {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const lettersArray = alphabet.split('');

  return (
    <section className="keyboard">
      {lettersArray.map((letter) => (
        <button
          key={letter}
          className="keyboard-btn"
          onClick={() => addGuessedLetter(letter)}
        >
          {letter.toUpperCase()}
        </button>
      ))}
    </section>
  );
}
