import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, LoginInput } from "../../components";
import { register } from "../../api";
import styles from "../Login/Login.module.css";
import { UserContext } from "../../context/UserContext";

const Login: React.FC = () => {
  const { setUser } = useContext(UserContext)!;

  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRegister = async () => {
    setError("");
    if (!validateEmail(email)) {
      setError("Por favor, insira um e-mail válido.");
      return;
    }
    if (password !== confirmPassword) {
      setError("As senhas não coincidem. Tente novamente.");
      return; // Interrompe a execução se as senhas não forem iguais
    }

    setLoading(true);
    try {
      const response = await register(name, email, password);
      const userData = {
        id: response.user._id,
        name: response.user.name,
        email: response.user.email,
      };
      setUser(userData);
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Erro ao registrar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <Link to={"/"} className={styles.homeButton}>
        TCC da Belinha
      </Link>
      <div className={styles.contentContainer}>
        <h1 className={styles.title}>Criar conta</h1>
        {error && (
          <div className={styles.errorContainer}>
            <p className={styles.errorMessage}>{error}</p>
          </div>
        )}
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
          onEnter={handleRegister}
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirme a senha"
          icon="password"
        />
        <div className={styles.buttonContainer}>
          <Button
            label={loading ? "Carregando..." : "Registrar"}
            onClick={handleRegister}
            styleType="login"
          />
          <p className={styles.bottomText}>
            Já possui uma conta? <Link to={"/login"}>Faça login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
