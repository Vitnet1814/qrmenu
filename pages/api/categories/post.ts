import { NextApiRequest, NextApiResponse } from 'next';
import { connectDatabase } from '../../../src/app/lib/database';
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { restaurantId, name, description, image } = req.body;

    if (!restaurantId || typeof restaurantId !== 'string') {
      return res.status(400).json({ error: 'Невірний ID закладу' });
    }

    if (!name) {
      return res.status(400).json({ error: 'Назва категорії обов\'язкова' });
    }

    try {
      const { db } = await connectDatabase();
      const categoriesCollection = db.collection('categories');

      const newCategory = {
        restaurantId: new ObjectId(restaurantId),
        name,
        description,
        image,
        order: (await categoriesCollection.countDocuments({ restaurantId: new ObjectId(restaurantId) })) + 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const result = await categoriesCollection.insertOne(newCategory);

      if (result.insertedId) {
        return res.status(201).json({ _id: result.insertedId.toString(), ...newCategory });
      } else {
        return res.status(500).json({ error: 'Не вдалося створити категорію' });
      }
    } catch (error) {
      console.error('Помилка створення категорії:', error);
      return res.status(500).json({ error: 'Не вдалося створити категорію' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}