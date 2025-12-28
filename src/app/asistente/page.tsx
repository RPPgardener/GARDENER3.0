// frontend/src/app/asistente/page.tsx
'use client';

import React, { useState } from 'react';
import MobileLayout from '@/components/mobile/MobileLayout';
import { Send } from 'lucide-react';

export default function AsistentePage() {
  const [messages, setMessages] = useState([
    { type: 'ai', text: '¡Hola! Soy tu asistente de jardinería. ¿En qué puedo ayudarte hoy?' }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = { type: 'user', text: input };
    const aiResponse = {
      type: 'ai',
      text: 'Estoy analizando tu consulta sobre jardinería. En producción, aquí se conectaría con la API del backend para obtener respuestas personalizadas basadas en tu región y experiencia.'
    };

    setMessages([...messages, userMessage, aiResponse]);
    setInput('');
  };

  return (
    <MobileLayout activeTab="ai">
      <div className="flex flex-col h-[calc(100vh-8rem)]">
        {/* Mensajes */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  msg.type === 'user'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-900'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 bg-white border-t border-gray-200">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Pregunta sobre jardinería..."
              className="flex-1 px-4