"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
export type CategoryModalMode = 'add' | 'edit';

interface CategoryModalProps {
  isOpen: boolean;
  onSave: (category: {
    _id: string;
    name: string;
    description?: string;
    image?: string;
    restaurantId?: string;
  }) => void;
  onClose: () => void;
  categoryToEdit: {
    _id: string;
    name: string;
    description?: string; // робимо обов'язковим
    image?: string;
    restaurantId?: string;
  } | null;
  restaurantId: string;
  mode: CategoryModalMode; // Отримуємо режим як пропс
}

const CategoryModal = ({ isOpen, onClose, onSave, categoryToEdit, restaurantId, mode }: CategoryModalProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    if (categoryToEdit) {
      setName(categoryToEdit.name || '');
      setDescription(categoryToEdit.description || '');
      setPreviewImage(categoryToEdit.image || null);
    } else {
      setName('');
      setDescription('');
      setPreviewImage(null);
      setImage(null);
    }
  }, [categoryToEdit]);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
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
        image: image ? await convertToBase64(image) : previewImage,
        ...(mode === 'edit' && categoryToEdit?._id && { _id: categoryToEdit._id }),
        ...(mode === 'add' && { restaurantId }),
        ...(mode === 'edit' && categoryToEdit?.restaurantId && { restaurantId: categoryToEdit.restaurantId }), // Переконайтеся, що це є
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
      alert('Не вдалося зберегти категорію Модал');
    }
  };

const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }
  const handleCloseClick = () => {
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onClick={handleCloseClick}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              width: '80%',
              maxWidth: '500px',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>{categoryToEdit ? 'Редагувати категорію' : 'Додати нову категорію'}</h2>

            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="name" style={{ display: 'block', marginBottom: '5px' }}>Назва:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={handleNameChange}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="description" style={{ display: 'block', marginBottom: '5px' }}>Опис:</label>
              <textarea
                id="description"
                value={description}
                onChange={handleDescriptionChange}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', minHeight: '80px' }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="image" style={{ display: 'block', marginBottom: '5px' }}>Зображення:</label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                style={{ width: '100%', padding: '8px' }}
              />
             {previewImage && (
                <Image
                  src={previewImage}
                  alt="Попередній перегляд"
                  width={100}
                  height={100}
                  style={{ marginTop: '10px', objectFit: 'contain' }}
                />
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
              <button onClick={handleCloseClick} style={{ marginRight: '10px', padding: '8px 15px', borderRadius: '4px', border: '1px solid #ccc', cursor: 'pointer' }}>
                Скасувати
              </button>
              <button onClick={handleSaveClick} style={{ padding: '8px 15px', borderRadius: '4px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>
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