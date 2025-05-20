"use client";

import React, { useState, useEffect } from 'react';
import MenuItem from '../menu/MenuItem';
import MenuItemModal from '../menu/MenuItemModal';
import ConfirmationModal from '../menu/ConfirmationModal';
import { processImageClient } from '../../lib/imageUtils';

interface MenuItemData {
  _id: string;
  restaurantId: string;
  categoryId: string | null;
  name: string;
  description?: string;
  price: number;
  image?: string | File | null;
  createdAt?: Date;
  updatedAt?: Date;
}

interface MenuListProps {
  categoryId: string | null;
  restaurantId: string;
}

const MenuList: React.FC<MenuListProps> = ({ categoryId, restaurantId }) => {
  const [menuItems, setMenuItems] = useState<MenuItemData[]>([]);
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<MenuItemData | null>(null);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<MenuItemData | null>(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      if (!categoryId) {
        setMenuItems([]);
        return;
      }

      try {
        const response = await fetch(`/api/menu-items/category/${categoryId}`);
        if (response.ok) {
          const data = await response.json();
          setMenuItems(data);
        } else {
          console.error('Не вдалося отримати список страв');
        }
      } catch (error) {
        console.error('Помилка при отриманні списку страв:', error);
      }
    };

    fetchMenuItems();
  }, [categoryId]); // Залежність від categoryId


  const handleAddItemClick = () => {
    setItemToEdit(null);
    setIsAddItemModalOpen(true);
  };

  const handleEditItemClick = (item: MenuItemData) => {
    setItemToEdit(item);
    setIsAddItemModalOpen(true);
  };

  const handleDeleteItemClick = (item: MenuItemData) => {
    setItemToDelete(item);
    setIsDeleteConfirmationOpen(true);
  };

  const handleConfirmDeleteItem = async () => {
    if (!itemToDelete?._id) return;
    try {
      const response = await fetch(`/api/menu-items/${itemToDelete._id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setMenuItems(prevItems => prevItems.filter(item => item._id !== itemToDelete._id));
        setIsDeleteConfirmationOpen(false);
        setItemToDelete(null);
      } else {
        console.error('Не вдалося видалити страву');
        // TODO: Додати обробку помилок для відображення користувачеві
      }
    } catch (error) {
      console.error('Помилка при видаленні страви:', error);
      // TODO: Додати обробку помилок для відображення користувачеві
    }
  };

  const handleCancelDeleteItem = () => {
    setIsDeleteConfirmationOpen(false);
    setItemToDelete(null);
  };

  const handleSaveItem = async (itemData: {
    name: string;
    description: string;
    price: number;
    image: File | null;
    _id?: string
  }) => {
    let imageUrl: string | null = null;
    if (itemData.image) {
      const processedImage = await processImageClient(itemData.image);
      if (processedImage) {
        const formData = new FormData();
        formData.append('image', processedImage);

        try {
          const uploadResponse = await fetch('/api/upload-image', {
            method: 'POST',
            body: formData,
          });

          if (uploadResponse.ok) {
            const uploadData = await uploadResponse.json();
            imageUrl = uploadData.url;
          } else {
            console.error('Помилка завантаження зображення на сервер.');
            // Обробка помилки завантаження
            return;
          }
        } catch (error) {
          console.error('Помилка завантаження зображення:', error);
          return;
        }
      } else {
        console.error('Не вдалося обробити зображення на клієнті.');
        return;
      }
    }

    const dataToSend = {
      restaurantId,
      categoryId,
      name: itemData.name,
      description: itemData.description || '',
      price: itemData.price,
      image: imageUrl, // URL отриманий від сервера
    };

    try {
      let response;
      if (itemData._id) {
        response = await fetch(`/api/menu-items/${itemData._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToSend),
        });
      } else {
        response = await fetch('/api/menu-items', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToSend),
        });
      }

      if (response.ok) {
        const newItem = await response.json();
        if (itemData._id) {
          setMenuItems(prevItems =>
            prevItems.map(item => (item._id === itemData._id ? { ...item, ...dataToSend } : item))
          );
        } else {
          setMenuItems(prevItems => [...prevItems, { ...dataToSend, _id: newItem.itemId }]);
        }
        setIsAddItemModalOpen(false);
      } else {
        console.error('Не вдалося зберегти страву');
        // TODO: Додати обробку помилок для відображення користувачеві
      }
    } catch (error) {
      console.error('Помилка при збереженні страви:', error);
      // TODO: Додати обробку помилок для відображення користувачеві
    }
  };

  const handleCloseItemModal = () => {
    setIsAddItemModalOpen(false);
    setItemToEdit(null);
  };
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
        <button onClick={handleAddItemClick}>Додати страву</button>
      </div>

      {!categoryId ? (
        <div>Оберіть категорію для перегляду страв</div>
      ) : menuItems.length === 0 ? (
        <div>Немає страв у цій категорії</div>
      ) : (
        <div>
          {menuItems.map((item) => (
            <MenuItem
              key={item._id}
              item={{
                ...item,
                image: typeof item.image === 'string' ? item.image : undefined,
              }}
              onEdit={() => handleEditItemClick(item)}
  onDelete={() => handleDeleteItemClick(item)}
            />
          ))}
        </div>
      )}

      {/* Модальні вікна залишаються без змін */}
      {isAddItemModalOpen && (
        <MenuItemModal
          isOpen={isAddItemModalOpen}
          onClose={handleCloseItemModal}
          onSave={handleSaveItem}
          itemToEdit={
            itemToEdit
              ? {
                  ...itemToEdit,
                  categoryId: itemToEdit.categoryId || '', // Ensuring categoryId is a string
                  description: itemToEdit.description || '', // Ensuring description is a string (default to empty string if undefined)
                  image: typeof itemToEdit.image === 'string' ? itemToEdit.image : undefined, // Ensure image is a string or undefined
                }
              : null
          }
          restaurantId={restaurantId}
          categoryId={categoryId || ''}
        />
      )}

      {isDeleteConfirmationOpen && (
        <ConfirmationModal
          isOpen={isDeleteConfirmationOpen}
          onClose={handleCancelDeleteItem}
          onConfirm={handleConfirmDeleteItem}
          message={`Ви впевнені, що хочете видалити страву "${itemToDelete?.name}"?`}
        />
      )}
    </div>
  );
};

export default MenuList;