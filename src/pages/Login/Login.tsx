import React, { useState } from "react";
import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { Button, LoginInput } from "../../components";
import { login } from "../../api";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    try {
      await login(email, password);
      navigate("/");
    } catch (err: any) {
      console.error("Erro durante o login:", err);
      setError(err.message || "Erro ao fazer login. Tente novamente.");
    }
  };

  return (
    <div className={styles.mainContainer}>
      <Link to={"/"} className={styles.homeButton}>
        TCC da Belinha
      </Link>
      <div className={styles.contentContainer}>
        <h2 className={styles.title}>Fazer login</h2>
        {error && <p className={styles.errorMessage}>{error}</p>}
        <LoginInput
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          icon="email"
        />
        <LoginInput
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
          icon="password"
        />
        <div className={styles.buttonContainer}>
          <Button label={"Login"} onClick={handleLogin} styleType="login" />
          <p className={styles.bottomText}>
            Não possui uma conta? <Link to={"/register"}>Registre-se</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
