"use client";

import React from 'react';
import { PencilIcon, TrashIcon, ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline';
import styles from './MenuItem.module.css';

interface MenuItemProps {
  item: { _id: string; name: string; price: number; image?: string };
  onEdit: (item: { _id: string; name: string; price: number; image?: string }) => void;
  onDelete: (item: { _id: string; name: string }) => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}

const MenuItem = ({ item, onEdit, onDelete, onMoveUp, onMoveDown }: MenuItemProps) => {
  return (
    <div className={`${styles.menuItem} menu-item-dark`}>
      <div className={styles.content}>
        {item.image && (
          <div className={styles.imageContainer}>
            <img 
              src={item.image} 
              alt={item.name} 
              className={styles.image}
            />
          </div>
        )}
        <div className={styles.details}>
          <h3 className={`${styles.name} menu-item-name-dark`}>{item.name}</h3>
          <div className={`${styles.price} menu-item-price-dark`}>{item.price}</div>
        </div>
        <div className={styles.controls}>
          <button 
            onClick={onMoveUp} 
            className={`${styles.controlButton} ${styles.moveUpButton} menu-item-control-dark`}
            title="Перемістити вгору"
          >
            <ArrowUpIcon className={styles.icon} />
          </button>
          <button 
            onClick={onMoveDown} 
            className={`${styles.controlButton} ${styles.moveDownButton} menu-item-control-dark`}
            title="Перемістити вниз"
          >
            <ArrowDownIcon className={styles.icon} />
          </button>
          <button 
            onClick={() => onEdit(item)} 
            className={`${styles.controlButton} ${styles.editButton} menu-item-control-dark`}
            title="Редагувати страву"
          >
            <PencilIcon className={styles.icon} />
          </button>
          <button 
            onClick={() => onDelete({ _id: item._id, name: item.name })} 
            className={`${styles.controlButton} ${styles.deleteButton} menu-item-control-dark`}
            title="Видалити страву"
          >
            <TrashIcon className={styles.icon} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;