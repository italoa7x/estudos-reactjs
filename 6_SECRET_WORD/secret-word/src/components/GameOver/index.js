import "./styles.css";

const GameOver = ({ retry, score }) => {
  return (
    <div>
      <h1>Game Over</h1>
      <h1>Pontuação: {score}</h1>
      <button onClick={retry}>Resetar jogo</button>
    </div>
  );
};
export default GameOver;
