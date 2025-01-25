import { useCallback, useEffect, useRef, useState } from "react";

interface UseTimerProps {
  initialMinutes: number;
  onTimerEnd?: () => void;
  isIncremental: boolean;
}

const useTimer = ({ initialMinutes, onTimerEnd, isIncremental = false }: UseTimerProps) => {
  const [timeLeft, setTimeLeft] = useState<number>(initialMinutes * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const startTimestamp = useRef<number | null>(null);
  const pausedTime = useRef<number>(initialMinutes * 60);

  useEffect(() => {
    setTimeLeft(initialMinutes * 60);
    pausedTime.current = initialMinutes * 60;
    setIsRunning(false);
    setIsPaused(false);
    startTimestamp.current = null;
  }, [initialMinutes]);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;

    if (isRunning && !isPaused) {
      if (!startTimestamp.current) {
        startTimestamp.current = Date.now();
      }

      timer = setInterval(() => {
        const now = Date.now();
        const elapsedSeconds = Math.floor((now - (startTimestamp.current ?? now)) / 1000);

        const updatedTime = isIncremental
          ? pausedTime.current + elapsedSeconds
          : Math.max(0, pausedTime.current - elapsedSeconds);

        setTimeLeft(updatedTime);

        if (!isIncremental && updatedTime === 0) {
          // Se for regressivo, encerra quando o tempo chegar a zero
          clearInterval(timer);
          setIsRunning(false);
          if (onTimerEnd) onTimerEnd();
        }
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning, isPaused, isIncremental, onTimerEnd]);

  const startTimer = useCallback(() => {
    setIsRunning(true);
    setIsPaused(false);

    if (!startTimestamp.current) {
      startTimestamp.current = Date.now();
    }
  }, []);

  const pauseTimer = useCallback(() => {
    setIsPaused(true);
    setIsRunning(false);

    if (startTimestamp.current) {
      const now = Date.now();
      const elapsedSeconds = Math.floor((now - startTimestamp.current) / 1000);

      pausedTime.current = isIncremental
        ? pausedTime.current + elapsedSeconds
        : Math.max(0, pausedTime.current - elapsedSeconds);

      setTimeLeft(pausedTime.current);
      startTimestamp.current = null;
    }
  }, [isIncremental, initialMinutes]);

  const resetTimer = useCallback(() => {
    setIsRunning(false);
    setIsPaused(false);
    setTimeLeft(initialMinutes * 60);

    pausedTime.current = initialMinutes * 60;
    startTimestamp.current = null;
  }, [initialMinutes]);

  const setTimer = useCallback(
    (newMinutes: number) => {
      if (!isRunning) {
        setTimeLeft(newMinutes * 60);
        pausedTime.current = newMinutes * 60;
        startTimestamp.current = null;
      }
    },
    [isRunning]
  );

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return {
    minutes,
    seconds,
    isRunning,
    isPaused,
    startTimer,
    pauseTimer,
    resetTimer,
    setTimer,
  };
};

export default useTimer;
