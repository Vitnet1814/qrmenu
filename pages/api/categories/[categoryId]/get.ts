import { NextApiRequest, NextApiResponse } from 'next';
import { connectDatabase } from '../../../../src/app/lib/database';
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { categoryId } = req.query;

  if (!categoryId || typeof categoryId !== 'string') {
    return res.status(400).json({ error: 'Невірний ID категорії' });
  }

  if (req.method === 'GET') {
    try {
      const { db } = await connectDatabase();
      const categoriesCollection = db.collection('categories');

      const category = await categoriesCollection.findOne({ _id: new ObjectId(categoryId) });

      if (category) {
        return res.status(200).json(category);
      } else {
        return res.status(404).json({ error: 'Категорію не знайдено' });
      }
    } catch (error) {
      console.error('Помилка отримання категорії:', error);
      return res.status(500).json({ error: 'Не вдалося отримати категорію' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}