import { NextApiRequest, NextApiResponse } from 'next';
import { connectDatabase } from '../../../../src/app/lib/database';
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { categoryId } = req.query;

  if (!categoryId || typeof categoryId !== 'string') {
    return res.status(400).json({ error: 'Невірний ID категорії' });
  }

  if (req.method === 'DELETE') {
    try {
      const { db } = await connectDatabase();
      const categoriesCollection = db.collection('categories');
      const menuItemsCollection = db.collection('menu_items');

      // Спочатку видаляємо всі страви, пов'язані з цією категорією
      const deleteItemsResult = await menuItemsCollection.deleteMany({ categoryId: new ObjectId(categoryId) });
      console.log(`Видалено ${deleteItemsResult.deletedCount} страв з категорії ${categoryId}`);

      // Потім видаляємо саму категорію
      const deleteCategoryResult = await categoriesCollection.deleteOne({ _id: new ObjectId(categoryId) });

      if (deleteCategoryResult.deletedCount > 0) {
        return res.status(200).json({ message: 'Категорію та пов\'язані страви видалено' });
      } else {
        return res.status(404).json({ error: 'Категорію не знайдено' });
      }
    } catch (error) {
      console.error('Помилка видалення категорії:', error);
      return res.status(500).json({ error: 'Не вдалося видалити категорію' });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}