/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import SnakeGame from './components/SnakeGame';
import MusicPlayer from './components/MusicPlayer';

export default function App() {
  const [score, setScore] = useState(0);

  return (
    <div className="min-h-screen bg-black text-white p-8 font-mono" id="app-root">
      <header className="mb-8 border-b-2 border-cyan-500 pb-4" id="app-header">
        <h1 className="text-5xl font-extrabold glitch-shadow text-white uppercase tracking-tighter" id="app-title">
          NeonBeat Snake
        </h1>
        <p className="text-magenta-500 mt-2 text-sm uppercase">INITIATING // RHYTHM // GRID</p>
      </header>

      <main className="grid md:grid-cols-[1fr,350px] gap-8" id="app-main">
        <section className="bg-gray-950 p-6 border-2 border-magenta-500 shadow-[0_0_15px_rgba(236,72,153,0.3)]" id="game-container">
          <div className="flex justify-between items-center mb-6" id="game-header">
            <h2 className="text-2xl font-bold text-cyan-400 uppercase" id="game-title">System: Snake</h2>
            <div className="text-2xl font-bold text-magenta-500 glitch-shadow" id="score-counter">SCORE: {score}</div>
          </div>
          <SnakeGame onScoreUpdate={setScore} />
        </section>
        
        <aside id="music-sidebar">
          <MusicPlayer />
        </aside>
      </main>
    </div>
  );
}
