// /api/restaurants/user/[Id]/ Яке витянує айді ресторану по айді юзера
import { NextApiRequest, NextApiResponse } from 'next';
import { connectDatabase } from '../../../../src/app/lib/database';
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Невірний ID користувача' });
  }

  if (req.method === 'GET') {
    try {
      const { db } = await connectDatabase();
      const restaurantsCollection = db.collection('restaurants');

      const restaurant = await restaurantsCollection.findOne({ userId: new ObjectId(id) });

      if (restaurant) {
        return res.status(200).json({ restaurantId: restaurant._id.toString() });
      } else {
        return res.status(200).json({}); // Користувач не має закладу
      }
    } catch (error) {
      console.error('Помилка отримання ресторану користувача:', error);
      return res.status(500).json({ error: 'Не вдалося отримати ресторан' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}