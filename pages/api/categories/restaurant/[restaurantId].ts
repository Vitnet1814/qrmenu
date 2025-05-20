import { NextApiRequest, NextApiResponse } from 'next';
import { connectDatabase } from '../../../../src/app/lib/database';
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { restaurantId } = req.query;

  if (!restaurantId || typeof restaurantId !== 'string') {
    return res.status(400).json({ error: 'Невірний ID закладу' });
  }

  if (req.method === 'GET') {
    try {
      const { db } = await connectDatabase();
      const categoriesCollection = db.collection('categories');

      const categories = await categoriesCollection.find({ restaurantId: new ObjectId(restaurantId) }).sort({ order: 1 }).toArray();

      return res.status(200).json(categories);
    } catch (error) {
      console.error('Помилка отримання категорій:', error);
      return res.status(500).json({ error: 'Не вдалося отримати категорії' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}