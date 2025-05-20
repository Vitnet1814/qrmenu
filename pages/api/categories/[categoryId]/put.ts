import { NextApiRequest, NextApiResponse } from 'next';
import { connectDatabase } from '../../../../src/app/lib/database';
import { ObjectId } from 'mongodb';

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

      const { db } = await connectDatabase();
      const categoriesCollection = db.collection('categories');

      const updateData: {
        name: string;
        description: string | undefined;
        image: string | null | undefined;
        restaurantId?: ObjectId;
        updatedAt: Date;
      } = {
        name,
        description,
        image,
        updatedAt: new Date(),
      };

      if (restaurantId) {
        updateData.restaurantId = new ObjectId(restaurantId);
      }    
      const updateResult = await categoriesCollection.findOneAndUpdate(
        { _id: new ObjectId(categoryId) },
        { $set: updateData },
        { returnDocument: 'after' }
      );
      if (updateResult) {
        return res.status(200).json(updateResult);
      } else {
        return res.status(404).json({ error: 'Категорію не знайдено' });
      }
    } catch (error) {
      console.error('Помилка оновлення категорії:', error);
      return res.status(500).json({ error: 'Не вдалося оновити категорію АПІ' });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}