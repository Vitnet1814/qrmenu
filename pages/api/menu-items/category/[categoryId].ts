import { NextApiRequest, NextApiResponse } from 'next';
import { RestaurantManager } from '../../../../src/app/lib/restaurantDatabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { categoryId } = req.query;

  if (req.method === 'GET') {
    try {
      if (!categoryId || typeof categoryId !== 'string') {
        return res.status(400).json({ message: 'Необхідно надати ID категорії' });
      }

      // Знаходимо ресторан, якому належить ця категорія
      const restaurantId = await RestaurantManager.findRestaurantByCategory(categoryId);
      
      if (!restaurantId) {
        return res.status(404).json({ message: 'Категорію не знайдено' });
      }

      const restaurantDb = await RestaurantManager.getRestaurantDatabase(restaurantId);
      const menuItems = await restaurantDb.getMenuItemsByCategory(categoryId);

      // Перетворюємо дані в формат, сумісний з фронтендом
      const formattedItems = menuItems.map(item => ({
        _id: item._id?.toString(),
        categoryId: item.data.categoryId,
        name: item.data.name,
        description: item.data.description,
        price: item.data.price,
        image: item.data.image,
        order: item.order,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt
      }));

      return res.status(200).json(formattedItems);
      
    } catch (error) {
      console.error('Помилка при отриманні страв за категорією:', error);
      return res.status(500).json({ 
        message: error instanceof Error ? error.message : 'Помилка сервера при отриманні страв' 
      });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}