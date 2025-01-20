import React from "react";
import styles from "./TaskFilters.module.css";
import { Filters } from "../../interfaces";

interface TaskFiltersProps {
  filters: Filters;
  onFilterChange: (key: keyof Filters, value: any) => void;
}

const TaskFilters: React.FC<TaskFiltersProps> = ({ filters, onFilterChange }) => {
  return (
    <div className={styles.container}>
      <div className={styles.category}>
        <h2>Status</h2>
        <div className={styles.itemContainer}>
          <div className={styles.item}>
            <input
              type="checkbox"
              checked={filters.showCompleted}
              onChange={(e) => onFilterChange("showCompleted", e.target.checked)}
            />
            <p>Finalizadas</p>
          </div>
          <div className={styles.item}>
            <input
              type="checkbox"
              checked={filters.showPending}
              onChange={(e) => onFilterChange("showPending", e.target.checked)}
            />
            <p>Pendentes</p>
          </div>
        </div>
      </div>
      <div className={styles.category}>
        <h2>Prioridade</h2>
        <div className={styles.itemContainer}>
          <div className={styles.item}>
            <input
              type="checkbox"
              checked={filters.showLowPriority}
              onChange={(e) => onFilterChange("showLowPriority", e.target.checked)}
            />
            <p>Baixa</p>
          </div>
          <div className={styles.item}>
            <input
              type="checkbox"
              checked={filters.showMediumPriority}
              onChange={(e) => onFilterChange("showMediumPriority", e.target.checked)}
            />
            <p>Média</p>
          </div>
          <div className={styles.item}>
            <input
              type="checkbox"
              checked={filters.showHighPriority}
              onChange={(e) => onFilterChange("showHighPriority", e.target.checked)}
            />
            <p>Alta</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskFilters;
