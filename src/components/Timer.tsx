import React, { FC, useEffect, useRef, useState } from 'react';
import { Player } from '../models/Player';
import { Colors } from '../models/Colors';

interface TimerProps {
  currentPlayer: Player | null;
  restart: () => void;
}

const Timer: FC<TimerProps> = ({currentPlayer, restart}) => {

  const [timeBlack, setTimeBlack] = useState(300)
  const [timeWhite, setTimeWhite] = useState(300)
  const timer = useRef<null | ReturnType<typeof setInterval>>(null)

  useEffect(() => {
    startTimer()
  }, [currentPlayer])

  function startTimer() {
    if (timer.current) {
      clearInterval(timer.current)
    }
    const callback = currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer;
    timer.current = setInterval(callback, 1000);
  }

  function decrementBlackTimer() {
    setTimeBlack(prev => prev - 1)
  }

  function decrementWhiteTimer() {
    setTimeWhite(prev => prev - 1)
  }

  const handleRestartTimer = () => {
    setTimeWhite(300);
    setTimeBlack(300);
    restart()
  }

  return (
    <div>
      <div>
        <button onClick={handleRestartTimer}>
          Restart game
        </button>
        <h2>Black - {timeBlack}</h2>
        <h2>White - {timeWhite}</h2>
      </div>
    </div>
  );
};

export default Timer;