import { useState, } from "react";

export default function App() {
  const [gameState, setGameState] = useState("idle"); 
  const [message, setMessage] = useState("Kattints a START gombra!");
  const [startTime, setStartTime] = useState(0);
  const [timeoutId, setTimeoutId] = useState(0);

  function startGame() {
    setGameState("waiting");
    setMessage("Várj amíg zöld lesz...");
    const delay = Math.random() * 4000 + 1000;
    const id = setTimeout(() => {
      setGameState("ready");
      setMessage("KATTINTS MOST!");
      setStartTime(Date.now());
    }, delay);
    setTimeoutId(id);
  }
  function haClick() {
    if (gameState === "waiting") {
      clearTimeout(timeoutId);
      setGameState("idle");
      setMessage("Túl korán kattintottál! Próbáld újra.");
    }
    if (gameState === "ready") {
      const reaction = Date.now() - startTime;
      setGameState("result");
      setMessage(`Reakcióidő: ${reaction} ms`);
    }
  }
  function reset() {
    setGameState("idle");
    setMessage("Kattints a START gombra!");
  }
  return (
    <div className="btn"
      onClick={haClick}
      style={{
        height: "500px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background:gameState === "ready" ? "#4CAF50" : "purple",
        color: "white",
        fontFamily: "Arial",
        textAlign: "center",
        cursor: "pointer"
      }}
    >
      <h1>Reflexes Reflex Tesztes Teszt</h1>
      <h2>{message}</h2>
      {gameState === "idle" && (
        <button onClick={startGame} style={{ padding: "10px 20px", fontSize: "18px" }}>
          START
        </button>
      )}
      {gameState === "result" && (
        <button onClick={reset} style={{ padding: "10px 20px", fontSize: "18px" }}>
          ÚJRA
        </button>
      )}
    </div>
  );
}