"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export type MenuItemModalMode = 'add' | 'edit';

interface MenuItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (itemData: { categoryId: string; name: string; description: string; price: number; image: File | null; imageChanged: boolean; _id?: string }) => void;
  itemToEdit: { _id?: string; categoryId: string; name: string; description: string; price: number; image?: string } | null;
  restaurantId: string;
  categoryId: string;
  mode: MenuItemModalMode;
}

const MenuItemModal = ({ isOpen, onClose, onSave, itemToEdit, restaurantId, categoryId, mode }: MenuItemModalProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [imageChanged, setImageChanged] = useState(false); // Відстежуємо чи було зображення змінено
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false); // Стан для модального вікна перегляду фото

  useEffect(() => {
    if (itemToEdit) {
      setName(itemToEdit.name || '');
      setDescription(itemToEdit.description || '');
      setPrice(itemToEdit.price ? itemToEdit.price.toString() : '');
      setPreviewImage(itemToEdit.image || null);
      setImageChanged(false); // Скидаємо стан зміни зображення
    } else {
      setName('');
      setDescription('');
      setPrice('');
      setPreviewImage(null);
      setImage(null);
      setImageChanged(false);
    }
  }, [itemToEdit]);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(event.target.value);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      setPreviewImage(URL.createObjectURL(file));
      setImageChanged(true); // Позначаємо що зображення змінено
    }
  };

  const handleDeleteImage = () => {
    setImage(null);
    setPreviewImage(null);
    setImageChanged(true); // Позначаємо що зображення змінено
  };

  const handleImageClick = () => {
    if (previewImage) {
      setIsImageViewerOpen(true);
    }
  };

  const handleCloseImageViewer = () => {
    setIsImageViewerOpen(false);
  };

  const handleSaveClick = () => {
     if (name.trim() && price.trim() && categoryId && restaurantId) {
      onSave({ categoryId, name, description, price: parseFloat(price), image, imageChanged, _id: itemToEdit?._id });
      onClose();
    } else {
      alert('Будь ласка, заповніть назву та ціну.');
    }
  };

  const handleCloseClick = () => {
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="ds-modal-backdrop" onClick={handleCloseClick}>
          <div className="ds-modal-responsive ds-mx-4" onClick={(e) => e.stopPropagation()}>
            
            {/* Скролований контент */}
            <div className="ds-modal-content ds-p-8">
              <h2 className="ds-text-2xl ds-font-bold ds-text-gray-900 ds-mb-6">
                {mode === 'edit' ? 'Редагувати страву' : 'Нова страва'}
              </h2>            
              
              <div className="ds-form-group ds-mb-4">
                <label htmlFor="image" className="ds-form-label">Фото страви:</label>
                <input
                  type="file"
                  id="image"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                  accept="image/*"
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
                      alt="Попередній перегляд страви"
                      width={128}
                      height={128}
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

              <div className="ds-form-group ds-mb-4">
                <label htmlFor="name" className="ds-form-label">Назва страви:</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={handleNameChange}
                  className="ds-form-input"
                  placeholder="Введіть назву страви"
                />
              </div>

              <div className="ds-form-group ds-mb-4">
                <label htmlFor="description" className="ds-form-label">Опис:</label>
                <textarea
                  id="description"
                  value={description}
                  onChange={handleDescriptionChange}
                  className="ds-form-textarea"
                  placeholder="Опишіть страву (необов'язково)"
                />
              </div>

              <div className="ds-form-group ds-mb-6">
                <label htmlFor="price" className="ds-form-label">Ціна:</label>
                <div className="ds-relative">
                  <span className="ds-absolute ds-left-2 ds-top-1/2 ds-transform ds--translate-y-1/2 ds-text-gray-500">₴</span>
                  <input
                    type="number"
                    id="price"
                    value={price}
                    onChange={handlePriceChange}
                    className="ds-form-input ds-pl-8"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>
            </div>

            {/* Sticky кнопки */}
            <div className="ds-modal-footer ds-p-6">
              <div className="ds-flex ds-gap-4 ds-justify-end">
                <button 
                  onClick={handleCloseClick} 
                  className="ds-btn ds-btn-secondary"
                >
                  Скасувати
                </button>
                <button 
                  onClick={handleSaveClick} 
                  className="ds-btn ds-btn-primary"
                >
                  {mode === 'edit' ? 'Оновити страву' : 'Створити страву'}
                </button>
              </div>
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
              alt="Перегляд фото страви"
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

export default MenuItemModal;