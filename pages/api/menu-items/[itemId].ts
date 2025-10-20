import { NextApiRequest, NextApiResponse } from 'next';
import { RestaurantManager } from '../../../src/app/lib/restaurantDatabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { itemId } = req.query;

  if (req.method === 'DELETE') {
    try {
      if (!itemId || typeof itemId !== 'string') {
        return res.status(400).json({ message: 'Необхідно надати ID страви' });
      }

      // Знаходимо ресторан, якому належить ця страва
      const restaurantId = await RestaurantManager.findRestaurantByMenuItem(itemId);
      
      if (!restaurantId) {
        return res.status(404).json({ message: 'Страву не знайдено' });
      }

      const restaurantDb = await RestaurantManager.getRestaurantDatabase(restaurantId);
      const result = await restaurantDb.delete(itemId);

      if (result.deletedCount > 0) {
        res.status(200).json({ message: 'Страву успішно видалено' });
      } else {
        res.status(404).json({ message: 'Страву з таким ID не знайдено' });
      }
    } catch (error) {
      console.error('Помилка при видаленні страви:', error);
      res.status(500).json({ 
        message: error instanceof Error ? error.message : 'Помилка сервера при видаленні страви' 
      });
    }
  } else if (req.method === 'PUT') {
    try {
      if (!itemId || typeof itemId !== 'string') {
        return res.status(400).json({ message: 'Необхідно надати ID страви' });
      }

      const { restaurantId, categoryId, name, description, price, image } = req.body;

      if (!restaurantId || !categoryId || !name || price === undefined) {
        return res.status(400).json({ message: 'Необхідно надати restaurantId, categoryId, name та price' });
      }

      const restaurantDb = await RestaurantManager.getRestaurantDatabase(restaurantId);

      const updatedData = {
        categoryId,
        name,
        description: description || '',
        price: parseFloat(price),
        image: image || null,
      };

      const result = await restaurantDb.update(itemId, updatedData);

      if (result.modifiedCount > 0) {
        res.status(200).json({ message: 'Страву успішно оновлено' });
      } else {
        res.status(404).json({ message: 'Страву з таким ID не знайдено або дані не змінилися' });
      }
    } catch (error) {
      console.error('Помилка при редагуванні страви:', error);
      res.status(500).json({ 
        message: error instanceof Error ? error.message : 'Помилка сервера при редагуванні страви' 
      });
    }
  } else {
    res.setHeader('Allow', ['PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}