// frontend/src/app/dashboard/page.tsx
'use client';

import React, { useState } from 'react';
import MobileLayout from '@/components/mobile/MobileLayout';
import { Bell, ClipboardList, Clock, CheckCircle, Activity, MessageSquare, ChevronRight, MapPin } from 'lucide-react';
import WorkCard from '@/components/mobile/WorkCard';

export default function DashboardPage() {
  return (
    <MobileLayout activeTab="home">
      <div className="p-4 space-y-4">
        {/* Header con saludo */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Buenos días, Juan
            </h1>
            <p className="text-sm text-gray-500">
              Jueves, 26 Diciembre 2025
            </p>
          </div>
          <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
            <Bell size={20} />
          </button>
        </div>

        {/* Alerta crítica */}
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="bg-red-500 text-white p-1 rounded-full flex-shrink-0">
              <Bell size={16} />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-red-900">
                CRÍTICO: Árbol en riesgo
              </h3>
              <p className="text-sm text-red-700 mt-1">
                Parque Norte - Requiere atención inmediata
              </p>
              <button className="mt-2 px-3 py-1 bg-red-600 text-white rounded text-sm font-medium active:bg-red-700">
                Ver detalles
              </button>
            </div>
          </div>
        </div>

        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-2 gap-3">
          <QuickStat label="Trabajos hoy" value="12" icon={<ClipboardList size={20} />} color="blue" />
          <QuickStat label="Pendientes" value="5" icon={<Clock size={20} />} color="orange" />
          <QuickStat label="Completados" value="4" icon={<CheckCircle size={20} />} color="green" />
          <QuickStat label="En curso" value="3" icon={<Activity size={20} />} color="purple" />
        </div>

        {/* Trabajos de hoy */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-gray-900">
              Trabajos de hoy
            </h2>
            <a href="/trabajos" className="text-sm text-green-600 font-medium">
              Ver todos
            </a>
          </div>

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
          </div>
        </section>

        {/* Acceso rápido IA */}
        <button className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl p-4 shadow-lg flex items-center justify-between active:scale-95 transition-transform">
          <div className="flex items-center gap-3">
            <MessageSquare size={24} />
            <div className="text-left">
              <div className="font-semibold">Asistente IA</div>
              <div className="text-sm text-green-100">
                Pregúntame cualquier duda
              </div>
            </div>
          </div>
          <ChevronRight size={20} />
        </button>
      </div>
    </MobileLayout>
  );
}

function QuickStat({ label, value, icon, color }: any) {
  const colors: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-600 border-blue-200',
    orange: 'bg-orange-50 text-orange-600 border-orange-200',
    green: 'bg-green-50 text-green-600 border-green-200',
    purple: 'bg-purple-50 text-purple-600 border-purple-200',
  };

  return (
    <div className={`${colors[color]} border rounded-lg p-4`}>
      <div className="flex items-center justify-between mb-2">
        {icon}
        <div className="text-2xl font-bold">{value}</div>
      </div>
      <div className="text-sm">{label}</div>
    </div>
  );
}