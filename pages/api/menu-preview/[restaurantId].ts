// pages/api/menu-preview/[restaurantId].ts - API для попереднього перегляду меню з restaurantId
import { NextApiRequest, NextApiResponse } from 'next';
import { connectDatabase } from '../../../src/app/lib/database';
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { restaurantId } = req.query;

  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  if (!restaurantId || typeof restaurantId !== 'string') {
    return res.status(400).json({ error: 'Невірний ID ресторану' });
  }

  try {
    const { db } = await connectDatabase();
    
    // Знаходимо ресторан за ID
    const restaurant = await db.collection('restaurants').findOne({ 
      _id: new ObjectId(restaurantId) 
    });
    
    if (!restaurant) {
      return res.status(404).json({ error: 'Ресторан не знайдено' });
    }

    const restaurantSlug = restaurant.slug;

    // Отримуємо колекцію ресторану
    const restaurantCollection = db.collection(restaurantSlug);
    
    // Отримуємо всі дані паралельно
    const [restaurantInfo, categories, menuItems, designSettings, banner] = await Promise.all([
      restaurantCollection.findOne({ type: 'restaurant-info' }),
      restaurantCollection.find({ type: 'category' }).sort({ order: 1 }).toArray(),
      restaurantCollection.find({ type: 'menu-item' }).sort({ order: 1 }).toArray(),
      restaurantCollection.findOne({ type: 'design-settings' }),
      restaurantCollection.findOne({ type: 'banner' })
    ]);

    // НЕ інкрементуємо лічильник переглядів для попереднього перегляду

    // Форматуємо категорії
    const formattedCategories = categories.map(cat => ({
      _id: cat._id?.toString(),
      name: cat.data.name,
      description: cat.data.description,
      image: cat.data.image,
      order: cat.order
    }));

    // Форматуємо страви
    const formattedMenuItems = menuItems.map(item => ({
      _id: item._id?.toString(),
      categoryId: item.data.categoryId,
      name: item.data.name,
      description: item.data.description,
      price: item.data.price,
      image: item.data.image,
      order: item.order
    }));

    // Групуємо страви за категоріями
    const menuByCategories = formattedCategories.map(category => ({
      ...category,
      items: formattedMenuItems.filter(item => item.categoryId === category._id)
    }));

    // Повертаємо дані
    const response = {
      restaurant: {
        _id: restaurant._id?.toString(),
        name: restaurant.name,
        slug: restaurant.slug,
      },
      categories: menuByCategories,
      designSettings: designSettings?.data || {
        theme: {
          id: 'default',
          name: 'За замовчуванням',
          colors: {
            primary: '#2563eb',
            secondary: '#64748b',
            accent: '#f59e0b',
            background: '#ffffff',
            text: '#1f2937'
          }
        },
        layout: {
          borderRadius: 'medium',
          padding: 'normal',
          shadow: 'normal',
          fontFamily: 'inter'
        }
      },
      banner: banner?.data || null
    };

    return res.status(200).json(response);

  } catch (error) {
    console.error('Помилка отримання меню для попереднього перегляду:', error);
    return res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Не вдалося отримати меню' 
    });
  }
}

