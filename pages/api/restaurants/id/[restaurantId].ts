// /api/restaurants/id/[[restaurantId]]/ Яке витянує slug і name ресторану по айді ресторану
import { NextApiRequest, NextApiResponse } from 'next';
import { connectDatabase } from '../../../../src/app/lib/database'; // Перевірте шлях
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { restaurantId } = req.query;

  if (!restaurantId || typeof restaurantId !== 'string') {
    return res.status(400).json({ error: 'Невірний ID закладу' });
  }

  if (req.method === 'GET') {
    try {
      const { db } = await connectDatabase();
      const restaurantsCollection = db.collection('restaurants');

      const restaurant = await restaurantsCollection.findOne(
        { _id: new ObjectId(restaurantId) },
        { projection: { slug: 1, name: 1 } }
      );

      if (restaurant) {
        return res.status(200).json({ slug: restaurant.slug, name: restaurant.name });
      } else {
        return res.status(200).json({ slug: null, name: null });
      }
    } catch (error) {
      console.error('Error fetching restaurant data by ID:', error);
      return res.status(500).json({ error: 'Помилка при отриманні закладу за ID' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}