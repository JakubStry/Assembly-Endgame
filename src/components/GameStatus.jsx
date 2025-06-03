export default function GameStatus({ gameStatusClass, renderGameStatus }) {
  return (
    <section aria-live="polite" role="status" className={gameStatusClass}>
      {renderGameStatus()}
    </section>
  );
}
