"use client";

import React from 'react';
import { PencilIcon, TrashIcon, ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline';

interface MenuItemProps {
  item: { _id: string; name: string; price: number; image?: string };
  onEdit: (item: { _id: string; name: string; price: number; image?: string }) => void;
  onDelete: (item: { _id: string; name: string }) => void;
}

const MenuItem = ({ item, onEdit, onDelete }: MenuItemProps) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '10px', borderBottom: '1px solid #eee' }}>
      {item.image && (
        <img src={item.image} alt={item.name} style={{ width: '80px', height: '80px', marginRight: '10px', objectFit: 'cover', borderRadius: '5px' }} />
      )}
      <div style={{ flexGrow: 1 }}>
        <div style={{ fontWeight: 'bold' }}>{item.name}</div>
        <div>{item.price}₴</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <button onClick={() => console.log('Move up item', item._id)} style={{ marginRight: '5px', cursor: 'pointer' }}>
          <ArrowUpIcon style={{ width: '24px', height: '24px' }} />
        </button>
        <button onClick={() => console.log('Move down item', item._id)} style={{ marginRight: '5px', cursor: 'pointer' }}>
          <ArrowDownIcon style={{ width: '24px', height: '24px' }} />
        </button>
        <button onClick={() => onEdit(item)} style={{ marginRight: '5px', cursor: 'pointer' }}>
          <PencilIcon style={{ width: '24px', height: '24px' }} />
        </button>
        <button onClick={() => onDelete({ _id: item._id, name: item.name })} style={{ cursor: 'pointer' }}>
          <TrashIcon style={{ width: '24px', height: '24px' }} />
        </button>
      </div>
    </div>
  );
};

export default MenuItem;