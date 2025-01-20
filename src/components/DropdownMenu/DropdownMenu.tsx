import React, { useState, useRef, useEffect } from "react";
import styles from "./DropdownMenu.module.css";
import { EditIcon, MoreIcon, TrashIcon } from "../icons";

interface DropdownMenuProps {
  category?: boolean;
  onSelectEdit: () => void;
  onSelectDelete: () => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  onSelectEdit,
  onSelectDelete,
  category,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleEditClick = () => {
    onSelectEdit();
    setIsOpen(false);
  };
  const handleDeleteClick = () => {
    onSelectDelete();
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdown} ref={menuRef}>
      <button className={styles.dropdownButton} onClick={toggleMenu}>
        <MoreIcon height={18} width={18} />
      </button>
      {isOpen && (
        <ul className={styles.dropdownMenu}>
          <li className={styles.dropdownItem} onClick={() => handleEditClick()}>
            <EditIcon color="var(--a7)" width={18} height={18} />
            <p className={styles.dropdownItemText}>{category ? "Renomear" : "Editar"}</p>
          </li>
          <li className={styles.dropdownItem} onClick={() => handleDeleteClick()}>
            <TrashIcon color="var(--a7)" width={18} height={18} />
            <p className={styles.dropdownItemText}>Excluir</p>
          </li>
        </ul>
      )}
    </div>
  );
};

export default DropdownMenu;
