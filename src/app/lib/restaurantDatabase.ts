// src/app/lib/restaurantDatabase.ts - Допоміжні функції для роботи з новою структурою БД
import { Db, ObjectId } from 'mongodb';
import { connectDatabase } from './database';
import slugify from 'slugify';

export interface RestaurantData {
  _id?: ObjectId;
  type: 'restaurant-info' | 'category' | 'menu-item' | 'theme' | 'photo' | 'settings';
  data: Record<string, unknown>;
  order?: number;
  createdAt: Date;
  updatedAt: Date;
}

export class RestaurantDatabase {
  private db: Db;
  private restaurantSlug: string;

  constructor(db: Db, restaurantSlug: string) {
    this.db = db;
    this.restaurantSlug = restaurantSlug;
  }

  // Отримати колекцію ресторану
  getCollection() {
    return this.db.collection(this.restaurantSlug);
  }

  // Створити новий запис
  async create(type: RestaurantData['type'], data: Record<string, unknown>, order?: number) {
    const collection = this.getCollection();
    
    const newItem: RestaurantData = {
      type,
      data,
      order: order || (await collection.countDocuments({ type })) + 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await collection.insertOne(newItem);
    return { ...newItem, _id: result.insertedId };
  }

  // Отримати всі записи певного типу
  async getByType(type: RestaurantData['type']) {
    const collection = this.getCollection();
    return await collection.find({ type }).sort({ order: 1 }).toArray();
  }

  // Отримати один запис за ID
  async getById(id: string) {
    const collection = this.getCollection();
    return await collection.findOne({ _id: new ObjectId(id) });
  }

  // Оновити запис
  async update(id: string, data: Record<string, unknown>) {
    const collection = this.getCollection();
    return await collection.updateOne(
      { _id: new ObjectId(id) },
      { 
        $set: { 
          data,
          updatedAt: new Date() 
        } 
      }
    );
  }

  // Видалити запис
  async delete(id: string) {
    const collection = this.getCollection();
    return await collection.deleteOne({ _id: new ObjectId(id) });
  }

  // Оновити порядок записів
  async updateOrder(items: { id: string; order: number }[]) {
    const collection = this.getCollection();
    const bulkOps = items.map(item => ({
      updateOne: {
        filter: { _id: new ObjectId(item.id) },
        update: { $set: { order: item.order, updatedAt: new Date() } }
      }
    }));

    return await collection.bulkWrite(bulkOps);
  }

  // Отримати інформацію про ресторан
  async getRestaurantInfo() {
    const collection = this.getCollection();
    return await collection.findOne({ type: 'restaurant-info' });
  }

  // Отримати меню-елементи за категорією
  async getMenuItemsByCategory(categoryId: string) {
    const collection = this.getCollection();
    return await collection.find({ 
      type: 'menu-item',
      'data.categoryId': categoryId 
    }).sort({ order: 1 }).toArray();
  }

  // Отримати всі меню-елементи
  async getAllMenuItems() {
    const collection = this.getCollection();
    return await collection.find({ type: 'menu-item' }).sort({ order: 1 }).toArray();
  }
}

// Статичні функції для роботи з ресторанами
export class RestaurantManager {
  // Отримати slug ресторану за ID
  static async getRestaurantSlug(restaurantId: string): Promise<string | null> {
    const { db } = await connectDatabase();
    const restaurantsCollection = db.collection('restaurants');
    const restaurant = await restaurantsCollection.findOne({ _id: new ObjectId(restaurantId) });
    return restaurant?.slug || null;
  }

  // Створити новий ресторан
  static async createRestaurant(name: string, userId: string) {
    const { db } = await connectDatabase();
    const restaurantsCollection = db.collection('restaurants');
    
    const slug = slugify(name, { lower: true });
    
    // Перевіряємо унікальність slug
    const existingRestaurant = await restaurantsCollection.findOne({ slug });
    if (existingRestaurant) {
      throw new Error(`Ресторан зі slug "${slug}" вже існує`);
    }

    const result = await restaurantsCollection.insertOne({
      name,
      slug,
      userId: new ObjectId(userId),
      createdAt: new Date(),
    });

    if (result.insertedId) {
      // Створюємо колекцію ресторану та базову інформацію
      const restaurantDb = new RestaurantDatabase(db, slug);
      await restaurantDb.create('restaurant-info', {
        name,
        slug,
        userId: new ObjectId(userId),
        createdAt: new Date(),
      });

      return {
        restaurantId: result.insertedId.toString(),
        slug,
        name
      };
    }

    throw new Error('Не вдалося створити ресторан');
  }

  // Отримати екземпляр RestaurantDatabase
  static async getRestaurantDatabase(restaurantId: string): Promise<RestaurantDatabase> {
    const { db } = await connectDatabase();
    const slug = await this.getRestaurantSlug(restaurantId);
    
    if (!slug) {
      throw new Error('Ресторан не знайдено');
    }

    return new RestaurantDatabase(db, slug);
  }

  // Знайти ресторан за категорією
  static async findRestaurantByCategory(categoryId: string): Promise<string | null> {
    const { db } = await connectDatabase();
    const restaurantsCollection = db.collection('restaurants');
    
    // Отримуємо всі ресторани і перевіряємо, в якому є ця категорія
    const restaurants = await restaurantsCollection.find({}).toArray();
    
    for (const restaurant of restaurants) {
      const restaurantDb = new RestaurantDatabase(db, restaurant.slug);
      const category = await restaurantDb.getCollection().findOne({ 
        type: 'category',
        _id: new ObjectId(categoryId)
      });
      
      if (category) {
        return restaurant._id.toString();
      }
    }
    
    return null;
  }
}
