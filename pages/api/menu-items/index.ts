import { NextApiRequest, NextApiResponse } from 'next';
import { RestaurantManager } from '../../../src/app/lib/restaurantDatabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { restaurantId, categoryId, name, description, price, image } = req.body;

      if (!restaurantId || !categoryId || !name || price === undefined) {
        return res.status(400).json({ message: 'Необхідно надати restaurantId, categoryId, name та price' });
      }

      const restaurantDb = await RestaurantManager.getRestaurantDatabase(restaurantId);

      const menuItemData = {
        categoryId,
        name,
        description: description || '',
        price: parseFloat(price),
        image: image || null,
      };

      const result = await restaurantDb.create('menu-item', menuItemData);

      return res.status(201).json({ 
        message: 'Страву успішно створено', 
        itemId: result._id?.toString(),
        data: result.data,
        order: result.order,
        createdAt: result.createdAt,
        updatedAt: result.updatedAt
      });
    } catch (error) {
      console.error('Помилка при створенні страви:', error);
      return res.status(500).json({ 
        message: error instanceof Error ? error.message : 'Помилка сервера при створенні страви' 
      });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}