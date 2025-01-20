import React from "react";
import styles from "./Button.module.css";

interface TaskButtonProps {
  label?: string;
  onClick: () => void;
  isDisabled?: boolean;
  isSelected?: boolean;
  styleType?: "task" | "timers" | "login" | "header" | "timer" | "category";
  children?: React.ReactNode;
}

const Button: React.FC<TaskButtonProps> = ({
  label,
  onClick,
  isDisabled = false,
  isSelected = false,
  styleType = "task",
  children,
}) => {
  const getButtonClass = () => {
    switch (styleType) {
      case "task":
        return `${styles.defaultButton} ${styles.task}`;
      case "timers":
        return `${styles.defaultButton} ${styles.timers}`;
      case "login":
        return `${styles.defaultButton} ${styles.login}`;
      case "header":
        return `${styles.defaultButton} ${styles.header}`;
      case "timer":
        return `${styles.defaultButton} ${styles.timer}`;
      case "category":
        return `${styles.defaultButton} ${styles.category}`;
      default:
        return styles.defaultButton;
    }
  };

  const handleClick = () => {
    if (!isDisabled) {
      onClick();
    }
  };

  return (
    <button
      type={styleType === "login" ? "submit" : "button"}
      onClick={handleClick}
      disabled={isDisabled}
      className={`${getButtonClass()} ${isSelected && styles.selected} ${
        isDisabled && styles.disabled
      }`}>
      {children ? children : label}
    </button>
  );
};

export default Button;
