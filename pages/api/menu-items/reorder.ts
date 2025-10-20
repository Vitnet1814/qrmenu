import { NextApiRequest, NextApiResponse } from 'next';
import { RestaurantManager } from '../../../src/app/lib/restaurantDatabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    try {
      const { menuItems, restaurantId } = req.body;
      
      if (!Array.isArray(menuItems)) {
        return res.status(400).json({ error: 'Очікується масив страв меню' });
      }

      if (!restaurantId || typeof restaurantId !== 'string') {
        return res.status(400).json({ error: 'Невірний ID ресторану' });
      }

      const restaurantDb = await RestaurantManager.getRestaurantDatabase(restaurantId);
      
      // Оновлюємо порядок для всіх страв меню одразу
      const itemsToUpdate = menuItems.map((item: { _id: string; order: number }) => ({
        id: item._id,
        order: item.order
      }));

      await restaurantDb.updateOrder(itemsToUpdate);

      return res.status(200).json({ message: 'Порядок страв меню оновлено' });
    } catch (error) {
      console.error('Помилка оновлення порядку страв меню:', error);
      return res.status(500).json({ 
        error: error instanceof Error ? error.message : 'Не вдалося оновити порядок страв меню' 
      });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
