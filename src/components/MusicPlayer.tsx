import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack } from 'lucide-react';
import { DUMMY_TRACKS } from '../types';

export default function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const track = DUMMY_TRACKS[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
        if (isPlaying) {
            audioRef.current.play().catch(e => console.error("Auto play prevented", e));
        } else {
            audioRef.current.pause();
        }
    }
  }, [isPlaying, currentTrackIndex]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const skipForward = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % DUMMY_TRACKS.length);
  };

  const skipBack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + DUMMY_TRACKS.length) % DUMMY_TRACKS.length);
  };

  return (
    <div className="p-6 bg-gray-950 border-2 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.3)] text-white w-full max-w-sm" id="music-player-container">
      <audio ref={audioRef} src={track.url} />
      <div className="mb-6 border-b border-magenta-500 pb-2" id="track-info">
        <h3 className="text-xl font-bold text-white glitch-shadow uppercase" id="track-title">{track.title}</h3>
        <p className="text-sm text-magenta-500 uppercase mt-1">{track.artist}</p>
      </div>
      <div className="flex justify-between items-center gap-6" id="music-controls">
        <button onClick={skipBack} className="text-cyan-400 hover:text-white" id="prev-button"><SkipBack/></button>
        <button onClick={togglePlay} className="p-4 bg-magenta-600 text-white border-2 border-white rounded-none hover:bg-magenta-500" id="play-pause-button">
          {isPlaying ? <Pause /> : <Play />}
        </button>
        <button onClick={skipForward} className="text-cyan-400 hover:text-white" id="next-button"><SkipForward/></button>
      </div>
    </div>
  );
}
