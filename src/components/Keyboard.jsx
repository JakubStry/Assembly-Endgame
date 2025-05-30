export default function Keybord() {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  const lettersArray = alphabet.split('');

  return (
    <section className="keyboard">
      {lettersArray.map((letter) => (
        <button key={letter} className="keyboard-btn">
          {letter}
        </button>
      ))}
    </section>
  );
}
