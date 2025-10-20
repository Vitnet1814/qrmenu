"use client";

import React from 'react';
import { PencilIcon, TrashIcon, ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import styles from './CategoryItem.module.css';

interface CategoryItemProps {
  category: {
    _id: string;
    name: string;
    description?: string;
    image?: string;
    order?: number;
  };
  isActive: boolean;
  onEdit: (category: { _id: string; name: string; order?: number }) => void;
  onDelete: (category: { _id: string; name: string; order?: number }) => void;
  onClick: (categoryId: string) => void;
  onMoveLeft: () => void;
  onMoveRight: () => void;
}

const CategoryItem = ({ category, isActive, onEdit, onDelete, onClick, onMoveLeft, onMoveRight }: CategoryItemProps) => {
  return (
    <div className={`${styles.categoryItem} category-item-dark`}>
      {isActive && (
        <div className={styles.moveControls}>
          <button 
            onClick={onMoveLeft} 
            className={`${styles.controlButton} ${styles.moveButton} category-item-control-dark`}
            title="Перемістити вліво"
          >
            <ArrowLeftIcon className={styles.moveIcon} />
          </button>
          <button 
            onClick={onMoveRight} 
            className={`${styles.controlButton} ${styles.moveButton} category-item-control-dark`}
            title="Перемістити вправо"
          >
            <ArrowRightIcon className={styles.moveIcon} />
          </button>
        </div>
      )}
      
      <div 
        className={`${styles.categoryCard} ${isActive ? styles.active : ''} category-item-card-dark`}
        onClick={() => onClick(category._id)}
      >
        <h3 className={`${styles.categoryName} category-item-name-dark`}>{category.name}</h3>
      </div>
      
      {isActive && (
        <div className={styles.actionControls}>
          <button 
            onClick={() => onEdit(category)} 
            className={`${styles.controlButton} ${styles.editButton} category-item-control-dark`}
            title="Редагувати категорію"
          >
            <PencilIcon className={styles.icon} />
          </button>
          <button 
            onClick={() => onDelete(category)} 
            className={`${styles.controlButton} ${styles.deleteButton} category-item-control-dark`}
            title="Видалити категорію"
          >
            <TrashIcon className={styles.icon} />
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoryItem;