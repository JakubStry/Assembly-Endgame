import clsx from 'clsx';
export default function Keyboard({ addGuessedLetter, checkLetter, isGameEnd }) {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const lettersArray = alphabet.split('');

  return (
    <section className="keyboard">
      {lettersArray.map((letter) => (
        <button
          key={letter}
          className={clsx('keyboard-btn', checkLetter(letter))}
          disabled={isGameEnd}
          onClick={() => addGuessedLetter(letter)}
        >
          {letter.toUpperCase()}
        </button>
      ))}
    </section>
  );
}
