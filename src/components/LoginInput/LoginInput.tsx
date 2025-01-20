import React from "react";
import styles from "./LoginInput.module.css";
import { EmailIcon, LockIcon, ProfileIcon } from "../icons";

interface LoginInputProps {
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
  icon?: "user" | "email" | "password";
}

const LoginInput: React.FC<LoginInputProps> = ({
  type,
  value,
  onChange,
  placeholder,
  required = false,
  icon,
}) => {
  const getIcon = () => {
    switch (icon) {
      case "user":
        return <ProfileIcon color="var(--a5)" width={20} height={20} />;
      case "email":
        return <EmailIcon color="var(--a5)" width={20} height={20} />;
      case "password":
        return <LockIcon color="var(--a5)" width={20} height={20} />;
      default:
        return;
    }
  };
  return (
    <div className={styles.input}>
      {getIcon()}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

export default LoginInput;
