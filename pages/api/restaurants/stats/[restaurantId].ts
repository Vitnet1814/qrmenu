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
      
      // Отримуємо всі категорії
      const categories = await restaurantDb.getByType('category');
      
      // Отримуємо всі страви
      const menuItems = await restaurantDb.getAllMenuItems();
      
      // Отримуємо інформацію про ресторан
      const restaurantInfo = await restaurantDb.getRestaurantInfo();
      
      // Підраховуємо статистику
      const stats = {
        categoriesCount: categories.length,
        menuItemsCount: menuItems.length,
        viewsCount: restaurantInfo?.data?.viewsCount || 0,
        lastUpdated: restaurantInfo?.updatedAt || new Date(),
        createdAt: restaurantInfo?.createdAt || new Date(),
        // Додаємо інформацію про останні зміни
        recentActivity: {
          lastCategoryAdded: categories.length > 0 ? categories[categories.length - 1]?.createdAt : null,
          lastMenuItemAdded: menuItems.length > 0 ? menuItems[menuItems.length - 1]?.createdAt : null,
        }
      };

      return res.status(200).json(stats);
    } catch (error) {
      console.error('Помилка отримання статистики ресторану:', error);
      return res.status(500).json({ 
        error: error instanceof Error ? error.message : 'Не вдалося отримати статистику ресторану' 
      });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
