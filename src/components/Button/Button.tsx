import React from "react";
import styles from "./Button.module.css";

interface TaskButtonProps {
  label?: string;
  title?: string;
  onClick: () => void;
  isDisabled?: boolean;
  isSelected?: boolean;
  styleType?: "header" | "login" | "category" | "timerTypes" | "timerButton" | "tempControl";
  children?: React.ReactNode;
}

const Button: React.FC<TaskButtonProps> = ({
  label,
  title,
  onClick,
  isDisabled = false,
  isSelected = false,
  styleType,
  children,
}) => {
  const getButtonClass = () => {
    switch (styleType) {
      case "header":
        return `${styles.defaultButton} ${styles.header}`;
      case "login":
        return `${styles.defaultButton} ${styles.login}`;
      case "category":
        return `${styles.defaultButton} ${styles.category}`;
      case "timerTypes":
        return `${styles.defaultButton} ${styles.timerTypes}`;
      case "timerButton":
        return `${styles.defaultButton} ${styles.timerButton}`;
      case "tempControl":
        return `${styles.defaultButton} ${styles.tempControl}`;
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
      title={title}
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
