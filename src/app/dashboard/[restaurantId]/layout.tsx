// app/dashboard/[restaurantId]/layout.tsx
import React, { ReactNode } from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../pages/api/auth/[...nextauth]';
import { connectDatabase } from '../../lib/database';
import { ObjectId } from 'mongodb';
import RestaurantDashboardClientLayout from '../../components/RestaurantDashboardClientLayout';
import { redirect } from 'next/navigation';

interface RestaurantDashboardLayoutProps {
  children: ReactNode;
  params: { restaurantId: string };
}

async function RestaurantDashboardLayout({ children, params }: RestaurantDashboardLayoutProps) {
  const session = await getServerSession(authOptions);
  // Спробуємо обернути params в Promise.resolve() та await
  const { restaurantId } = await Promise.resolve(params);

  if (!session?.user?.id) {
    redirect('/');
  }

  try {
    const { db } = await connectDatabase();
    const restaurantsCollection = db.collection('restaurants');

    const restaurant = await restaurantsCollection.findOne({
      _id: new ObjectId(restaurantId),
      userId: new ObjectId(session.user.id),
    });

    if (!restaurant) {
      redirect('/dashboard');
    }

    return (
      <RestaurantDashboardClientLayout restaurantId={restaurantId}>
        {children}
      </RestaurantDashboardClientLayout>
    );
  } catch (error) {
    console.error('Error checking restaurant ownership:', error);
    redirect('/dashboard');
  }
}
export default RestaurantDashboardLayout;