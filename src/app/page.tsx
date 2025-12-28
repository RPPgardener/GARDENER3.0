// frontend/src/app/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/dashboard');
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-600">
      <div className="text-center text-white">
        <div className="text-4xl font-bold mb-2">🌿</div>
        <h1 className="text-2xl font-bold">GARDENER3.0</h1>
        <p className="text-sm mt-2">Cargando...</p>
      </div>
    </div>
  );
}