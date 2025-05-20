"use client";

import React from 'react';
import { PencilIcon, TrashIcon, ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

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
    <div 
    style={{
       display: 'inline-flex', 
       flexDirection: 'column',
    //    width: '85px'
      //   alignItems: 'center',
      //    position: 'relative'
          }}>
             {isActive && (
        <div style={{ display: 'inline-flex', alignItems: 'center' }}>
          <button onClick={onMoveLeft} style={{ marginRight: '5px', cursor: 'pointer' }}>
            <ArrowLeftIcon style={{ width: '20px', height: '20px' }} />
          </button>
          <button onClick={onMoveRight} style={{ marginRight: '10px', cursor: 'pointer' }}>
            <ArrowRightIcon style={{ width: '20px', height: '20px' }} />
          </button>
         
        </div>
      )}
      <button
        style={{
          padding: '10px 15px',
          border: '1px solid #ccc',
          borderRadius: '5px',
          backgroundColor: isActive ? '#f0f0f0' : 'white',
          cursor: 'pointer',
          marginBottom: '5px', // Додаємо відступ між кнопкою назви та кнопками дій
        }}
        onClick={() => onClick(category._id)}
      >
        {category.name}
      </button>
      {isActive && (
        <div style={{ display: 'inline-flex', alignItems: 'center' }}>
          
          <button onClick={() => onEdit(category)} style={{ marginRight: '5px', cursor: 'pointer' }}>
            <PencilIcon style={{ width: '20px', height: '20px' }} />
          </button>
          <button onClick={() => onDelete(category)} style={{ cursor: 'pointer' }}>
            <TrashIcon style={{ width: '20px', height: '20px' }} />
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoryItem;