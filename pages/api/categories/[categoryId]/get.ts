import { NextApiRequest, NextApiResponse } from 'next';
import { RestaurantManager } from '../../../../src/app/lib/restaurantDatabase';
import { connectDatabase } from '../../../../src/app/lib/database';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { categoryId } = req.query;

  if (!categoryId || typeof categoryId !== 'string') {
    return res.status(400).json({ error: 'Невірний ID категорії' });
  }

  if (req.method === 'GET') {
    try {
      // Спочатку знаходимо ресторан, до якого належить категорія
      const { db } = await connectDatabase();
      const restaurantsCollection = db.collection('restaurants');
      
      // Шукаємо ресторан, який містить цю категорію
      const restaurants = await restaurantsCollection.find({}).toArray();
      let foundCategory = null;

      for (const restaurant of restaurants) {
        const restaurantDb = await RestaurantManager.getRestaurantDatabase(restaurant._id.toString());
        const categories = await restaurantDb.getByType('category');
        const category = categories.find(cat => cat._id?.toString() === categoryId);
        
        if (category) {
          foundCategory = category;
          break;
        }
      }

      if (foundCategory) {
        // Форматуємо дані для фронтенду
        const formattedCategory = {
          _id: foundCategory._id?.toString(),
          name: foundCategory.data.name,
          description: foundCategory.data.description,
          image: foundCategory.data.image,
          order: foundCategory.order,
          createdAt: foundCategory.createdAt,
          updatedAt: foundCategory.updatedAt
        };

        return res.status(200).json(formattedCategory);
      } else {
        return res.status(404).json({ error: 'Категорію не знайдено' });
      }
    } catch (error) {
      console.error('Помилка отримання категорії:', error);
      return res.status(500).json({ 
        error: error instanceof Error ? error.message : 'Не вдалося отримати категорію' 
      });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}