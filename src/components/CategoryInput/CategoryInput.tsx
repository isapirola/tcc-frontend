import React, { useState } from "react";
import styles from "./CategoryInput.module.css";
import { AddIcon } from "../icons";

interface CategoryInputProps {
  onAddCategory: (category: string) => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

const CategoryInput: React.FC<CategoryInputProps> = ({ onAddCategory, inputRef }) => {
  const [newCategory, setNewCategory] = useState("");

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      onAddCategory(newCategory);
      setNewCategory(""); // Limpar o campo após adicionar
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddCategory();
    }
  };

  return (
    <div className={styles.container}>
      <input
        ref={inputRef}
        type="text"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
        onKeyDown={handleKeyDown}
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
