import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, LoginInput } from "../../components";
import { register } from "../../api";
import styles from "../Login/Login.module.css";

const Login: React.FC = () => {
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    setError("");

    if (password !== confirmPassword) {
      setError("As senhas não coincidem. Tente novamente.");
      return; // Interrompe a execução se as senhas não forem iguais
    }

    try {
      await register(name, email, password);
      navigate("/");
    } catch (err: any) {
      console.error("Erro durante o registro:", err);
      setError(err.message || "Erro ao registrar. Tente novamente.");
    }
  };

  return (
    <div className={styles.mainContainer}>
      <Link to={"/"} className={styles.homeButton}>
        TCC da Belinha
      </Link>
      <div className={styles.contentContainer}>
        <h1 className={styles.title}>Criar conta</h1>
        {error && <p className={styles.errorMessage}>{error}</p>}
        <LoginInput
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome"
          icon="user"
        />
        <LoginInput
          type="email"
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
        <LoginInput
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirme a senha"
          icon="password"
        />
        <div className={styles.buttonContainer}>
          <Button label={"Registrar"} onClick={handleRegister} styleType="login" />
          <p className={styles.bottomText}>
            Já possui uma conta? <Link to={"/login"}>Faça login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
