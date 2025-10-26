// pages/api/menu/[restaurantSlug].ts
import { NextApiRequest, NextApiResponse } from 'next';
import { connectDatabase } from '../../../src/app/lib/database';
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { restaurantSlug } = req.query;

  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  if (!restaurantSlug || typeof restaurantSlug !== 'string') {
    return res.status(400).json({ error: 'Невірний slug ресторану' });
  }

  try {
    const { db } = await connectDatabase();
    
    // Знаходимо ресторан за slug
    const restaurant = await db.collection('restaurants').findOne({ slug: restaurantSlug });
    
    if (!restaurant) {
      return res.status(404).json({ error: 'Ресторан не знайдено' });
    }

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

    // Інкрементуємо лічильник переглядів
    if (restaurantInfo) {
      await restaurantCollection.updateOne(
        { _id: restaurantInfo._id },
        { 
          $inc: { 'data.viewsCount': 1 },
          $set: { updatedAt: new Date() }
        }
      );
    }

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
        viewsCount: (restaurantInfo?.data?.viewsCount || 0) + 1
      },
      categories: menuByCategories,
      designSettings: designSettings?.data || {
        theme: {
          id: 'modern',
          name: 'Модерн',
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
          shadow: false,
          fontFamily: 'inter'
        }
      },
      banner: banner?.data || null
    };

    return res.status(200).json(response);

  } catch (error) {
    console.error('Помилка отримання меню:', error);
    return res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Не вдалося отримати меню' 
    });
  }
}
