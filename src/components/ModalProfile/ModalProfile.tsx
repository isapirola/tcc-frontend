import Modal from "react-modal";
import styles from "./ModalProfile.module.css";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import Button from "../Button";

Modal.setAppElement("#root");

interface ModalProfileProps {
  isOpen: boolean;
  onClose: () => void;
  handleEditUser: (name: string, email: string, password?: string) => void;
  handleDeleteUser: () => void;
}

const ModalProfile: React.FC<ModalProfileProps> = ({
  isOpen,
  onClose,
  handleEditUser,
  handleDeleteUser,
}) => {
  const { user } = useContext(UserContext)!;

  const [name, setName] = useState<string>(user?.name ?? "");
  const [email, setEmail] = useState<string>(user?.email ?? "");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (isEditing && user) {
      setName(user?.name);
      setEmail(user?.email);
    }
  }, [isEditing, user]);

  const handleEditUserData = async () => {
    if ((password && !confirmPassword) || (!password && confirmPassword)) {
      alert("Para alterar a senha, preencha os dois campos de senha.");
      return;
    }

    try {
      await handleEditUser(name, email, password);

      onClose();
      setIsEditing(false);
    } catch (err) {
      console.error("Erro ao editar usuário:", err);
      alert("Erro ao editar usuário. Tente novamente.");
    }
  };

  const handleDeleteUserData = async () => {
    const confirmDelete = window.confirm(
      "Você tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita!"
    );
    if (confirmDelete) {
      try {
        await handleDeleteUser();
        onClose();
      } catch (err) {
        console.error("Erro ao deletar usuário:", err);
        alert("Erro ao deletar usuário. Tente novamente.");
      }
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      onAfterClose={() => setIsEditing(false)}
      className={`ReactModal__Content ${styles.content}`}
      overlayClassName="ReactModal__Overlay"
      closeTimeoutMS={300} // Para animação
    >
      <h2 className={styles.mainTitle}>Meu Perfil</h2>
      {isEditing ? (
        <div className={styles.dataContainer}>
          <div className={styles.inputContainer}>
            <p className={styles.inputTitle}>Nome</p>
            <input
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Digite o seu nome"
            />
          </div>
          <div className={styles.inputContainer}>
            <p className={styles.inputTitle}>Email</p>
            <input
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite o seu email"
            />
          </div>
          <div className={styles.inputContainer}>
            <p className={styles.inputTitle}>Nova Senha</p>
            <input
              type="password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite a sua nova senha"
            />
          </div>
          <div className={styles.inputContainer}>
            <p className={styles.inputTitle}>Confirme a Nova Senha</p>
            <input
              type="password"
              className={styles.input}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Digite a sua nova senha novamente"
            />
          </div>
        </div>
      ) : (
        <div className={styles.dataContainer}>
          <p className={styles.dataText}>Nome: {user?.name}</p>
          <p className={styles.dataText}>Email: {user?.email}</p>
          <p className={styles.dataText}>Senha: *****</p>
        </div>
      )}
      <div className={styles.mainButtonContainer}>
        <div className={styles.buttonsContainer}>
          <Button
            label={isEditing ? "Cancelar" : "Fechar"}
            onClick={() => {
              onClose();
              setIsEditing(false);
            }}
          />
          <Button
            label={isEditing ? "Salvar Dados" : "Editar Dados"}
            onClick={() => (isEditing ? handleEditUserData() : setIsEditing(true))}
          />
        </div>
        <div onClick={handleDeleteUserData}>
          <p className={styles.deleteAccountText}>Deletar minha conta</p>
        </div>
      </div>
    </Modal>
  );
};

export default ModalProfile;
