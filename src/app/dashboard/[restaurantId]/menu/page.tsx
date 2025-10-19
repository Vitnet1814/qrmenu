"use client";
import React from 'react';
import MenuBanner from '../../../components/menu/MenuBanner';
import CategoryList from '../../../components/menu/CategoryList';
import { useParams } from 'next/navigation';

const MenuPage = () => {
  const params = useParams();
  const restaurantId = params?.restaurantId as string;

  return (
    <div>
      <MenuBanner restaurantId={restaurantId} />
      <CategoryList />
      {/* <MenuList /> */}
      {/* Модальні вікна будемо рендерити умовно, залежно від стану */}
    </div>
  );
};

export default MenuPage;