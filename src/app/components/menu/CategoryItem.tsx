"use client";

import React from 'react';
import { PencilIcon, TrashIcon, ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

interface CategoryItemProps {
  category: {
    _id: string;
    name: string;
    description?: string;
    order?: number;
  };
  isActive: boolean;
  isFirst: boolean;
  isLast: boolean;
  onEdit: (category: { _id: string; name: string; order?: number }) => void;
  onDelete: (category: { _id: string; name: string; order?: number }) => void;
  onClick: (categoryId: string) => void;
  onMoveLeft: () => void;
  onMoveRight: () => void;
}

const CategoryItem = ({ category, isActive, isFirst, isLast, onEdit, onDelete, onClick, onMoveLeft, onMoveRight }: CategoryItemProps) => {
  return (
    <div
     className="ds-category-item ds-mb-8"
     >
      {/* {isActive && (
        <div className="ds-category-move-controls">
          <button 
            onClick={onMoveLeft} 
            className="ds-control-btn ds-control-btn-move"
            title="Перемістити вліво"
          >
            <ArrowLeftIcon className="ds-control-icon-sm" />
          </button>
          <button 
            onClick={onMoveRight} 
            className="ds-control-btn ds-control-btn-move"
            title="Перемістити вправо"
          >
            <ArrowRightIcon className="ds-control-icon-sm" />
          </button>
        </div>
      )} */}
      
      <div 
        className={`ds-category-card ${isActive ? 'active' : ''}`}
        onClick={() => onClick(category._id)}
      >
        <h3 className="ds-category-name">{category.name}</h3>
      </div>
      
      {isActive && (
        <div className="ds-category-action-controls">
          {!isFirst && (
            <button 
              onClick={onMoveLeft} 
              className="ds-control-btn ds-control-btn-move"
              title="Перемістити вліво"
            >
              <ArrowLeftIcon className="ds-control-icon-sm" />
            </button>
          )}
          <button 
            onClick={() => onEdit(category)} 
            className="ds-control-btn ds-control-btn-edit"
            title="Редагувати категорію"
          >
            <PencilIcon className="ds-control-icon" />
          </button>
          <button 
            onClick={() => onDelete(category)} 
            className="ds-control-btn ds-control-btn-delete"
            title="Видалити категорію"
          >
            <TrashIcon className="ds-control-icon" />
          </button>
          {!isLast && (
            <button 
              onClick={onMoveRight} 
              className="ds-control-btn ds-control-btn-move"
              title="Перемістити вправо"
            >
              <ArrowRightIcon className="ds-control-icon-sm" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default CategoryItem;