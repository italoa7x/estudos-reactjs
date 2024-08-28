import "./styles.css";

const StartScreem = ({ startGame }) => {
  return (
    <div className="start">
      <h1>Secret Word</h1>
      <p>Clique no botão abaixo para iniciar.</p>
      <button onClick={startGame}>Começar jogo</button>
    </div>
  );
};

export default StartScreem;
