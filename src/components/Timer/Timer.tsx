import React, { useEffect, useState } from "react";
import styles from "./Timer.module.css";
import { PauseIcon, PlayIcon, SkipIcon, StopIcon } from "../icons";
import Button from "../Button";
import { useTimer } from "../../hooks";

interface TimerProps {
  handleTimerStop: (totalSeconds: number) => void;
}

const Timer: React.FC<TimerProps> = ({ handleTimerStop }) => {
  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  const pomodoroConfig = {
    initialMinutes: 25,
    pomodoroTypes: [
      { label: "Pomodoro", time: 25 },
      { label: "Pausa curta", time: 5 },
      { label: "Pausa longa", time: 15 },
    ],
  };

  const [initialTime, setInitialTime] = useState(pomodoroConfig.pomodoroTypes[0].time);
  const [selectedTimerType, setSelectedTimerType] = useState(0);
  const [selectedPomodoroType, setSelectedPomodoroType] = useState(0);
  const [customTimerMinutes, setCustomTimerMinutes] = useState("0");
  const [customTimerHours, setCustomTimerHours] = useState("0");

  const isPomodoro = selectedTimerType === 0;
  const isTimer = selectedTimerType === 1;
  const isCronometer = selectedTimerType === 2;

  const timerTypes = ["Pomodoro", "Temporizador", "Cronômetro"];

  const {
    minutes,
    seconds,
    isRunning,
    isPaused,
    startTimer,
    pauseTimer,
    resetTimer,
    setTimer,
  } = useTimer({
    initialMinutes: initialTime,
    onTimerEnd: () => {
      stopTimer();
      if (Notification.permission === "granted") {
        new Notification("O timer terminou!", {
          body: "Seu tempo chegou ao fim.",
        });
      }
    },
    isIncremental: isCronometer,
  });

  const handleTimerTypeClick = (index: number) => {
    setSelectedTimerType(index);
    if (index === 0) {
      resetTimer();
      setInitialTime(pomodoroConfig.pomodoroTypes[0].time);
      setTimer(pomodoroConfig.pomodoroTypes[0].time);
      setSelectedPomodoroType(0);
    } else {
      setTimer(0);
      setInitialTime(0);
    }
  };
  const handlePomodoroTypeClick = (index: number) => {
    setSelectedPomodoroType(index);
    setInitialTime(pomodoroConfig.pomodoroTypes[index].time);
    setTimer(pomodoroConfig.pomodoroTypes[index].time);
  };

  const handleSetCustomTimer = () => {
    const customTimerTotal = Number(customTimerHours) * 60 + Number(customTimerMinutes);
    setInitialTime(initialTime + customTimerTotal);
    setTimer(minutes + customTimerTotal);
  };

  const handleChangeHours = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    // Permitir vazio, e só validar se não for vazio
    if (value === "" || (/^\d+$/.test(value) && Number(value) >= 0 && Number(value) <= 99)) {
      setCustomTimerHours(value);
    }
  };
  const handleChangeMinutes = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    // Permitir vazio, e só validar se não for vazio
    if (value === "" || (/^\d+$/.test(value) && Number(value) >= 0 && Number(value) <= 59)) {
      setCustomTimerMinutes(value);
    }
  };

  const toggleTimer = () => {
    if (isRunning) {
      if (isPaused) startTimer();
      else pauseTimer();
    } else {
      startTimer();
    }
  };

  const stopTimer = () => {
    if (isPomodoro) {
      if (selectedPomodoroType === 0) {
        handleTimerStop(initialTime * 60 - (minutes * 60 + seconds));
      }
    } else if (isCronometer) {
      handleTimerStop(minutes * 60 + seconds);
    } else {
      handleTimerStop(initialTime * 60 - (minutes * 60 + seconds));
      setInitialTime(0);
    }
    resetTimer();
  };

  const handleSkipPomodoro = () => {
    if (selectedPomodoroType === 2) {
      handlePomodoroTypeClick(0);
    } else {
      handlePomodoroTypeClick(selectedPomodoroType + 1);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.timerTypes}>
        {timerTypes.map((label, index) => (
          <Button
            key={index}
            label={label}
            onClick={() => handleTimerTypeClick(index)}
            isSelected={selectedTimerType === index}
            isDisabled={isRunning}
            styleType="timers"
          />
        ))}
      </div>
      <div className={styles.timerRow}>
        <div className={styles.timerContainer}>
          <div className={styles.timerCircle}>
            <div className={isPomodoro ? styles.timerMinute : styles.timerHour}>
              {!isPomodoro && (
                <h1>{String(Math.floor(minutes / 60)).padStart(2, "0")}:</h1> // Exibe horas
              )}
              <h1>{String(!isPomodoro ? minutes % 60 : minutes).padStart(2, "0")}:</h1>
              <h1>{String(seconds).padStart(2, "0")}</h1>
            </div>
          </div>
          <div className={styles.timerButtonContainer}>
            <div className={styles.timerButton} onClick={toggleTimer}>
              {isRunning && !isPaused ? (
                <PauseIcon className={styles.timerIcon} />
              ) : (
                <PlayIcon className={styles.timerIcon} />
              )}
            </div>
            <div className={styles.timerButton} onClick={stopTimer}>
              <StopIcon className={styles.timerIcon} />
            </div>
            {isPomodoro && (
              <div className={styles.timerButton} onClick={handleSkipPomodoro}>
                <SkipIcon className={styles.timerIcon} />
              </div>
            )}
          </div>
        </div>
        {isPomodoro && (
          <div className={styles.pomodoroButtons}>
            {pomodoroConfig.pomodoroTypes.map((pomodoro, index) => (
              <Button
                key={index}
                label={pomodoro.label}
                onClick={() => handlePomodoroTypeClick(index)}
                isDisabled={isRunning}
                isSelected={selectedPomodoroType === index}
                styleType="timers"
              />
            ))}
          </div>
        )}
        {isTimer && (
          <div className={styles.tempContainer}>
            <div className={styles.tempInputs}>
              <div className={styles.tempInputContainer}>
                <h4>Horas</h4>
                <input
                  type="number"
                  min={0}
                  value={customTimerHours}
                  onChange={handleChangeHours}
                  className={styles.tempInput}
                />
              </div>
              <div className={styles.tempInputContainer}>
                <h4>Minutos</h4>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={customTimerMinutes}
                  onChange={handleChangeMinutes}
                  className={styles.tempInput}
                />
              </div>
            </div>
            <Button
              label="Adicionar Tempo"
              onClick={handleSetCustomTimer}
              isDisabled={isRunning}
              styleType="timer"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Timer;
