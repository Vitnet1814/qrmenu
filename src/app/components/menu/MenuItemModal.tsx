"use client";

import React, { useState, useEffect } from 'react';
import styles from './MenuItemModal.module.css';

interface MenuItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (itemData: { categoryId: string; name: string; description: string; price: number; image: File | null; imageChanged: boolean; _id?: string }) => void;
  itemToEdit: { _id?: string; categoryId: string; name: string; description: string; price: number; image?: string } | null;
  restaurantId: string;
  categoryId: string;
}

const MenuItemModal = ({ isOpen, onClose, onSave, itemToEdit, restaurantId, categoryId }: MenuItemModalProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [imageChanged, setImageChanged] = useState(false); // Відстежуємо чи було зображення змінено

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
        <div className={styles.backdrop} onClick={handleCloseClick}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalContent}>
              <h2 className={styles.title}>
                {itemToEdit ? 'Редагувати страву' : 'Нова страва'}
              </h2>
              
              <div className={styles.formGroup}>
                <label htmlFor="image" className={styles.label}>Фото страви:</label>
                <input
                  type="file"
                  id="image"
                  onChange={handleImageChange}
                  className={styles.fileInput}
                  accept="image/*"
                />
                {previewImage && (
                  <div className={styles.imagePreview}>
                    <img 
                      src={previewImage} 
                      alt="Preview" 
                      className={styles.previewImage}
                    />
                  </div>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.label}>Назва страви:</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={handleNameChange}
                  className={styles.input}
                  placeholder="Введіть назву страви"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="description" className={styles.label}>Опис:</label>
                <textarea
                  id="description"
                  value={description}
                  onChange={handleDescriptionChange}
                  className={styles.textarea}
                  placeholder="Опишіть страву (необов'язково)"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="price" className={styles.label}>Ціна:</label>
                <div className={styles.priceInput}>
                  <span className={styles.priceSymbol}>₴</span>
                  <input
                    type="number"
                    id="price"
                    value={price}
                    onChange={handlePriceChange}
                    className={styles.input}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>

              <div className={styles.buttonGroup}>
                <button 
                  onClick={handleCloseClick} 
                  className={`${styles.button} ${styles.cancelButton}`}
                >
                  Скасувати
                </button>
                <button 
                  onClick={handleSaveClick} 
                  className={`${styles.button} ${styles.saveButton}`}
                >
                  {itemToEdit ? 'Оновити страву' : 'Створити страву'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MenuItemModal;