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
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false); // Стан для модального вікна перегляду фото

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

  const handleDeleteImage = () => {
    setImage(null);
    setPreviewImage(null);
  };

  const handleImageClick = () => {
    if (previewImage) {
      setIsImageViewerOpen(true);
    }
  };

  const handleCloseImageViewer = () => {
    setIsImageViewerOpen(false);
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

          <div className="ds-form-group ds-mb-4">
            <label htmlFor="description" className="ds-form-label">Опис:</label>
            <textarea
              id="description"
              value={description}
              onChange={handleDescriptionChange}
              className="ds-form-textarea"
              placeholder="Короткий опис категорії"
            />
          </div>

          <div className="ds-form-group ds-mb-6">
            <label htmlFor="image" className="ds-form-label">Зображення:</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
            <button
              onClick={() => document.getElementById('image')?.click()}
              className="ds-btn ds-btn-secondary ds-mt-2"
            >
              Вибрати файл
            </button>
           {previewImage && (
              <div className="ds-mt-4 ds-flex ds-items-start ds-gap-4">
                <Image
                  src={previewImage}
                  alt="Попередній перегляд"
                  width={120}
                  height={120}
                  style={{ objectFit: 'cover' }}
                  className="ds-rounded-lg ds-cursor-pointer hover:ds-opacity-80 ds-transition-opacity"
                  onClick={handleImageClick}
                />
                <button
                  onClick={handleDeleteImage}
                  className="ds-btn ds-btn-secondary ds-mt-2"
                >
                  Видалити фото
                </button>
              </div>
            )}
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

      {/* Модальне вікно для перегляду фото */}
      {isImageViewerOpen && previewImage && (
        <div 
          className="ds-fixed ds-inset-0 ds-bg-black ds-bg-opacity-90 ds-flex ds-items-center ds-justify-center ds-z-50"
          onClick={handleCloseImageViewer}
        >
          <div className="ds-relative ds-max-w-4xl ds-max-h-full ds-p-4" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={handleCloseImageViewer}
              className="ds-absolute ds-top-4 ds-right-4 ds-bg-red-500 hover:ds-bg-red-600 ds-text-white ds-rounded-full ds-w-8 ds-h-8 ds-flex ds-items-center ds-justify-center ds-text-lg ds-font-bold ds-transition-colors ds-z-10"
              title="Закрити"
            >
              ×
            </button>
            <Image
              src={previewImage}
              alt="Перегляд фото категорії"
              width={800}
              height={600}
              style={{ objectFit: 'contain', maxWidth: '100%', maxHeight: '100%' }}
              className="ds-rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default CategoryModal;