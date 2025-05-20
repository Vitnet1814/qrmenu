import { NextApiRequest, NextApiResponse } from 'next';
import { connectDatabase } from '../../../src/app/lib/database';
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') { // Змінюємо на PUT   
    try {
        const categories = req.body;
      if (!Array.isArray(categories)) {
        return res.status(400).json({ error: 'Очікується масив категорій' });
      }

      const { db } = await connectDatabase();
      const categoriesCollection = db.collection('categories');

      const bulkOperations = categories.map((cat: { _id: string; order: number }) => ({
        updateOne: {
          filter: { _id: new ObjectId(cat._id) },
          update: { $set: { order: cat.order, updatedAt: new Date() } },
        },
      }));

      if (bulkOperations.length > 0) {
        const result = await categoriesCollection.bulkWrite(bulkOperations);
        if (result.modifiedCount === bulkOperations.length) {
          return res.status(200).json({ message: 'Порядок категорій оновлено' });
        } else {
          return res.status(500).json({ error: 'Не вдалося оновити порядок усіх категорій' });
        }
      } else {
        return res.status(200).json({ message: 'Немає категорій для оновлення порядку' });
      }
    } catch (error) {
      console.error('Помилка оновлення порядку категорій:', error);
      return res.status(500).json({ error: 'Не вдалося оновити порядок категорій' });
    }
  } else {
    res.setHeader('Allow', ['PUT']); // Оновлюємо дозволені методи
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}