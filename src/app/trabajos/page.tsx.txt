// frontend/src/app/trabajos/page.tsx
'use client';

import React, { useState } from 'react';
import MobileLayout from '@/components/mobile/MobileLayout';
import WorkCard from '@/components/mobile/WorkCard';

export default function TrabajosPage() {
  const [activeFilter, setActiveFilter] = useState('all');

  return (
    <MobileLayout activeTab="works">
      <div className="p-4 space-y-4">
        <h2 className="text-xl font-bold text-gray-900">Trabajos</h2>

        {/* Filtros */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          <FilterChip 
            label="Todos" 
            count={12} 
            active={activeFilter === 'all'}
            onClick={() => setActiveFilter('all')}
          />
          <FilterChip 
            label="Pendientes" 
            count={5}
            active={activeFilter === 'pending'}
            onClick={() => setActiveFilter('pending')}
          />
          <FilterChip 
            label="En curso" 
            count={3}
            active={activeFilter === 'progress'}
            onClick={() => setActiveFilter('progress')}
          />
          <FilterChip 
            label="Completados" 
            count={4}
            active={activeFilter === 'completed'}
            onClick={() => setActiveFilter('completed')}
          />
        </div>

        {/* Lista de trabajos */}
        <div className="space-y-3">
          <WorkCard
            status="in-progress"
            title="Poda olivos"
            location="Jardín Ana Martínez"
            time="08:00 - 10:30"
            progress={70}
          />
          <WorkCard
            status="pending"
            title="Reparación riego"
            location="Jardín Municipio"
            time="15:00 - 17:00"
            urgent={true}
          />
          <WorkCard
            status="pending"
            title="Tratamiento rosales"
            location="Sra. García"
            time="17:00 - 18:30"
          />
          <WorkCard
            status="completed"
            title="Mantenimiento césped"
            location="Parque Central"
            time="Completado 11:30"
          />
        </div>
      </div>
    </MobileLayout>
  );
}

function FilterChip({ label, count, active, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
        active
          ? 'bg-green-600 text-white'
          : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
      }`}
    >
      {label} {count && `(${count})`}
    </button>
  );
}