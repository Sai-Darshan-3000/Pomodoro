import { useState, useEffect, useRef } from 'react';

function Pomodoro() {
  // Default Times
  const [customWork, setCustomWork] = useState(25);
  const [customShort, setCustomShort] = useState(5);
  const [customLong, setCustomLong] = useState(15);

  const [secondsLeft, setSecondsLeft] = useState(customWork * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState('work');
  const [cycles, setCycles] = useState(0);

  const intervalRef = useRef(null);
  const alarmRef = useRef(null);

  useEffect(() => {
    // Reset time if mode changes or custom time changes
    if (!isRunning) {
      const newTime =
        mode === 'work'
          ? customWork * 60
          : mode === 'short'
          ? customShort * 60
          : customLong * 60;
      setSecondsLeft(newTime);
    }
  }, [mode, customWork, customShort, customLong]);

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const secsLeft = secs % 60;
    return `${String(mins).padStart(2, '0')}:${String(secsLeft).padStart(2, '0')}`;
  };

  const playAlarm = () => {
    if (alarmRef.current) {
      alarmRef.current.currentTime = 0;
      alarmRef.current.play().catch((err) => {
        console.log("Alarm playback failed:", err);
      });
    }
  };

  const startTimer = () => {
    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev === 0) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          playAlarm();
          handleSessionEnd();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    setIsRunning(true);
  };

  const pauseTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setIsRunning(false);
  };

  const resetTimer = () => {
    pauseTimer();
    const resetTime =
      mode === 'work'
        ? customWork * 60
        : mode === 'short'
        ? customShort * 60
        : customLong * 60;
    setSecondsLeft(resetTime);
  };

  const handleSessionEnd = () => {
    if (mode === 'work') {
      const nextCycles = cycles + 1;
      setCycles(nextCycles);

      if (nextCycles % 4 === 0) {
        setMode('long');
      } else {
        setMode('short');
      }
    } else {
      setMode('work');
    }

    setIsRunning(false);
  };

  return (
    <div>
      <audio ref={alarmRef} src="/a.mp3" preload="auto" />

      <h2>{mode === 'work' ? 'Focus Time' : mode === 'short' ? 'Short Break' : 'Long Break'}</h2>

      <h1 style={{ fontSize: '4rem', margin: '1rem 0' }}>{formatTime(secondsLeft)}</h1>

      <div>
        {isRunning ? (
          <button onClick={pauseTimer}>Pause</button>
        ) : (
          <button onClick={startTimer}>Start</button>
        )}
        <button onClick={resetTimer} style={{ marginLeft: '1rem' }}>Reset</button>
      </div>

      <p style={{ marginTop: '1rem' }}>Completed Cycles: {cycles}</p>

  

      <div>
        <label>
          Work (mins):{' '}
          <input
            type="number"
            value={customWork}
            onChange={(e) => setCustomWork(Number(e.target.value))}
            disabled={isRunning}
          />
        </label>
        <label style={{ marginLeft: '1rem' }}>
          Short Break:{' '}
          <input
            type="number"
            value={customShort}
            onChange={(e) => setCustomShort(Number(e.target.value))}
            disabled={isRunning}
          />
        </label>
        <label style={{ marginLeft: '1rem' }}>
          Long Break:{' '}
          <input
            type="number"
            value={customLong}
            onChange={(e) => setCustomLong(Number(e.target.value))}
            disabled={isRunning}
          />
        </label>
      </div>
    </div>
  );
}

export default Pomodoro;
