import { NextApiRequest, NextApiResponse } from 'next';
import { RestaurantManager } from '../../../../src/app/lib/restaurantDatabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { categoryId } = req.query;

  if (!categoryId || typeof categoryId !== 'string') {
    return res.status(400).json({ error: 'Невірний ID категорії' });
  }

  if (req.method === 'PUT') {
    try {
      const { name, description, image, restaurantId } = req.body;

      if (!name) {
        return res.status(400).json({ error: 'Назва категорії обов\'язкова' });
      }

      if (!restaurantId || typeof restaurantId !== 'string') {
        return res.status(400).json({ error: 'Невірний ID ресторану' });
      }

      const restaurantDb = await RestaurantManager.getRestaurantDatabase(restaurantId);
      
      // Оновлюємо дані категорії в правильній структурі
      const updateData = {
        name,
        description: description || '',
        image: image || null,
      };

      const updateResult = await restaurantDb.update(categoryId, updateData);
      console.log('Update result:', updateResult);

      if (updateResult.modifiedCount > 0) {
        // Отримуємо оновлений документ
        const updatedCategory = await restaurantDb.getById(categoryId);
        console.log('Updated category:', updatedCategory);
        
        if (updatedCategory && updatedCategory.data) {
          // Форматуємо відповідь для фронтенду
          const formattedResult = {
            _id: updatedCategory._id?.toString(),
            name: updatedCategory.data.name || '',
            description: updatedCategory.data.description || '',
            image: updatedCategory.data.image || null,
            order: updatedCategory.order,
            createdAt: updatedCategory.createdAt,
            updatedAt: updatedCategory.updatedAt
          };

          return res.status(200).json(formattedResult);
        } else {
          return res.status(404).json({ error: 'Не вдалося отримати оновлену категорію' });
        }
      } else {
        return res.status(404).json({ error: 'Категорію не знайдено' });
      }
    } catch (error) {
      console.error('Помилка оновлення категорії:', error);
      return res.status(500).json({ 
        error: error instanceof Error ? error.message : 'Не вдалося оновити категорію' 
      });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}