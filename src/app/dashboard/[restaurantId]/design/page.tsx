"use client";
// app/dashboard/[restaurantId]/design/page.tsx
import { useParams } from 'next/navigation';

interface Params {
  restaurantId: string;
  [key: string]: string | string[]; // Add index signature to match Next.js expected type
}

const DesignSettingsPage = () => {
  const params = useParams<Params>(); // Get params
  const restaurantId = params?.restaurantId; // Optional chaining to handle null

  if (!restaurantId) {
    return <div>Error: Restaurant ID not found</div>;
  }

  return (
    <div>
      <h1>Restaurant ID: {restaurantId}</h1>
    </div>
  );
};

export default DesignSettingsPage;
