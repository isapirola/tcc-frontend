import { useCallback, useEffect, useRef, useState } from "react";

interface UseTimerProps {
  initialMinutes: number;
  onTimerEnd?: () => void;
  isIncremental: boolean;
}

const useTimer = ({ initialMinutes, onTimerEnd, isIncremental = false }: UseTimerProps) => {
  const [timeLeft, setTimeLeft] = useState<number>(initialMinutes * 60);
  // const [minutes, setMinutes] = useState<number>(initialMinutes);
  // const [seconds, setSeconds] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const startTimestamp = useRef<number | null>(null); // Para armazenar o tempo inicial

  // useEffect(() => {
  //   let timer: ReturnType<typeof setInterval>;

  //   if (isRunning && !isPaused) {
  //     timer = setInterval(() => {
  //       setSeconds((prevSeconds) => {
  //         if (!isIncremental) {
  //           // Contagem regressiva
  //           if (prevSeconds === 0) {
  //             if (minutes === 0) {
  //               clearInterval(timer);
  //               setIsRunning(false);
  //               if (onTimerEnd) {
  //                 onTimerEnd(); // Chama a função de fim de timer
  //               }
  //               return 0;
  //             } else {
  //               setMinutes((prevMinutes) => prevMinutes - 1);
  //               return 59;
  //             }
  //           }
  //           return prevSeconds - 1;
  //         } else {
  //           // Contagem progressiva
  //           if (prevSeconds === 59) {
  //             setMinutes((prevMinutes) => prevMinutes + 1);
  //             return 0;
  //           }
  //           return prevSeconds + 1;
  //         }
  //       });
  //     }, 1000);
  //   }

  //   return () => clearInterval(timer);
  // }, [isRunning, isPaused, minutes, isIncremental, onTimerEnd]);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;

    if (isRunning && !isPaused) {
      // Define o timestamp inicial
      if (!startTimestamp.current) {
        startTimestamp.current = Date.now();
      }

      timer = setInterval(() => {
        const now = Date.now();
        const elapsedSeconds = Math.floor((now - (startTimestamp.current ?? now)) / 1000);

        // Atualiza o tempo restante
        const currentTimeLeft = isIncremental
          ? elapsedSeconds
          : Math.max(0, initialMinutes * 60 - elapsedSeconds);

        setTimeLeft(currentTimeLeft);

        // Encerra o timer em contagem regressiva
        if (currentTimeLeft === 0 && !isIncremental) {
          clearInterval(timer);
          setIsRunning(false);
          if (onTimerEnd) onTimerEnd();
        }
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning, isPaused, isIncremental, onTimerEnd, initialMinutes]);

  const startTimer = useCallback(() => {
    setIsRunning(true);
    setIsPaused(false);
    if (!startTimestamp.current) {
      startTimestamp.current = Date.now() - (initialMinutes * 60 - timeLeft) * 1000;
    }
  }, [initialMinutes, timeLeft]);

  const pauseTimer = useCallback(() => {
    setIsPaused(true);
    setIsRunning(false);
    const now = Date.now();
    const elapsedSeconds = Math.floor((now - (startTimestamp.current ?? now)) / 1000);
    setTimeLeft((prevTimeLeft) => (isIncremental ? elapsedSeconds : prevTimeLeft));
    startTimestamp.current = null; // Pausa sem perder o tempo restante
  }, [isIncremental]);

  const resetTimer = useCallback(() => {
    setIsRunning(false);
    setIsPaused(false);
    setTimeLeft(0);
    startTimestamp.current = null;
  }, [initialMinutes]);

  const setTimer = useCallback(
    (newMinutes: number) => {
      if (!isRunning) {
        setTimeLeft(newMinutes * 60); // Atualiza o tempo restante em segundos
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
