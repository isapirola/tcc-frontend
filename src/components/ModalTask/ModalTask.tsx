import Modal from "react-modal";
import styles from "./ModalTask.module.css";
import Button from "../Button";
import { useEffect, useState } from "react";
import { ArrowDownIcon } from "../icons";
import { Task } from "../../interfaces";

Modal.setAppElement("#root");

interface ModalNewTaskProps {
  isOpen: boolean;
  taskToEdit?: Task;
  onClose: () => void;
  categories: { id: string; name: string }[];
  handleAddTask: (
    title: string,
    category: string,
    priority: string,
    notes: string,
    duration: number
  ) => void;
  handleEditTask?: (
    id: string,
    title: string,
    category: string,
    priority: string,
    notes: string,
    duration: number
  ) => void;
}

const ModalNewTask: React.FC<ModalNewTaskProps> = ({
  isOpen,
  taskToEdit,
  onClose,
  categories,
  handleAddTask,
  handleEditTask,
}) => {
  const [title, setTitle] = useState<string>("");
  const [priority, setPriority] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [duration, setDuration] = useState<number>(0);

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setPriority(taskToEdit.priority);
      setCategory(taskToEdit.category);
      setNotes(taskToEdit.notes);
      setDuration(taskToEdit.duration);
    } else {
      // Limpa os campos se não houver tarefa para editar
      setTitle("");
      setPriority("");
      setCategory("");
      setNotes("");
      setDuration(0);
    }
  }, [taskToEdit]);

  const handleConfirm = async () => {
    if (!title || !priority || !category) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    try {
      if (taskToEdit) {
        // Se estiver editando, chama handleEditTask
        await handleEditTask?.(taskToEdit.id, title, category, priority, notes, duration);
      } else {
        // Se estiver adicionando, chama handleAddTask
        await handleAddTask(title, category, priority, notes, duration);
      }

      onClose();
      setTitle("");
      setPriority("");
      setCategory("");
      setNotes("");
    } catch (err) {
      console.error("Erro ao salvar tarefa:", err);
      alert("Erro ao salvar tarefa. Tente novamente.");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="ReactModal__Content"
      overlayClassName="ReactModal__Overlay"
      closeTimeoutMS={300} // Para animação
    >
      <h2 className={styles.mainTitle}>{taskToEdit ? "Editar Tarefa" : "Nova Tarefa"}</h2>
      <div className={styles.inputsContainer}>
        <div className={styles.inputContainer}>
          <p className={styles.inputTitle}>
            Título <span>*</span>
          </p>
          <input
            className={styles.input}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Digite o título da tarefa"
          />
        </div>
        <div className={styles.inputContainer}>
          <p className={styles.inputTitle}>
            Prioridade <span>*</span>
          </p>
          <div className={styles.selectContainer}>
            <select
              className={styles.input}
              value={priority}
              onChange={(e) => setPriority(e.target.value)}>
              <option value="">Selecione a prioridade</option>
              <option value="Alta">Alta</option>
              <option value="Média">Média</option>
              <option value="Baixa">Baixa</option>
            </select>
            <ArrowDownIcon className={styles.selectIcon} />
          </div>
        </div>
        <div className={styles.inputContainer}>
          <p className={styles.inputTitle}>
            Categoria <span>*</span>
          </p>
          <div className={styles.selectContainer}>
            <select
              className={styles.input}
              value={category}
              onChange={(e) => setCategory(e.target.value)}>
              <option value="">Selecione uma categoria</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <ArrowDownIcon className={styles.selectIcon} />
          </div>
        </div>
        <div className={styles.inputContainer}>
          <p className={styles.inputTitle}>Tempo percorrido (em minutos)</p>
          <input
            className={styles.input}
            value={Math.floor(duration / 60)}
            onChange={(e) => setDuration(Number(e.target.value) * 60)}
            placeholder="Digite a duração percorrida da tarefa"
          />
        </div>
        <div className={styles.inputContainer}>
          <p className={styles.inputTitle}>Anotações</p>
          <textarea
            className={styles.input}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Adicione anotações sobre a tarefa"
          />
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <Button label={"Cancelar"} onClick={onClose} />
        <Button
          label={taskToEdit ? "Salvar Alterações" : "Adicionar"}
          onClick={handleConfirm}
        />
      </div>
    </Modal>
  );
};

export default ModalNewTask;
