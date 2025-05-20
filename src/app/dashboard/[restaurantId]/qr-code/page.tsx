"use client";
// app/dashboard/[restaurantId]/qr-code/page.tsx
import React from 'react';
import { useParams } from 'next/navigation';
interface Params {
  restaurantId: string;
  [key: string]: string | string[]; // Add index signature to match Next.js expected type
}

const QRCodePage = () => {
  const params = useParams<Params>(); // Get params
  const restaurantId = params?.restaurantId; // Optional chaining to handle null

  if (!restaurantId) {
    return <div>Error: Restaurant ID not found</div>;
  }

  return (
    <div>
      <h2>QR-код для закладу: {restaurantId}</h2>
      {/* Тут буде відображення та можливість завантажити QR-код */}
    </div>
  );
};

export default QRCodePage;