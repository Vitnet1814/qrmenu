// pages/api/restaurants/[restaurantId]/banner.ts - API для роботи з банером ресторану
import { NextApiRequest, NextApiResponse } from 'next';
import { RestaurantManager } from '../../../../src/app/lib/restaurantDatabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { restaurantId } = req.query;

  if (!restaurantId || typeof restaurantId !== 'string') {
    return res.status(400).json({ error: 'ID ресторану обов\'язковий' });
  }

  try {
    switch (req.method) {
      case 'GET':
        // Отримати банер ресторану
        const banner = await RestaurantManager.getRestaurantBanner(restaurantId);
        
        if (!banner) {
          return res.status(404).json({ error: 'Банер не знайдено' });
        }

        return res.status(200).json({ banner });

      case 'POST':
        // Створити/оновити банер ресторану
        const { image, alt } = req.body;

        if (!image) {
          return res.status(400).json({ error: 'Зображення обов\'язкове' });
        }

        const result = await RestaurantManager.setRestaurantBanner(
          restaurantId, 
          image, 
          alt
        );

        return res.status(200).json({ 
          success: true,
          banner: result,
          message: 'Банер успішно збережено'
        });

      case 'DELETE':
        // Видалити банер ресторану
        const deleteResult = await RestaurantManager.removeRestaurantBanner(restaurantId);
        
        return res.status(200).json({ 
          success: true,
          deletedCount: deleteResult.deletedCount,
          message: 'Банер успішно видалено'
        });

      default:
        res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Error in banner API:', error);
    return res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Сталася помилка при роботі з банером' 
    });
  }
}
