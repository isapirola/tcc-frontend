import { InfoIcon } from "../icons";
import styles from "./ErrorAlert.module.css";

interface ErrorAlertProps {
  text: string;
}
const ErrorAlert: React.FC<ErrorAlertProps> = ({ text }) => {
  return (
    <div className={styles.errorContainer}>
      <InfoIcon className={styles.errorMessageIcon} />
      <p className={styles.errorMessage}>{text}</p>
    </div>
  );
};

export default ErrorAlert;
