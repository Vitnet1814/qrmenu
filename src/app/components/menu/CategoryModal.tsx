"use client";

import React, { useState, useEffect } from 'react';
export type CategoryModalMode = 'add' | 'edit';

interface CategoryModalProps {
  isOpen: boolean;
  onSave: (category: {
    _id: string;
    name: string;
    description?: string;
    restaurantId?: string;
  }) => void;
  onClose: () => void;
  categoryToEdit: {
    _id: string;
    name: string;
    description?: string;
    restaurantId?: string;
  } | null;
  restaurantId: string;
  mode: CategoryModalMode; // Отримуємо режим як пропс
}

const CategoryModal = ({ isOpen, onClose, onSave, categoryToEdit, restaurantId, mode }: CategoryModalProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (categoryToEdit) {
      setName(categoryToEdit.name || '');
      setDescription(categoryToEdit.description || '');
    } else {
      setName('');
      setDescription('');
    }
  }, [categoryToEdit]);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const handleSaveClick = async () => {
    if (!name.trim()) {
      alert('Будь ласка, введіть назву категорії.');
      return;
    }
  
    try {
      const categoryData = {
        name,
        description,
        restaurantId, // Завжди передаємо restaurantId з пропсів
        ...(mode === 'edit' && categoryToEdit?._id && { _id: categoryToEdit._id }),
      };

  
      const response = await fetch(
        mode === 'edit' 
          ? `/api/categories/${categoryToEdit?._id}/put` 
          : '/api/categories/post',
        {
          method: mode === 'edit' ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(categoryData),
        }
      );
  
      if (!response.ok) throw new Error('Помилка при збереженні');
  
      const savedCategory = await response.json();
      
      onSave(savedCategory); // Викликаємо переданий пропс
      onClose();
    } catch (error) {
      console.error('Помилка:', error);
      
      // Більш інформативні повідомлення про помилки
      if (error instanceof Error) {
        alert(`Не вдалося зберегти категорію: ${error.message}`);
      } else {
        alert('Не вдалося зберегти категорію. Спробуйте ще раз.');
      }
    }
  };

  const handleCloseClick = () => {
    onClose();
  };

  return (
    <>
      {isOpen && (
      <div className="modal-backdrop ds-fixed ds-inset-0 ds-bg-black ds-bg-opacity-50 ds-flex ds-items-center ds-justify-center ds-z-modal" onClick={handleCloseClick}>
        <div className="ds-card ds-p-8 ds-max-w-lg ds-w-full ds-mx-4" onClick={(e) => e.stopPropagation()}>
          <h2 className="ds-text-2xl ds-font-bold ds-text-gray-900 ds-mb-6">{categoryToEdit ? 'Редагувати категорію' : 'Додати нову категорію'}</h2>

          <div className="ds-form-group ds-mb-4">
            <label htmlFor="name" className="ds-form-label">Назва:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
              className="ds-form-input"
              placeholder="Введіть назву категорії"
            />
          </div>

          <div className="ds-form-group ds-mb-6">
            <label htmlFor="description" className="ds-form-label">Опис:</label>
            <textarea
              id="description"
              value={description}
              onChange={handleDescriptionChange}
              className="ds-form-textarea"
              placeholder="Короткий опис категорії"
            />
          </div>

          <div className="ds-flex ds-gap-4 ds-justify-end">
            <button onClick={handleCloseClick} className="ds-btn ds-btn-secondary">
              Скасувати
            </button>
            <button onClick={handleSaveClick} className="ds-btn ds-btn-primary">
              Зберегти
            </button>
          </div>
        </div>
      </div>
      )}
    </>
  );
};

export default CategoryModal;