import clsx from 'clsx';
export default function Keyboard({ addGuessedLetter, checkLetter }) {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const lettersArray = alphabet.split('');

  return (
    <section className="keyboard">
      {lettersArray.map((letter) => (
        <button
          key={letter}
          className={clsx('keyboard-btn', checkLetter(letter))}
          onClick={() => addGuessedLetter(letter)}
        >
          {letter.toUpperCase()}
        </button>
      ))}
    </section>
  );
}
