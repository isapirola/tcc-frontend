import React, { useEffect, useRef, useState } from "react";
import styles from "./TaskList.module.css";
import { ArrowDownIcon, CheckIcon } from "../icons";
import { formatDuration } from "../../utils";
import DropdownMenu from "../DropdownMenu";
import Button from "../Button";
import { GroupedTasks, Task } from "../../interfaces";

interface TaskListProps {
  groupedTasks: GroupedTasks[];
  selectedTaskId: string;
  handleSelectedTask: (taskId: string) => void;
  handleEditTask: (task: Task) => void;
  handleDeleteTask: (taskId: string) => void;
  handleEditCategory: (categoryId: string, categoryName: string) => void;
  handleDeleteCategory: (categoryId: string) => void;
  onToggleTaskCompletion: (taskId: string, finished: boolean) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  groupedTasks,
  selectedTaskId,
  handleSelectedTask,
  handleEditTask,
  handleDeleteTask,
  handleDeleteCategory,
  handleEditCategory,
  onToggleTaskCompletion,
}) => {
  const [openCategories, setOpenCategories] = useState<boolean[]>([]);
  const [categoryToRename, setCategoryToRename] = useState<string | undefined>();
  const [categoryNameInput, setCategoryNameInput] = useState<string>("");

  const categoryInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Atualiza o estado quando groupedTasks mudar
    setOpenCategories(groupedTasks.map(() => true));
  }, [groupedTasks]);

  const toggleCategory = (index: number) => {
    setOpenCategories((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const handleClickEditCategory = (categoryId: string, categoryName: string) => {
    setCategoryToRename(categoryId);
    setCategoryNameInput(categoryName);
  };

  useEffect(() => {
    if (categoryToRename && categoryInputRef.current) {
      categoryInputRef.current.focus();
    }
  }, [categoryToRename]);

  return (
    <div className={styles.mainContainer}>
      {groupedTasks.map((category, index) => (
        <div key={category.id} className={styles.category}>
          {categoryToRename === category.id ? (
            <div className={styles.categoryRenameContainer}>
              <input
                ref={categoryInputRef}
                className={styles.categoryRenameInput}
                type="text"
                value={categoryNameInput}
                onChange={(e) => setCategoryNameInput(e.target.value)}
              />
              <div className={styles.categoryRenameButtons}>
                <Button
                  styleType="category"
                  label="Cancelar"
                  onClick={() => setCategoryToRename(undefined)}
                />
                <Button
                  styleType="category"
                  label="Salvar"
                  onClick={() => {
                    handleEditCategory(category.id, categoryNameInput);
                    setCategoryToRename(undefined);
                    setCategoryNameInput("");
                  }}
                />
              </div>
            </div>
          ) : (
            <div className={styles.categoryHeader}>
              <div className={styles.categoryTitle} onClick={() => toggleCategory(index)}>
                <ArrowDownIcon
                  height={32}
                  width={32}
                  color="var(--a7)"
                  style={{
                    transform: openCategories[index] ? "rotate(0deg)" : "rotate(-90deg)",
                    transition: "transform 0.2s ease",
                  }}
                />
                <h2 className={styles.categoryText}>{category.name}</h2>
              </div>
              <div className={styles.categoryHeaderRight}>
                <h2 className={styles.categoryTime}>{formatDuration(category.duration)}</h2>
                <DropdownMenu
                  category
                  onSelectEdit={() => handleClickEditCategory(category.id, category.name)}
                  onSelectDelete={() => handleDeleteCategory(category.id)}
                />
              </div>
            </div>
          )}
          <div className={`${styles.tasks} ${openCategories[index] ? styles.visible : ""}`}>
            {category.tasks.length > 0 ? (
              category.tasks.map((task) => (
                <div
                  key={task.id}
                  className={`${styles.taskItem} ${
                    task.id === selectedTaskId && styles.taskSelected
                  }`}>
                  <div className={styles.taskTitle}>
                    <div
                      className={`${styles.taskCheckbox} ${
                        task.finished ? styles.checked : styles.nonChecked
                      }`}
                      onClick={() => onToggleTaskCompletion(task.id, task.finished)}>
                      {task.finished && <CheckIcon height={16} width={16} color="var(--a6)" />}
                    </div>
                    <div
                      className={styles.taskName}
                      onClick={() => handleSelectedTask(task.id)}>
                      <h3
                        className={`${styles.taskNameText} ${
                          task.finished && styles.taskNameTextCompleted
                        }`}>
                        {task.title}{" "}
                      </h3>
                    </div>
                  </div>
                  <div className={styles.taskItemRight}>
                    <p className={styles.taskDuration}>{formatDuration(task.duration)}</p>
                    <DropdownMenu
                      onSelectEdit={() => handleEditTask(task)}
                      onSelectDelete={() => handleDeleteTask(task.id)}
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className={styles.categoryEmpty}>Não há tarefas nesta categoria.</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
