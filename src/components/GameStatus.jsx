export default function GameStatus({ gameStatusClass, renderGameStatus }) {
  return <section className={gameStatusClass}>{renderGameStatus()}</section>;
}
