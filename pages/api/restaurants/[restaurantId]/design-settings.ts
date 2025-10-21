// pages/api/restaurants/[restaurantId]/design-settings.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { RestaurantManager } from '../../../../src/app/lib/restaurantDatabase';

export interface DesignSettings extends Record<string, unknown> {
  theme: {
    id: string;
    name: string;
    colors: {
      primary: string;
      secondary: string;
      accent: string;
      background: string;
      surface: string;
      text: string;
    };
  };
  layout: {
    borderRadius: 'minimal' | 'medium' | 'large';
    padding: 'compact' | 'normal' | 'spacious';
    shadow: 'minimal' | 'normal' | 'dramatic';
  };
  restaurantName: string;
  updatedAt: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { restaurantId } = req.query;

  if (!restaurantId || typeof restaurantId !== 'string') {
    return res.status(400).json({ error: 'Restaurant ID is required' });
  }

  switch (req.method) {
    case 'GET':
      try {
        const restaurantDb = await RestaurantManager.getRestaurantDatabase(restaurantId);
        const settings = await restaurantDb.getByType('design-settings');

        if (!settings || settings.length === 0) {
          // Повертаємо дефолтні налаштування
          const defaultSettings: DesignSettings = {
            theme: {
              id: 'modern',
              name: 'Модерн',
              colors: {
                primary: '#1976d2',
                secondary: '#424242',
                accent: '#ff4081',
                background: '#e3f2fd',
                surface: '#ffffff',
                text: '#333333'
              }
            },
            layout: {
              borderRadius: 'medium',
              padding: 'normal',
              shadow: 'normal'
            },
            restaurantName: 'Назва ресторану',
            updatedAt: new Date().toISOString()
          };
          return res.status(200).json(defaultSettings);
        }
        
        // Повертаємо перший (і єдиний) запис налаштувань дизайну
        return res.status(200).json(settings[0].data);
      } catch (error) {
        console.error('Error fetching design settings:', error);
        return res.status(500).json({ error: 'Failed to fetch design settings' });
      }

    case 'PUT':
      try {
        const updatedSettings: DesignSettings = {
          ...req.body,
          updatedAt: new Date().toISOString()
        };

        // Валідація даних
        if (!updatedSettings.theme || !updatedSettings.layout) {
          return res.status(400).json({ error: 'Invalid design settings format' });
        }

        const restaurantDb = await RestaurantManager.getRestaurantDatabase(restaurantId);
        
        // Перевіряємо чи є вже налаштування дизайну
        const existingSettings = await restaurantDb.getByType('design-settings');
        
        if (existingSettings && existingSettings.length > 0) {
          // Оновлюємо існуючі налаштування
          const result = await restaurantDb.update(existingSettings[0]._id!.toString(), updatedSettings);
          
          console.log('Design settings updated:', {
            restaurantId,
            settingsId: existingSettings[0]._id,
            modifiedCount: result.modifiedCount
          });

          return res.status(200).json({
            success: true,
            message: 'Design settings updated successfully',
            data: updatedSettings,
            result: {
              modifiedCount: result.modifiedCount
            }
          });
        } else {
          // Створюємо нові налаштування
          const result = await restaurantDb.create('design-settings', updatedSettings);
          
          console.log('Design settings created:', {
            restaurantId,
            settingsId: result._id
          });

          return res.status(200).json({
            success: true,
            message: 'Design settings created successfully',
            data: updatedSettings,
            result: {
              insertedId: result._id
            }
          });
        }
      } catch (error) {
        console.error('Error saving design settings:', error);
        return res.status(500).json({ error: 'Failed to save design settings' });
      }

    case 'DELETE':
      try {
        const restaurantDb = await RestaurantManager.getRestaurantDatabase(restaurantId);
        const existingSettings = await restaurantDb.getByType('design-settings');
        
        if (existingSettings && existingSettings.length > 0) {
          const result = await restaurantDb.delete(existingSettings[0]._id!.toString());
          
          console.log('Design settings deleted:', {
            restaurantId,
            settingsId: existingSettings[0]._id,
            deletedCount: result.deletedCount
          });

          return res.status(200).json({
            success: true,
            message: 'Design settings deleted successfully',
            deletedCount: result.deletedCount
          });
        } else {
          return res.status(200).json({
            success: true,
            message: 'No design settings found to delete',
            deletedCount: 0
          });
        }
      } catch (error) {
        console.error('Error deleting design settings:', error);
        return res.status(500).json({ error: 'Failed to delete design settings' });
      }

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
