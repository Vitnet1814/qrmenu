// pages/api/restaurants/[restaurantId]/qr-settings.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { RestaurantManager } from '../../../../src/app/lib/restaurantDatabase';

export interface QRSettings {
  size: 'small' | 'medium' | 'large';
  color: string;
  backgroundColor: string;
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
  includeLogo: boolean;
  logoSize: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { restaurantId } = req.query;

  if (!restaurantId || typeof restaurantId !== 'string') {
    return res.status(400).json({ error: 'Невірний ID ресторану' });
  }

  try {
    const restaurantDb = await RestaurantManager.getRestaurantDatabase(restaurantId);

    if (req.method === 'GET') {
      // Отримати налаштування QR-коду
      const qrSettings = await restaurantDb.getByType('qr-settings');
      
      if (qrSettings.length === 0) {
        // Повертаємо налаштування за замовчуванням
        const defaultSettings: QRSettings = {
          size: 'medium',
          color: '#000000',
          backgroundColor: '#ffffff',
          errorCorrectionLevel: 'M',
          includeLogo: false,
          logoSize: 30
        };
        return res.status(200).json(defaultSettings);
      }

      return res.status(200).json(qrSettings[0].data);
    }

    if (req.method === 'PUT') {
      // Зберегти налаштування QR-коду
      const settings: QRSettings = req.body;

      // Валідація налаштувань
      if (!settings.size || !settings.color || !settings.backgroundColor || !settings.errorCorrectionLevel) {
        return res.status(400).json({ error: 'Необхідно надати всі обов\'язкові налаштування' });
      }

      // Перевіряємо чи існують налаштування
      const existingSettings = await restaurantDb.getByType('qr-settings');
      
      if (existingSettings.length > 0) {
        // Оновлюємо існуючі налаштування
        await restaurantDb.update(existingSettings[0]._id!, 'qr-settings', settings);
      } else {
        // Створюємо нові налаштування
        await restaurantDb.create('qr-settings', settings);
      }

      return res.status(200).json({ 
        message: 'Налаштування QR-коду збережено',
        settings 
      });
    }

    res.setHeader('Allow', ['GET', 'PUT']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);

  } catch (error) {
    console.error('Помилка роботи з налаштуваннями QR-коду:', error);
    return res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Не вдалося обробити запит' 
    });
  }
}
