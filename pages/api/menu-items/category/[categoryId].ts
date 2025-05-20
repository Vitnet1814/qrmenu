import { NextApiRequest, NextApiResponse } from 'next';
import { connectDatabase } from '../../../../src/app/lib/database';
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { categoryId } = req.query;

  if (req.method === 'GET') {
    try {
      if (!categoryId || typeof categoryId !== 'string') {
        return res.status(400).json({ message: 'Необхідно надати ID категорії' });
      }

      const { db } = await connectDatabase();
      const menuItemsCollection = db.collection('menuItems');

      const items = await menuItemsCollection.find({ categoryId: new ObjectId(categoryId) }).toArray();

      res.status(200).json(items);
    } catch (error) {
      console.error('Помилка при отриманні страв за категорією:', error);
      res.status(500).json({ message: 'Помилка сервера при отриманні страв' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}