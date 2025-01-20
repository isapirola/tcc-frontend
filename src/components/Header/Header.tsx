import { useNavigate } from "react-router-dom";
import Button from "../Button";
import styles from "./Header.module.css";
import { LoginIcon, LogoutIcon, ProfileIcon, SettingsIcon } from "../icons";

interface HeaderProps {
  isLogged: boolean;
  handleLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ isLogged, handleLogout }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.header}>
      <h1 className={styles.headerLogo}>TCC da Belinha</h1>
      <div className={styles.headerIcons}>
        {isLogged && (
          <Button onClick={() => console.log("oii")} styleType="header">
            <ProfileIcon className={styles.headerIcon} />
          </Button>
        )}
        <Button onClick={() => console.log("oii")} styleType="header">
          <SettingsIcon className={styles.headerIcon} />
        </Button>
        {isLogged ? (
          <Button onClick={handleLogout} styleType="header">
            <LogoutIcon className={styles.headerIcon} />
          </Button>
        ) : (
          <Button onClick={() => navigate("/login")} styleType="header">
            <LoginIcon className={styles.headerIcon} />
          </Button>
        )}
      </div>
    </div>
  );
};

export default Header;
