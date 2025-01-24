import { useNavigate } from "react-router-dom";
import Button from "../Button";
import styles from "./Header.module.css";
import { LoginIcon, LogoutIcon, ProfileIcon } from "../icons";

interface HeaderProps {
  isLogged: boolean;
  handleLogout: () => void;
  handleProfile: () => void;
}

const Header: React.FC<HeaderProps> = ({ isLogged, handleLogout, handleProfile }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.header}>
      <h1 className={styles.headerLogo}>TCC da Belinha</h1>
      <div className={styles.headerIcons}>
        {isLogged && (
          <Button title="Meu Perfil" onClick={handleProfile} styleType="header">
            <ProfileIcon className={styles.headerIcon} />
          </Button>
        )}
        {/* <Button title="Configurações" onClick={() => console.log("oii")} styleType="header">
          <SettingsIcon className={styles.headerIcon} />
        </Button> */}
        {isLogged ? (
          <Button title="Logout" onClick={handleLogout} styleType="header">
            <LogoutIcon className={styles.headerIcon} />
          </Button>
        ) : (
          <Button title="Login" onClick={() => navigate("/login")} styleType="header">
            <LoginIcon className={styles.headerIcon} />
          </Button>
        )}
      </div>
    </div>
  );
};

export default Header;
