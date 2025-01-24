import { LoadingIcon } from "../icons";
import styles from "./LoadingSpinner.module.css";

interface LoadingSpinnerProps {
  size: number;
  color?: string;
}
const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size, color }) => {
  return (
    <LoadingIcon className={styles.loadingSpinner} color={color} width={size} height={size} />
  );
};

export default LoadingSpinner;
