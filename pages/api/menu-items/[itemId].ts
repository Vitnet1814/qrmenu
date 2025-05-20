import { NextApiRequest, NextApiResponse } from 'next';
import { connectDatabase } from '../../../src/app/lib/database';
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { itemId } = req.query;

  if (req.method === 'DELETE') {
    try {
      if (!itemId || typeof itemId !== 'string') {
        return res.status(400).json({ message: 'Необхідно надати ID страви' });
      }

      const { db } = await connectDatabase();
      const menuItemsCollection = db.collection('menuItems');

      const result = await menuItemsCollection.deleteOne({ _id: new ObjectId(itemId) });

      if (result.deletedCount > 0) {
        res.status(200).json({ message: 'Страву успішно видалено' });
      } else {
        res.status(404).json({ message: 'Страву з таким ID не знайдено' });
      }
    } catch (error) {
      console.error('Помилка при видаленні страви:', error);
      res.status(500).json({ message: 'Помилка сервера при видаленні страви' });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  if (req.method === 'PUT') {
    try {
      if (!itemId || typeof itemId !== 'string') {
        return res.status(400).json({ message: 'Необхідно надати ID страви' });
      }

      const { restaurantId, categoryId, name, description, price, image } = req.body;

      if (!restaurantId || !categoryId || !name || price === undefined) {
        return res.status(400).json({ message: 'Необхідно надати restaurantId, categoryId, name та price' });
      }

      const { db } = await connectDatabase();
      const menuItemsCollection = db.collection('menuItems');

      const updatedItem = {
        restaurantId: new ObjectId(restaurantId),
        categoryId: new ObjectId(categoryId),
        name,
        description: description || '',
        price: parseFloat(price),
        image: image || null,
        updatedAt: new Date(),
      };

      const result = await menuItemsCollection.updateOne(
        { _id: new ObjectId(itemId) },
        { $set: updatedItem }
      );

      if (result.modifiedCount > 0) {
        res.status(200).json({ message: 'Страву успішно оновлено' });
      } else {
        res.status(404).json({ message: 'Страву з таким ID не знайдено або дані не змінилися' });
      }
    } catch (error) {
      console.error('Помилка при редагуванні страви:', error);
      res.status(500).json({ message: 'Помилка сервера при редагуванні страви' });
    }
  } else if (req.method === 'DELETE') {
    // ... (код для видалення страви, як показано вище) ...
  } else {
    res.setHeader('Allow', ['PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}