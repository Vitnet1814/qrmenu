// app/api/restaurants/index.ts. Створюємо новий ресторан з новим користувачем
import { NextApiRequest, NextApiResponse } from 'next';
import { connectDatabase } from '../../../src/app/lib/database';
import { ObjectId } from 'mongodb';
import slugify from 'slugify';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { name, userId } = req.body;

      if (!name || !userId) {
        return res.status(400).json({ error: 'Назва закладу та ID користувача обов\'язкові' });
      }
      const slug = slugify(name, { lower: true }); // Генеруємо slug
      const { db } = await connectDatabase();
      const restaurantsCollection = db.collection('restaurants');

      // Перевіряємо, чи існує вже заклад з таким slug (можна додати логіку для унікальності)
      const existingRestaurantWithSlug = await restaurantsCollection.findOne({ slug });
      if (existingRestaurantWithSlug) {
        // Можна додати до slug унікальний суфікс, якщо потрібно
        console.warn(`Заклад зі slug "${slug}" вже існує.`);
      }

      const result = await restaurantsCollection.insertOne({
        name,
        slug,
        userId: new ObjectId(userId),
        createdAt: new Date(),
      });

      if (result.insertedId) {
        return res.status(201).json({ restaurantId: result.insertedId.toString() });
      } else {
        return res.status(500).json({ error: 'Не вдалося створити заклад' });
      }
    } catch (error) {
      console.error('Error creating restaurant:', error);
      return res.status(500).json({ error: 'Сталася помилка при створенні закладу' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}