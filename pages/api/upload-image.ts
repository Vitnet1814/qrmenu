import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import path from 'path';
import fs from 'fs/promises';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';

export const config = {
  api: {
    bodyParser: false, // Відключаємо стандартний bodyParser Next.js
  },
};

const saveFile = async (file: formidable.File): Promise<string | null> => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (!allowedTypes.includes(file.mimetype || '')) {
    console.error(`Непідтримуваний тип файлу: ${file.mimetype}`);
    return null;
  }

  const MAX_FILE_SIZE = 1024 * 1024; // 1MB
  if (file.size > MAX_FILE_SIZE) {
    console.error(`Файл завеликий: ${file.size} > ${MAX_FILE_SIZE}`);
    return null;
  }

  const fileExtension = path.extname(file.originalFilename || '');
  const newFilename = `${uuidv4()}${fileExtension}`;
  const uploadPath = path.join(process.cwd(), 'public', 'image_public', newFilename);

  try {
    await fs.copyFile(file.filepath, uploadPath);
    return `/image_public/${newFilename}`;
  } catch (error) {
    console.error('Помилка збереження файлу:', error);
    return null;
  } finally {
    await fs.unlink(file.filepath); // Видаляємо тимчасовий файл
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const form = formidable({});

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Помилка обробки форми:', err);
        return res.status(500).json({ error: 'Помилка завантаження файлу.' });
      }

      const imageFile = Array.isArray(files.image) ? files.image[0] : files.image;

      if (imageFile) {
        const imageUrl = await saveFile(imageFile);
        if (imageUrl) {
          try {
            const imagePath = path.join(process.cwd(), 'public', imageUrl);
            const fileExtension = path.extname(imagePath);
            const newFilenameSharp = `${uuidv4()}_resized${fileExtension}`;
            const resizedImagePath = path.join(process.cwd(), 'public', 'image_public', newFilenameSharp);

            await sharp(imagePath)
              .resize(800, 1067, { fit: 'cover' }) // Примусове співвідношення 3:4
              .toFile(resizedImagePath); // Зберігаємо в новий файл

            // Після успішної обробки повертаємо URL нового файлу
            const resizedImageUrl = `/image_public/${newFilenameSharp}`;
            return res.status(200).json({ url: resizedImageUrl });

          } catch (sharpError) {
            console.error('Помилка обробки зображення sharp:', sharpError);
            await fs.unlink(path.join(process.cwd(), 'public', imageUrl)); // Видаляємо початковий завантажений файл
            return res.status(500).json({ error: 'Помилка обробки зображення.' });
          }
        } else {
          return res.status(400).json({ error: 'Не вдалося зберегти файл.' });
        }
      } else {
        return res.status(400).json({ error: 'Будь ласка, завантажте зображення.' });
      }
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
export default handler;