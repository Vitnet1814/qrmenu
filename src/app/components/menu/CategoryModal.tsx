"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './CategoryModal.module.css';
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

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Перевіряємо тип файлу
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        alert('Дозволені тільки зображення: JPEG, PNG, WebP');
        return;
      }

      // Перевіряємо розмір файлу (максимум 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        alert('Розмір файлу не повинен перевищувати 5MB');
        return;
      }

      setImage(file);
      
      // Створюємо попередній перегляд
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveClick = async () => {
    if (!name.trim()) {
      alert('Будь ласка, введіть назву категорії.');
      return;
    }
  
    try {
      let optimizedImage = previewImage;
      
      if (image) {
        // Перевіряємо розмір файлу (максимум 5MB)
        if (image.size > 5 * 1024 * 1024) {
          alert('Зображення занадто велике. Будь ласка, виберіть файл менше 5MB.');
          return;
        }
        optimizedImage = await convertToBase64(image);
      }
      
      const categoryData = {
        name,
        description,
        image: optimizedImage,
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
      
      // Логуємо інформацію про оптимізацію зображення
      if (savedCategory.image && savedCategory.image.startsWith('data:image/webp')) {
        // Зображення оптимізовано: WebP формат
      }
      
      onSave(savedCategory); // Викликаємо переданий пропс
      onClose();
    } catch (error) {
      console.error('Помилка:', error);
      
      // Більш інформативні повідомлення про помилки
      if (error instanceof Error) {
        if (error.message.includes('SSL') || error.message.includes('TLS')) {
          alert('Помилка з\'єднання з сервером. Спробуйте зменшити розмір зображення або спробуйте пізніше.');
        } else if (error.message.includes('413')) {
          alert('Зображення занадто велике для завантаження. Будь ласка, виберіть менше зображення.');
        } else {
          alert(`Не вдалося зберегти категорію: ${error.message}`);
        }
      } else {
        alert('Не вдалося зберегти категорію. Спробуйте ще раз.');
      }
    }
  };

const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new window.Image();
    
    img.onload = () => {
      // Максимальні розміри для оптимізації
      const maxWidth = 400;
      const maxHeight = 400;
      
      let { width, height } = img;
      
      // Розрахунок нових розмірів з збереженням пропорцій
      if (width > height) {
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }
      }
      
      canvas.width = width;
      canvas.height = height;
      
      // Малюємо зображення з новими розмірами
      ctx?.drawImage(img, 0, 0, width, height);
      
      // Конвертуємо в base64 з якістю 0.8 (80%)
      const optimizedBase64 = canvas.toDataURL('image/jpeg', 0.8);
      resolve(optimizedBase64);
    };
    
    img.onerror = (error: Event | string) => reject(error);
    img.src = URL.createObjectURL(file);
  });
};
  const handleCloseClick = () => {
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className={styles.backdrop} onClick={handleCloseClick}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2 className={styles.title}>{categoryToEdit ? 'Редагувати категорію' : 'Додати нову категорію'}</h2>

            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>Назва:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={handleNameChange}
                className={styles.input}
                placeholder="Введіть назву категорії"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="description" className={styles.label}>Опис:</label>
              <textarea
                id="description"
                value={description}
                onChange={handleDescriptionChange}
                className={`${styles.input} ${styles.textarea}`}
                placeholder="Короткий опис категорії"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="image" className={styles.label}>Зображення:</label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                className={styles.fileInput}
              />
             {previewImage && (
                <div className={styles.preview}>
                  <Image
                    src={previewImage}
                    alt="Попередній перегляд"
                    width={120}
                    height={120}
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              )}
            </div>

            <div className={styles.actions}>
              <button onClick={handleCloseClick} className={`${styles.button} ${styles.cancelButton}`}>
                Скасувати
              </button>
              <button onClick={handleSaveClick} className={`${styles.button} ${styles.saveButton}`}>
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