import Modal from "react-modal";
import styles from "./ModalProfile.module.css";

Modal.setAppElement("#root");

interface ModalProfileProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalProfile: React.FC<ModalProfileProps> = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="ReactModal__Content"
      overlayClassName="ReactModal__Overlay"
      closeTimeoutMS={300} // Para animação
    >
      <h1>profile</h1>
    </Modal>
  );
};

export default ModalProfile;
