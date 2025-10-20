import { NextApiRequest, NextApiResponse } from 'next';
import { RestaurantManager } from '../../../../src/app/lib/restaurantDatabase';
import { connectDatabase } from '../../../../src/app/lib/database';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { categoryId } = req.query;

  if (!categoryId || typeof categoryId !== 'string') {
    return res.status(400).json({ error: 'Невірний ID категорії' });
  }

  if (req.method === 'DELETE') {
    try {
      // Спочатку знаходимо ресторан, до якого належить категорія
      const { db } = await connectDatabase();
      const restaurantsCollection = db.collection('restaurants');
      
      // Шукаємо ресторан, який містить цю категорію
      const restaurants = await restaurantsCollection.find({}).toArray();
      let foundRestaurant = null;

      for (const restaurant of restaurants) {
        const restaurantDb = await RestaurantManager.getRestaurantDatabase(restaurant._id.toString());
        const categories = await restaurantDb.getByType('category');
        const category = categories.find(cat => cat._id?.toString() === categoryId);
        
        if (category) {
          foundRestaurant = restaurant;
          break;
        }
      }

      if (!foundRestaurant) {
        return res.status(404).json({ error: 'Категорію не знайдено' });
      }

      const restaurantDb = await RestaurantManager.getRestaurantDatabase(foundRestaurant._id.toString());
      
      // Спочатку видаляємо всі страви, пов'язані з цією категорією
      const menuItems = await restaurantDb.getByType('menu-item');
      const itemsToDelete = menuItems.filter(item => 
        item.data.categoryId === categoryId || 
        item.data.categoryId?.toString() === categoryId
      );

      for (const item of itemsToDelete) {
        await restaurantDb.delete(item._id!.toString());
      }

      console.log(`Видалено ${itemsToDelete.length} страв з категорії ${categoryId}`);

      // Потім видаляємо саму категорію
      const deleteResult = await restaurantDb.delete(categoryId);

      if (deleteResult.deletedCount > 0) {
        return res.status(200).json({ 
          message: 'Категорію та пов\'язані страви видалено',
          deletedItemsCount: itemsToDelete.length
        });
      } else {
        return res.status(404).json({ error: 'Категорію не знайдено' });
      }
    } catch (error) {
      console.error('Помилка видалення категорії:', error);
      return res.status(500).json({ 
        error: error instanceof Error ? error.message : 'Не вдалося видалити категорію' 
      });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}