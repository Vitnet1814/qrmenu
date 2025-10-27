"use client";

import React, { useState, useEffect, useRef } from 'react';
import CategoryItem from '../menu/CategoryItem'; // Компонент для відображення однієї категорії
import CategoryModal from '../menu/CategoryModal'; // Модальне вікно для додавання/редагування категорії
import ConfirmationModal from '../menu/ConfirmationModal'; // Модальне вікно для підтвердження видалення
import { useParams } from 'next/navigation'; // Хук для отримання параметрів з URL
import { useToast } from '../../contexts/ToastContext';
import { LoadingSpinner, ErrorState } from '../ui/LoadingStates';
// import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import MenuList from '../../components/menu/MenuList'; // Або шлях до вашого файлу MenuItemsList

// Інтерфейс для представлення об'єкта категорії
interface Category {
  _id: string; // робимо необов'язковим
  name: string;
  description?: string;
  order?: number;
  restaurantId?: string; // робимо необов'язковим
  createdAt?: Date;
  updatedAt?: Date;
}

const CategoryList = () => {
  // Стан для зберігання списку категорій
  const [categories, setCategories] = useState<Category[]>([]);
  // Стан для відстеження активної (вибраної) категорії
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  // Стан для контролю видимості модального вікна додавання категорії
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  // Стан для зберігання категорії, яку потрібно редагувати
  const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null);
  // Стан для контролю видимості модального вікна підтвердження видалення
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
  // Стан для зберігання категорії, яку потрібно видалити
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);
  // Отримуємо ID ресторану з параметрів URL
  const params = useParams();
  const restaurantId = params?.restaurantId as string; // або params?.restaurantId для безпеки
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add'); // Стан для режиму модального вікна
  const categoriesContainerRef = useRef<HTMLDivElement>(null);
  
  // Стан для перетягування
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Стани для завантаження та помилок
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { showSuccess, showError } = useToast();

  // useEffect хук для завантаження категорій при завантаженні компонента
  useEffect(() => {
    if (!restaurantId) return; // Додайте перевірку
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        setError(null);
        // Виконуємо GET-запит до API для отримання категорій конкретного ресторану
        const response = await fetch(`/api/categories/restaurant/${restaurantId}`);
        if (response.ok) {
          const data = await response.json();
          // Оновлюємо стан списком отриманих категорій
          setCategories(data);
          // Встановлюємо першу категорію як активну, якщо є категорії
          setActiveCategory(data[0]?._id || null);
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Не вдалося отримати категорії');
        }
      } catch (error) {
        console.error('Помилка під час отримання категорій:', error);
        setError(error instanceof Error ? error.message : 'Сталася помилка при завантаженні категорій');
        showError('Помилка завантаження', 'Не вдалося завантажити категорії меню');
      } finally {
        setIsLoading(false);
      }
    };

    // Викликаємо функцію отримання категорій, якщо restaurantId доступний
    if (restaurantId) {
      fetchCategories();
    }
  }, [restaurantId, showError]); // Залежність від restaurantId: запит виконується при зміні ID ресторану

  // Обробник натискання на кнопку додавання категорії
  const handleAddCategoryClick = () => {
    setCategoryToEdit(null); // Скидаємо категорію для редагування
    setIsAddCategoryModalOpen(true); // Відкриваємо модальне вікно додавання
    setModalMode('add'); // Встановлюємо режим додавання
  };

  // Обробник натискання на кнопку редагування категорії
  const handleEditCategoryClick = (category: Category) => {
    setCategoryToEdit(category); // Встановлюємо категорію для редагування
    setModalMode('edit'); // Встановлюємо режим редагування
    setIsAddCategoryModalOpen(true); // Відкриваємо модальне вікно редагування
  };

  // Обробник кліку на категорію (для вибору активної категорії)
  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId); // Оновлюємо стан активної категорії
    // TODO: Тут буде логіка для оновлення списку страв для вибраної категорії
  };
  
  // Обробник закриття модального вікна додавання/редагування категорії
  const handleCloseCategoryModal = () => {
    setIsAddCategoryModalOpen(false);
    setCategoryToEdit(null);
  };

  // Обробник натискання на кнопку видалення категорії
  const handleDeleteCategoryClick = (category: Category) => {
    setCategoryToDelete(category); // Встановлюємо категорію для видалення
    setIsDeleteConfirmationOpen(true); // Відкриваємо модальне вікно підтвердження видалення
  };

  // Обробник підтвердження видалення категорії
  const handleConfirmDeleteCategory = async () => {
    if (categoryToDelete?._id) {
      try {
        // Виконуємо DELETE-запит до API для видалення категорії
        const response = await fetch(`/api/categories/${categoryToDelete._id}/delete`, {
          method: 'DELETE',
        });

        if (response.ok) {
          // Оновлюємо стан, видаляючи видалену категорію
          setCategories((prevCategories) =>
            prevCategories.filter((cat) => cat._id !== categoryToDelete._id)
          );
          // Якщо видалено активну категорію, встановлюємо першу доступну як активну
          if (activeCategory === categoryToDelete._id) {
            // setActiveCategory(categories[0]?._id || null);
            setCategories((prevCategories) => {
              const newCategories = prevCategories.filter((cat) => cat._id !== categoryToDelete._id);
              setActiveCategory(newCategories[0]?._id || null); // Оновлюємо після фільтрації
              return newCategories;
            });
          }
          setIsDeleteConfirmationOpen(false); // Закриваємо модальне вікно підтвердження
          setCategoryToDelete(null); // Скидаємо категорію для видалення
          showSuccess('Категорію видалено', `Категорія "${categoryToDelete.name}" була успішно видалена`);
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Не вдалося видалити категорію');
        }
      } catch (error) {
        console.error('Помилка під час видалення категорії:', error);
        showError('Помилка видалення', error instanceof Error ? error.message : 'Не вдалося видалити категорію');
      }
    }
  };

  // Обробник скасування видалення категорії
  const handleCancelDeleteCategory = () => {
    setIsDeleteConfirmationOpen(false);
    setCategoryToDelete(null);
  };

  const handleSaveCategory = async (savedCategory: Category) => {
    if (!savedCategory) return;

    const updatedCategory = {
      ...savedCategory,
      _id: savedCategory._id || '',
      restaurantId: savedCategory.restaurantId || restaurantId,
    };

    if (modalMode === 'add') {
      setCategories((prev) => {
        const newCategories = [...prev, updatedCategory];
        // Оновлюємо порядок, якщо потрібно (наприклад, ставимо нову в кінець)
        return newCategories.map((cat, index) => ({ ...cat, order: index + 1 }));
      });
    } else {
      setCategories(prev => {
        return prev.map(cat => {         
          return cat._id === updatedCategory._id ? updatedCategory : cat;
        });
      });
    }
    setIsAddCategoryModalOpen(false);
  };

  const handleMoveCategory = async (categoryId: string, direction: 'left' | 'right') => {
    const currentIndex = categories.findIndex((cat) => cat._id === categoryId);
    if (currentIndex === -1) return;

    const newCategories = [...categories];
    // const _movedCategory = newCategories[currentIndex];
    let swapIndex: number;

    if (direction === 'left' && currentIndex > 0) {
      swapIndex = currentIndex - 1;
    } else if (direction === 'right' && currentIndex < newCategories.length - 1) {
      swapIndex = currentIndex + 1;
    } else {
      return; // Немає куди рухати
    }

    // Обмінюємо елементи в масиві
    [newCategories[currentIndex], newCategories[swapIndex]] = [newCategories[swapIndex], newCategories[currentIndex]];

    // Оновлюємо порядок на основі нової позиції
    const updatedCategories = newCategories.map((cat, index) => ({ ...cat, order: index + 1 }));
    setCategories(updatedCategories);

    // Надсилаємо оновлений порядок на сервер
    try {
      const response = await fetch('/api/categories/reorder', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          categories: updatedCategories.map(cat => ({ _id: cat._id!, order: cat.order! })),
          restaurantId: restaurantId
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Не вдалося оновити порядок категорій на сервері');
      }
      showSuccess('Порядок оновлено', 'Порядок категорій було успішно змінено');
    } catch (error) {
      console.error('Помилка під час оновлення порядку категорій:', error);
      showError('Помилка оновлення', error instanceof Error ? error.message : 'Не вдалося оновити порядок категорій');
      // Відкочуємо зміни на клієнті у разі помилки
      setCategories(categories);
    }
  };

  // Обробники для перетягування
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!categoriesContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - categoriesContainerRef.current.offsetLeft);
    setScrollLeft(categoriesContainerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !categoriesContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - categoriesContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Множник для швидшої прокрутки
    categoriesContainerRef.current.scrollLeft = scrollLeft - walk;
  };
  
  if (isLoading) {
    return (
      <div className=" min-h-screen ds-p-6">
        <div className="ds-flex ds-items-center ds-justify-center h-64">
          <LoadingSpinner 
            size="lg" 
            text="Завантаження категорій..." 
            transparentBg={true}
          />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="ds-gradient-bg ds-gradient-overlay min-h-screen ds-p-6">
        <ErrorState 
          title="Помилка завантаження"
          message={error}
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }
  
  return (
    <div 
    //   className=" min-h-screen"
    >
      <header className="ds-gradient-header">
        <div  className="container ds-flex ds-items-center ds-justify-between ds-gap-4">
          <div className="ds-mb-3">
            <h1 className=" ds-text-2xl ds-font-bold ds-mb-2">Категорії меню</h1>
            <p className="ds-text-sm ds-text-gray-600"> Керуйте категоріями вашого меню</p>
          </div>
          <button 
            onClick={handleAddCategoryClick}            
            className="ds-btn ds-btn-success ds-flex ds-items-center ds-gap-2"
          >
            <span className="ds-text-xl ds-font-bold">+</span>
            Додати категорію
          </button>
        </div>
      </header>
      
      <main className="ds-gradient-main ds-mb-6">
        <div 
          className="ds-flex ds-gap-6 ds-overflow-x-auto ds-scrollbar-hide "
          ref={categoriesContainerRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        >
          {categories.map((category, index) => (
            <div
              key={category._id}
              className="ds-flex-shrink-0"
            >
              <CategoryItem
                category={category}
                isActive={category._id === activeCategory}
                isFirst={index === 0}
                isLast={index === categories.length - 1}
                onEdit={handleEditCategoryClick}
                onDelete={handleDeleteCategoryClick}
                onClick={handleCategoryClick}
                onMoveLeft={() => handleMoveCategory(category._id!, 'left')}
                onMoveRight={() => handleMoveCategory(category._id!, 'right')}
              />
            </div>
          ))}
        </div>
      </main>

      {/* <div className="ds-gradient-main ds-p-6"> */}
        <MenuList 
          categoryId={activeCategory} 
          restaurantId={restaurantId}
        />
      {/* </div> */}

      {/* Модальні вікна */}
      {isAddCategoryModalOpen && (
        <CategoryModal
          isOpen={isAddCategoryModalOpen}
          onClose={handleCloseCategoryModal}
          onSave={handleSaveCategory}
          categoryToEdit={categoryToEdit}
          restaurantId={restaurantId}
          mode={modalMode}
        />
      )}
      {isDeleteConfirmationOpen && (
        <ConfirmationModal
          isOpen={isDeleteConfirmationOpen}
          onClose={handleCancelDeleteCategory}
          onConfirm={handleConfirmDeleteCategory}
          message={`Ви впевнені, що хочете видалити категорію "${categoryToDelete?.name}" та всі пов'язані з нею страви?`}
        />
      )}
    </div>
  );
};

export default CategoryList;