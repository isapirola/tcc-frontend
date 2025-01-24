import React, { useEffect, useRef, useState } from "react";
import styles from "./Home.module.css";
import {
  Button,
  CategoryInput,
  Header,
  ModalProfile,
  ModalTask,
  TaskFilters,
  TaskList,
  Timer,
} from "../../components";
import { useAuth, useTasks } from "../../hooks";
import { Link } from "react-router-dom";
import { Filters, Task } from "../../interfaces";
import { deleteUser, editUserData } from "../../api/authService";

const Home: React.FC = () => {
  const { isLogged, handleLogout, handleUserDataContext } = useAuth();
  const {
    loadingTaskList,
    tasks,
    categories,
    groupedTasks,
    filters,
    setFilters,
    handleAddTask,
    handleUpdateTask,
    handleDeleteTask,
    handleAddCategory,
    handleUpdateCategory,
    handleDeleteCategory,
  } = useTasks();

  const [isAddCategory, setIsAddCategory] = useState(false);
  const [isTaskModalOpen, setTaskModalOpen] = useState(false);
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState("");
  const [taskToEdit, setTaskToEdit] = useState<Task | undefined>();

  const categoryInputRef = useRef<HTMLInputElement>(null);

  const selectedTask = tasks.find((task) => task.id === selectedTaskId);
  const selectedTaskCategory = categories.find(
    (category) => category.id === selectedTask?.category
  );

  const openTaskModal = () => setTaskModalOpen(true);
  const closeTaskModal = () => setTaskModalOpen(false);
  const openProfileModal = () => setProfileModalOpen(true);
  const closeProfileModal = () => setProfileModalOpen(false);

  const handleToggleTaskCompletion = (taskId: string, finished: boolean) => {
    const updatedTask = { finished: !finished };
    handleUpdateTask(taskId, updatedTask);
  };

  const handleTaskSelection = (taskId: string) => {
    if (selectedTaskId === taskId) {
      setSelectedTaskId("");
    } else {
      setSelectedTaskId(taskId);
    }
  };

  const handleClickEditTask = (task: Task) => {
    setTaskToEdit(task);
    openTaskModal();
  };

  const handleEditTask = (
    id: string,
    title: string,
    category: string,
    priority: string,
    notes: string,
    duration: number
  ) => {
    const updatedTask = {
      title,
      category,
      priority,
      notes,
      duration,
    };
    handleUpdateTask(id, updatedTask);
    setTaskToEdit(undefined);
  };

  const handleEditUser = async (name?: string, email?: string, password?: string) => {
    const response = await editUserData(name, email, password);
    handleUserDataContext(response);
  };

  const handleDeleteUser = async () => {
    await deleteUser();
    handleLogout();
  };

  const handleTimerStop = (seconds: number) => {
    if (seconds < 0) return;
    if (selectedTaskId) {
      tasks.map((task) => {
        if (task.id === selectedTaskId) {
          const updatedDuration = task.duration + seconds;
          if (updatedDuration < 0) return;
          const updatedTask = { duration: updatedDuration };
          handleUpdateTask(selectedTaskId, updatedTask);
        }
      });
    }
  };

  const handleClickCategory = () => setIsAddCategory(!isAddCategory);
  const handleClickFilter = () => setIsFiltering(!isFiltering);

  const handleFilterChange = (key: keyof Filters, value: any) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  useEffect(() => {
    if (isAddCategory && categoryInputRef.current) {
      categoryInputRef.current.focus();
    }
  }, [isAddCategory]);

  return (
    <div className={styles.mainContainer}>
      <Header
        isLogged={isLogged}
        handleLogout={() => {
          setSelectedTaskId("");
          handleLogout();
          window.location.reload();
        }}
        handleProfile={openProfileModal}
      />
      <div className={styles.contentContainer}>
        <div className={styles.tasksContainer}>
          <div className={styles.tasksButtons}>
            <Button
              title={
                isLogged && categories.length === 0
                  ? "Crie uma categoria primeiro"
                  : "Criar nova tarefa"
              }
              isDisabled={!isLogged || categories.length === 0}
              label={"+ Nova Tarefa"}
              onClick={() => {
                setTaskToEdit(undefined);
                openTaskModal();
              }}
            />
            <Button
              title="Criar nova categoria"
              isDisabled={!isLogged}
              label={isAddCategory ? "Cancelar" : "+ Nova Categoria"}
              onClick={handleClickCategory}
            />
          </div>

          {isAddCategory && (
            <CategoryInput
              inputRef={categoryInputRef}
              onAddCategory={(category: string) => {
                handleAddCategory(category);
                handleClickCategory();
              }}
            />
          )}

          {isLogged ? (
            categories.length > 0 ? (
              <TaskList
                loading={loadingTaskList}
                groupedTasks={groupedTasks}
                onToggleTaskCompletion={handleToggleTaskCompletion}
                selectedTaskId={selectedTaskId}
                handleSelectedTask={handleTaskSelection}
                handleEditTask={handleClickEditTask}
                handleDeleteTask={handleDeleteTask}
                handleEditCategory={handleUpdateCategory}
                handleDeleteCategory={handleDeleteCategory}
              />
            ) : (
              <h2
                className={styles.noCategoriesText}
                onClick={() => {
                  if (!isAddCategory) {
                    handleClickCategory();
                  }
                }}>
                Crie uma nova categoria antes de adicionar tarefas
              </h2>
            )
          ) : (
            <h2 className={styles.notLoggedText}>
              Faça <Link to={"/login"}>login</Link> para adicionar e gerenciar suas tarefas
            </h2>
          )}

          <div className={styles.tasksFooter}>
            {isFiltering && (
              <TaskFilters filters={filters} onFilterChange={handleFilterChange} />
            )}
            <span className={styles.horizontalSeparator} />
            <Button
              title="Filtros"
              isDisabled={!isLogged || categories.length === 0}
              label={isFiltering ? "Fechar filtragem" : "Filtrar tarefas"}
              onClick={handleClickFilter}
            />
          </div>
        </div>

        <div className={styles.timersContainer}>
          <div className={styles.timer}>
            <Timer handleTimerStop={handleTimerStop} />
          </div>

          {isLogged && (
            <div className={styles.taskSelectedContainer}>
              <div className={styles.taskSelectedHeader}>
                <h3>Tarefa selecionada {selectedTask?.finished && "(Concluída)"}</h3>
                {selectedTask && (
                  <div
                    onClick={() => {
                      handleToggleTaskCompletion(selectedTask.id, selectedTask.finished);
                    }}
                    className={styles.taskSelectedFinishButton}>
                    <h4 className={styles.taskSelectedFinishText}>
                      {selectedTask.finished ? "Reabrir tarefa" : "Concluir Tarefa"}
                    </h4>
                  </div>
                )}
              </div>
              <div className={`${styles.taskSelectedContent} ${selectedTask && styles.grid}`}>
                {selectedTask && selectedTaskCategory ? (
                  <>
                    <div className={styles.taskInfo}>
                      <p>Nome: {selectedTask.title}</p>
                      <p>Prioridade: {selectedTask.priority}</p>
                      <p>Categoria: {selectedTaskCategory.name}</p>
                    </div>
                    <span className={styles.verticalSeparator} />
                    <div className={styles.taskNotes}>
                      <p>Anotações:</p>
                      <p className={styles.taskNotesText}>
                        {selectedTask.notes === "" ? "Sem anotações" : selectedTask.notes}
                      </p>
                    </div>
                  </>
                ) : (
                  <p className={styles.noTaskSelected}>
                    Nenhuma tarefa selecionada.
                    <br />
                    Selecione uma na lista de tarefas para registrar o tempo.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <ModalTask
        isOpen={isTaskModalOpen}
        taskToEdit={taskToEdit}
        onClose={closeTaskModal}
        categories={categories}
        handleAddTask={handleAddTask}
        handleEditTask={handleEditTask}
      />
      <ModalProfile
        isOpen={isProfileModalOpen}
        onClose={closeProfileModal}
        handleEditUser={handleEditUser}
        handleDeleteUser={handleDeleteUser}
      />
    </div>
  );
};

export default Home;
