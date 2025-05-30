export default function Keyboard({ chooseLetter }) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  const lettersArray = alphabet.split('');

  return (
    <section className="keyboard">
      {lettersArray.map((letter) => (
        <button key={letter} className="keyboard-btn" onClick={chooseLetter}>
          {letter}
        </button>
      ))}
    </section>
  );
}
