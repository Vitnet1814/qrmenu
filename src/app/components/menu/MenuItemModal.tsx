"use client";

import React, { useState, useEffect } from 'react';

interface MenuItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (itemData: { categoryId: string; name: string; description: string; price: number; image: File | null; _id?: string }) => void;
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

  useEffect(() => {
    if (itemToEdit) {
      setName(itemToEdit.name || '');
      setDescription(itemToEdit.description || '');
      setPrice(itemToEdit.price ? itemToEdit.price.toString() : '');
      setPreviewImage(itemToEdit.image || null);
    } else {
      setName('');
      setDescription('');
      setPrice('');
      setPreviewImage(null);
      setImage(null);
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
    }
  };

  const handleSaveClick = () => {
     if (name.trim() && price.trim() && categoryId && restaurantId) {
      onSave({ categoryId, name, description, price: parseFloat(price), image, _id: itemToEdit?._id });
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
            zIndex: 1000,
          }}
          onClick={handleCloseClick}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              width: '400px',
              maxWidth: '90%',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>{itemToEdit ? 'Редагувати страву' : 'Нова страва'}</h2>
            <div>
              <label htmlFor="image">Фото страви:</label>
              <input
                type="file"
                id="image"
                onChange={handleImageChange}
                style={{ width: '100%', padding: '8px', margin: '5px 0' }}
              />
              {previewImage && (
                <img src={previewImage} alt="Preview" style={{ maxWidth: '100px', marginTop: '10px' }} />
              )}
            </div>
            <div>
              <label htmlFor="name">Назва страви:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={handleNameChange}
                style={{ width: '100%', padding: '8px', margin: '5px 0', border: '1px solid #ccc', borderRadius: '4px' }}
              />
            </div>
            <div>
              <label htmlFor="description">Опис:</label>
              <textarea
                id="description"
                value={description}
                onChange={handleDescriptionChange}
                style={{ width: '100%', padding: '8px', margin: '5px 0', border: '1px solid #ccc', borderRadius: '4px', minHeight: '80px' }}
              />
            </div>
            <div>
              <label htmlFor="price">Ціна:</label>
              <input
                type="number"
                id="price"
                value={price}
                onChange={handlePriceChange}
                style={{ width: '100%', padding: '8px', margin: '5px 0', border: '1px solid #ccc', borderRadius: '4px' }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
              <button onClick={handleCloseClick} style={{ padding: '10px 15px', marginRight: '10px', borderRadius: '5px', border: '1px solid #ccc', cursor: 'pointer' }}>
                Скасувати
              </button>
              <button onClick={handleSaveClick} style={{ padding: '10px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                Зберегти
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MenuItemModal;