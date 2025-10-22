"use client";

import React, { useState, useEffect } from 'react';
import MenuItem from '../menu/MenuItem';
import MenuItemModal from '../menu/MenuItemModal';
import ConfirmationModal from '../menu/ConfirmationModal';
import { useToast } from '../../contexts/ToastContext';
import { LoadingSpinner, ErrorState } from '../ui/LoadingStates';
import styles from './MenuList.module.css';
// Видаляємо імпорт processImageClient, оскільки тепер використовуємо Base64 оптимізацію на сервері

interface MenuItemData {
  _id: string;
  restaurantId: string;
  categoryId: string | null;
  name: string;
  description?: string;
  price: number;
  image?: string | File | null;
  order?: number;
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

  // Стани для завантаження та помилок
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { showSuccess, showError } = useToast();

  useEffect(() => {
    const fetchMenuItems = async () => {
      if (!categoryId) {
        setMenuItems([]);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(`/api/menu-items/category/${categoryId}`);
        if (response.ok) {
          const data = await response.json();
          setMenuItems(data);
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Не вдалося отримати список страв');
        }
      } catch (error) {
        console.error('Помилка при отриманні списку страв:', error);
        setError(error instanceof Error ? error.message : 'Сталася помилка при завантаженні страв');
        showError('Помилка завантаження', 'Не вдалося завантажити страви меню');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenuItems();
  }, [categoryId, showError]); // Залежність від categoryId


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
        showSuccess('Страву видалено', `Страву "${itemToDelete.name}" було успішно видалено`);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Не вдалося видалити страву');
      }
    } catch (error) {
      console.error('Помилка при видаленні страви:', error);
      showError('Помилка видалення', error instanceof Error ? error.message : 'Не вдалося видалити страву');
    }
  };

  const handleCancelDeleteItem = () => {
    setIsDeleteConfirmationOpen(false);
    setItemToDelete(null);
  };

  // Конвертуємо файл в Base64 (як у банері)
  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSaveItem = async (itemData: {
    name: string;
    description: string;
    price: number;
    image: File | null;
    imageChanged: boolean;
    _id?: string
  }) => {
    let imageToSend: string | null = null;
    
    // Якщо є нове зображення - конвертуємо його в Base64
    if (itemData.image) {
      try {
        imageToSend = await convertFileToBase64(itemData.image);
      } catch (error) {
        console.error('Помилка конвертації зображення в Base64:', error);
        return;
      }
    } else if (itemData._id && !itemData.imageChanged) {
      // Якщо редагуємо існуючу страву без зміни зображення - зберігаємо існуюче
      const existingItem = menuItems.find(item => item._id === itemData._id);
      if (existingItem && existingItem.image) {
        imageToSend = existingItem.image as string;
      }
    }
    // Якщо imageChanged = true але image = null, то imageToSend залишається null (видалення зображення)

    const dataToSend = {
      restaurantId,
      categoryId,
      name: itemData.name,
      description: itemData.description || '',
      price: itemData.price,
      image: imageToSend, // Base64 зображення або існуюче зображення
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
          showSuccess('Страву оновлено', `Страву "${itemData.name}" було успішно оновлено`);
        } else {
          setMenuItems(prevItems => [...prevItems, { ...dataToSend, _id: newItem.itemId }]);
          showSuccess('Страву додано', `Страву "${itemData.name}" було успішно додано до меню`);
        }
        setIsAddItemModalOpen(false);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Не вдалося зберегти страву');
      }
    } catch (error) {
      console.error('Помилка при збереженні страви:', error);
      showError('Помилка збереження', error instanceof Error ? error.message : 'Не вдалося зберегти страву');
    }
  };

  const handleCloseItemModal = () => {
    setIsAddItemModalOpen(false);
    setItemToEdit(null);
  };

  const handleMoveMenuItem = async (itemId: string, direction: 'up' | 'down') => {
    const currentIndex = menuItems.findIndex((item) => item._id === itemId);
    if (currentIndex === -1) return;

    const newMenuItems = [...menuItems];
    let swapIndex: number;

    if (direction === 'up' && currentIndex > 0) {
      swapIndex = currentIndex - 1;
    } else if (direction === 'down' && currentIndex < newMenuItems.length - 1) {
      swapIndex = currentIndex + 1;
    } else {
      return; // Немає куди рухати
    }

    // Обмінюємо елементи в масиві
    [newMenuItems[currentIndex], newMenuItems[swapIndex]] = [newMenuItems[swapIndex], newMenuItems[currentIndex]];

    // Оновлюємо порядок на основі нової позиції
    const updatedMenuItems = newMenuItems.map((item, index) => ({ ...item, order: index + 1 }));
    setMenuItems(updatedMenuItems);

    // Надсилаємо оновлений порядок на сервер
    try {
      const response = await fetch('/api/menu-items/reorder', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          menuItems: updatedMenuItems.map(item => ({ _id: item._id!, order: item.order! })),
          restaurantId: restaurantId
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Не вдалося оновити порядок страв меню на сервері');
      }
      showSuccess('Порядок оновлено', 'Порядок страв було успішно змінено');
    } catch (error) {
      console.error('Помилка під час оновлення порядку страв меню:', error);
      showError('Помилка оновлення', error instanceof Error ? error.message : 'Не вдалося оновити порядок страв');
      // Відкочуємо зміни на клієнті у разі помилки
      setMenuItems(menuItems);
    }
  };
  if (isLoading) {
    return (
      <div className={`${styles.container} menu-list-container-dark`}>
        <div className="flex items-center justify-center h-64">
          <LoadingSpinner size="lg" text="Завантаження страв..." />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${styles.container} menu-list-container-dark`}>
        <ErrorState 
          title="Помилка завантаження"
          message={error}
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }

  return (
    <div className={`${styles.container} menu-list-container-dark`}>
      <header className={`${styles.header} menu-list-header-dark`}>
        <h2 className={`${styles.title} menu-list-title-dark`}>Страви меню</h2>
        <button 
          onClick={handleAddItemClick}
          className={`${styles.addButton} menu-list-add-button-dark`}
        >
          <span className={styles.addButtonIcon}>+</span>
          Додати страву
        </button>
      </header>

      {!categoryId ? (
        <div className={`${styles.selectCategoryMessage} menu-list-select-category-dark`}>
          <div className={styles.selectCategoryIcon}>🍽️</div>
          <div className={styles.selectCategoryText}>
            Оберіть категорію для перегляду страв
          </div>
        </div>
      ) : menuItems.length === 0 ? (
        <div className={`${styles.emptyState} menu-list-empty-state-dark`}>
          <div className={styles.emptyStateIcon}>🍴</div>
          <div className={`${styles.emptyStateTitle} menu-list-empty-title-dark`}>Немає страв у цій категорії</div>
          <div className={`${styles.emptyStateDescription} menu-list-empty-description-dark`}>
            Додайте першу страву, натиснувши кнопку &quot;Додати страву&quot;
          </div>
        </div>
      ) : (
        <div className={`${styles.menuItemsGrid} menu-list-grid-dark`}>
          {menuItems.map((item) => (
            <div key={item._id} className={styles.menuItemWrapper}>
              <MenuItem
                item={{
                  ...item,
                  image: typeof item.image === 'string' ? item.image : undefined,
                }}
                onEdit={() => handleEditItemClick(item)}
                onDelete={() => handleDeleteItemClick(item)}
                onMoveUp={() => handleMoveMenuItem(item._id, 'up')}
                onMoveDown={() => handleMoveMenuItem(item._id, 'down')}
              />
            </div>
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