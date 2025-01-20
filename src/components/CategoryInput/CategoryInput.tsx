import React, { useState } from "react";
import styles from "./CategoryInput.module.css";
import { AddIcon } from "../icons";

interface CategoryInputProps {
  onAddCategory: (category: string) => void;
}

const CategoryInput: React.FC<CategoryInputProps> = ({ onAddCategory }) => {
  const [newCategory, setNewCategory] = useState("");

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      onAddCategory(newCategory);
      setNewCategory(""); // Limpar o campo após adicionar
    }
  };
  return (
    <div className={styles.container}>
      <input
        type="text"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
        placeholder="Digite sua nova categoria"
        className={styles.categoryInput}
      />
      <button onClick={handleAddCategory} className={styles.addCategoryButton}>
        <AddIcon color="var(--a6)" height={24} width={24} />
      </button>
    </div>
  );
};

export default CategoryInput;
