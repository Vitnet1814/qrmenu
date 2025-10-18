import { NextApiRequest, NextApiResponse } from 'next';
import { RestaurantManager } from '../../../../src/app/lib/restaurantDatabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { restaurantId } = req.query;

  if (!restaurantId || typeof restaurantId !== 'string') {
    return res.status(400).json({ error: 'Невірний ID закладу' });
  }

  if (req.method === 'GET') {
    try {
      const restaurantDb = await RestaurantManager.getRestaurantDatabase(restaurantId);
      const categories = await restaurantDb.getByType('category');

      // Перетворюємо дані в формат, сумісний з фронтендом
      const formattedCategories = categories.map(category => ({
        _id: category._id?.toString(),
        name: category.data.name,
        description: category.data.description,
        image: category.data.image,
        order: category.order,
        createdAt: category.createdAt,
        updatedAt: category.updatedAt
      }));

      return res.status(200).json(formattedCategories);
    } catch (error) {
      console.error('Помилка отримання категорій:', error);
      return res.status(500).json({ 
        error: error instanceof Error ? error.message : 'Не вдалося отримати категорії' 
      });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}