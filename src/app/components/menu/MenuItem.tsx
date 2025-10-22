"use client";

import React from 'react';
import { PencilIcon, TrashIcon, ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline';

interface MenuItemProps {
  item: { _id: string; name: string; price: number; image?: string };
  onEdit: (item: { _id: string; name: string; price: number; image?: string }) => void;
  onDelete: (item: { _id: string; name: string }) => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}

const MenuItem = ({ item, onEdit, onDelete, onMoveUp, onMoveDown }: MenuItemProps) => {
  return (
    <div className="ds-menu-item-card">
      <div className="ds-menu-item-content">
        {item.image && (
          <div className="ds-menu-item-image">
            <img 
              src={item.image} 
              alt={item.name} 
              className="ds-menu-item-img"
            />
          </div>
        )}
        <div className="ds-menu-item-details">
          <h3 className="ds-menu-item-name">{item.name}</h3>
          <div className="ds-menu-item-price">{item.price}</div>
        </div>
        <div className="ds-menu-item-controls">
          <button 
            onClick={onMoveUp} 
            className="ds-control-btn ds-control-btn-move"
            title="Перемістити вгору"
          >
            <ArrowUpIcon className="ds-control-icon" />
          </button>
          <button 
            onClick={onMoveDown} 
            className="ds-control-btn ds-control-btn-move"
            title="Перемістити вниз"
          >
            <ArrowDownIcon className="ds-control-icon" />
          </button>
          <button 
            onClick={() => onEdit(item)} 
            className="ds-control-btn ds-control-btn-edit"
            title="Редагувати страву"
          >
            <PencilIcon className="ds-control-icon" />
          </button>
          <button 
            onClick={() => onDelete({ _id: item._id, name: item.name })} 
            className="ds-control-btn ds-control-btn-delete"
            title="Видалити страву"
          >
            <TrashIcon className="ds-control-icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;