import { useState } from 'react';
import confetti from 'canvas-confetti';
import { Square } from './components/Square';
import { TURN } from './constants';
import { checkWinner, checkEndGame } from './logic/board';
import { WinnerModal } from './components/WinnerModal';

function App() {
  const [board, setBoard] = useState(() => {
    const boardStorage = window.localStorage.getItem('board');
    return boardStorage ? JSON.parse(boardStorage) : Array(9).fill(null);
  })
  const [turn, setTurn] = useState(() => {
    const turnStorage = window.localStorage.getItem('turn');
    return turnStorage ?? TURN.X;
  });
  const [winner, setWinner] = useState(null);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURN.X);
    setWinner(null);

    window.localStorage.removeItem('board');
    window.localStorage.removeItem('turn');
  }

  const updateBoard = (index) => {
    if(board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    const newTurn = turn === TURN.X ? TURN.O : TURN.X;
    setTurn (newTurn);
    
    window.localStorage.setItem('board', JSON.stringify(newBoard));
    window.localStorage.setItem('turn', newTurn);

    const newWinner = checkWinner(newBoard);
    if(newWinner) {
      confetti();
      setWinner(newWinner);
    }else if(checkEndGame(newBoard)){
      setWinner(false);
    }
  }

  return (
    <main className="board">
      <h1>Michi</h1>
      <button onClick={resetGame}>Reset del juego</button>

      <section className="game">
        {
          board.map((square, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {square}
              </Square>
            )
          })
        }
      </section>

      <section className="turn">
        <Square isSelected = { turn === TURN.X} >
          {TURN.X}
        </Square>
        <Square isSelected = { turn === TURN.O} >
          {TURN.O}
        </Square>
      </section>
      
      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  )
}

export default App;