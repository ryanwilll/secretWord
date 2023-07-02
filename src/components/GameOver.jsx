import "./GameOver.css";

const GameOver = ({ restartGame, score }) => {
  return (
    <div>
      <h1>Fim de Jogo!</h1>
      <h2>
        A sua pontuação foi de: <span>{score}</span>
      </h2>
      <button onClick={restartGame}>Recomeçar</button>
    </div>
  );
};

export default GameOver;
