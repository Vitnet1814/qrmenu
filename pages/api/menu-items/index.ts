import { NextApiRequest, NextApiResponse } from 'next';
import { connectDatabase } from '../../../src/app/lib/database';
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { restaurantId, categoryId, name, description, price, image } = req.body;

      if (!restaurantId || !categoryId || !name || price === undefined) {
        return res.status(400).json({ message: 'Необхідно надати restaurantId, categoryId, name та price' });
      }

      const { db } = await connectDatabase();
      const menuItemsCollection = db.collection('menuItems');

      const newItem = {
        restaurantId: new ObjectId(restaurantId),
        categoryId: new ObjectId(categoryId),
        name,
        description: description || '',
        price: parseFloat(price),
        image: image || null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const result = await menuItemsCollection.insertOne(newItem);

      if (result.insertedId) {
        res.status(201).json({ message: 'Страву успішно створено', itemId: result.insertedId });
      } else {
        res.status(500).json({ message: 'Не вдалося створити страву' });
      }
    } catch (error) {
      console.error('Помилка при створенні страви:', error);
      res.status(500).json({ message: 'Помилка сервера при створенні страви' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}