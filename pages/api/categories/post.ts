import { NextApiRequest, NextApiResponse } from 'next';
import { RestaurantManager } from '../../../src/app/lib/restaurantDatabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { restaurantId, name, description, image } = req.body;

    if (!restaurantId || typeof restaurantId !== 'string') {
      return res.status(400).json({ error: 'Невірний ID закладу' });
    }

    if (!name) {
      return res.status(400).json({ error: 'Назва категорії обов\'язкова' });
    }

    try {
      const restaurantDb = await RestaurantManager.getRestaurantDatabase(restaurantId);
      
      const categoryData = {
        name,
        description: description || '',
        image: image || null,
      };

      const result = await restaurantDb.create('category', categoryData);

      // Форматуємо дані в формат, сумісний з фронтендом
      const formattedCategory = {
        _id: result._id?.toString(),
        name: result.data.name,
        description: result.data.description,
        image: result.data.image,
        order: result.order,
        createdAt: result.createdAt,
        updatedAt: result.updatedAt
      };

      return res.status(201).json(formattedCategory);
    } catch (error) {
      console.error('Помилка створення категорії:', error);
      return res.status(500).json({ 
        error: error instanceof Error ? error.message : 'Не вдалося створити категорію' 
      });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}