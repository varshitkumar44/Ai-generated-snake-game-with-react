import React, { useEffect, useRef, useState, useCallback } from 'react';

interface SnakeGameProps {
  onScoreUpdate: (score: number) => void;
}

const GRID_SIZE = 20;
const CANVAS_SIZE = 400;
const CELL_SIZE = CANVAS_SIZE / GRID_SIZE;

export default function SnakeGame({ onScoreUpdate }: SnakeGameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState({ x: 1, y: 0 });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isRunning, setIsRunning] = useState(true);

  const resetGame = useCallback(() => {
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: 5, y: 5 });
    setDirection({ x: 1, y: 0 });
    setScore(0);
    onScoreUpdate(0);
    setGameOver(false);
    setIsRunning(true);
  }, [onScoreUpdate]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp': if (direction.y !== 1) setDirection({ x: 0, y: -1 }); break;
        case 'ArrowDown': if (direction.y !== -1) setDirection({ x: 0, y: 1 }); break;
        case 'ArrowLeft': if (direction.x !== 1) setDirection({ x: -1, y: 0 }); break;
        case 'ArrowRight': if (direction.x !== -1) setDirection({ x: 1, y: 0 }); break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  useEffect(() => {
    if (!isRunning || gameOver) return;

    const gameLoop = setInterval(() => {
      setSnake(prevSnake => {
        const newSnake = [...prevSnake];
        const head = { ...newSnake[0] };
        head.x += direction.x;
        head.y += direction.y;

        if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE || newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
          setGameOver(true);
          setIsRunning(false);
          return prevSnake;
        }

        newSnake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
          setScore(s => {
              const newScore = s + 10;
              onScoreUpdate(newScore);
              return newScore;
          });
          setFood({ x: Math.floor(Math.random() * GRID_SIZE), y: Math.floor(Math.random() * GRID_SIZE) });
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, 150);

    return () => clearInterval(gameLoop);
  }, [isRunning, gameOver, direction, food.x, food.y, onScoreUpdate]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    ctx.fillStyle = '#06b6d4'; // Cyan
    snake.forEach(segment => ctx.fillRect(segment.x * CELL_SIZE, segment.y * CELL_SIZE, CELL_SIZE - 1, CELL_SIZE - 1));

    ctx.fillStyle = '#ec4899'; // Magenta
    ctx.fillRect(food.x * CELL_SIZE, food.y * CELL_SIZE, CELL_SIZE - 1, CELL_SIZE - 1);
  }, [snake, food]);

  return (
    <div className="flex flex-col items-center gap-4" id="snake-game-wrapper">
      <canvas ref={canvasRef} width={CANVAS_SIZE} height={CANVAS_SIZE} className="border-2 border-magenta-500 shadow-[0_0_20px_rgba(236,72,153,0.5)]" id="snake-canvas" />
      {gameOver && (
          <button onClick={resetGame} className="px-6 py-2 bg-cyan-600 text-black font-bold border-2 border-white hover:bg-cyan-500 uppercase tracking-widest" id="restart-button">
              [ SYSTEM FAILURE ] RESTART
          </button>
      )}
    </div>
  );
}
