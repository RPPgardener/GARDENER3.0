// frontend/src/app/jardines/page.tsx
'use client';

import React from 'react';
import MobileLayout from '@/components/mobile/MobileLayout';
import { MapPin, TreeDeciduous } from 'lucide-react';

export default function JardinesPage() {
  return (
    <MobileLayout activeTab="home">
      <div className="p-4 space-y-4">
        <h2 className="text-xl font-bold text-gray-900">Jardines</h2>
        
        <div className="space-y-3">
          <GardenCard
            name="Jardín Ana Martínez"
            address="Calle Real 45, Valencia"
            size="180m²"
            species={4}
          />
          <GardenCard
            name="Parque Municipal Norte"
            address="Plaza Mayor, Valencia"
            size="2.500m²"
            species={15}
          />
        </div>
      </div>
    </MobileLayout>
  );
}

function GardenCard({ name, address, size, species }: any) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <h3 className="font-semibold text-gray-900 mb-2">{name}</h3>
      <div className="flex items-center text-sm text-gray-600 mb-1">
        <MapPin size={14} className="mr-1" />
        {address}
      </div>
      <div className="flex gap-4 text-sm text-gray-600 mt-2">
        <span>📏 {size}</span>
        <span className="flex items-center">
          <TreeDeciduous size={14} className="mr-1" />
          {species} especies
        </span>
      </div>
    </div>
  );
}