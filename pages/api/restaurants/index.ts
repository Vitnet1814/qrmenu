// app/api/restaurants/index.ts. Створюємо новий ресторан з новою структурою БД
import { NextApiRequest, NextApiResponse } from 'next';
import { RestaurantManager } from '../../../src/app/lib/restaurantDatabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { name, userId } = req.body;

      if (!name || !userId) {
        return res.status(400).json({ error: 'Назва закладу та ID користувача обов\'язкові' });
      }

      const result = await RestaurantManager.createRestaurant(name, userId);
      
      return res.status(201).json({
        restaurantId: result.restaurantId,
        slug: result.slug,
        name: result.name,
        message: 'Ресторан успішно створено'
      });
    } catch (error) {
      console.error('Error creating restaurant:', error);
      return res.status(500).json({ 
        error: error instanceof Error ? error.message : 'Сталася помилка при створенні закладу' 
      });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}