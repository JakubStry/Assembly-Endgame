export default function GameStatus({ renderGameStatus }) {
  const { title, message, className } = renderGameStatus();

  return (
    <section className={`game-status ${className}`}>
      <h2>{title}</h2>
      <p>{message}</p>
    </section>
  );
}
