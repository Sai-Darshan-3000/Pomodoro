import { useState, useRef, useEffect } from "react";

const musicTracks = {
  lofi: {
    name: "Fireplace Lofi",
    url: "/sounds/fire.mp3"
  },
  jazz: {
    name: "Ocean Waves",
    url: "/sounds/oceans.mp3"
  },
  ambient: {
    name: "White Noise",
    url: "/sounds/whitenoise.mp3"
  },
    classical: {
        name: "Rain",
        url: "/sounds/rain.mp3"
    },
};

export default function MusicPlayer() {
  const [selected, setSelected] = useState("lofi");
  const audioRef = useRef(null);

  const changeTrack = (e) => {
    setSelected(e.target.value);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      audioRef.current.play().catch(() => {
        console.log("Autoplay blocked, user interaction needed");
      });
    }
  }, [selected]);

  return (
    <div className="music-player">
      <select onChange={changeTrack} value={selected}>
        {Object.entries(musicTracks).map(([key, { name }]) => (
          <option key={key} value={key}>
            {name}
          </option>
        ))}
      </select>
      <audio ref={audioRef} controls loop>
        <source src={musicTracks[selected].url} type="audio/mp3" />
        Your browser does not support audio playback.
      </audio>
    </div>
  );
}
