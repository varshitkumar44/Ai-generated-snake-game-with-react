export interface Track {
  id: number;
  title: string;
  artist: string;
  url: string;
}

export const DUMMY_TRACKS: Track[] = [
  { id: 1, title: "Neon Nights", artist: "SynthWave AI", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
  { id: 2, title: "Cyber Pulse", artist: "Glitch beats", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
  { id: 3, title: "Arcade Dream", artist: "Pixel Audio", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
];
