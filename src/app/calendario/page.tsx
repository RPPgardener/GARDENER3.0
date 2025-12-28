```typescript
// frontend/src/app/calendario/page.tsx
'use client';

import React from 'react';
import MobileLayout from '@/components/mobile/MobileLayout';

export default function CalendarioPage() {
  return (
    <MobileLayout activeTab="calendar">
      <div className="p-4 space-y-4">
        <h2 className="text-xl font-bold text-gray-900">Calendario</h2>

        <div className="bg-white rounded-lg p-6 border border-gray-200 text-center text-gray-500">
          Vista de calendario próximamente
        </div>
      </div>
    </MobileLayout>
  );
}
```
```typescript
// frontend/src/components/mobile/BottomNav.tsx
import React from 'react';
import { Home, ClipboardList, MessageSquare, Calendar, User } from 'lucide-react';

interface NavButtonProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  badge?: number;
  highlight?: boolean;
  href: string;
}

export default function BottomNav({ activeTab }: { activeTab: string }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-inset-bottom z-40">
      <div className="flex justify-around items-center h-16">
        <NavButton
          icon={<Home size={20} />}
          label="Inicio"
          href="/dashboard"
          active={activeTab === 'home'}
        />
        <NavButton
          icon={<ClipboardList size={20} />}
          label="Trabajos"
          href="/trabajos"
          active={activeTab === 'works'}
          badge={5}
        />
        <NavButton
          icon={<MessageSquare size={24} />}
          label="IA"
          href="/asistente"
          active={activeTab === 'ai'}
          highlight={true}
        />
        <NavButton
          icon={<Calendar size={20} />}
          label="Agenda"
          href="/calendario"
          active={activeTab === 'calendar'}
        />
        <NavButton
          icon={<User size={20} />}
          label="Perfil"
          href="/perfil"
          active={activeTab === 'profile'}
        />
      </div>
    </nav>
  );
}

function NavButton({ icon, label, active, badge, highlight, href }: NavButtonProps) {
  return (
    
      href={href}
      className={`
        flex flex-col items-center justify-center
        flex-1 h-full
        text-xs font-medium
        transition-colors
        ${active ? 'text-green-600' : 'text-gray-500'}
        ${highlight ? 'relative' : ''}
      `}
    >
      <div className="relative">
        <div className={`${highlight ? 'bg-green-600 text-white p-2 rounded-full -mt-6 shadow-lg' : ''}`}>
          {React.cloneElement(icon as React.ReactElement, {
            strokeWidth: active ? 2.5 : 2
          })}
        </div>
        {badge && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
            {badge}
          </span>
        )}
      </div>
      <span className={`mt-1 ${highlight ? 'mt-2' : ''}`}>{label}</span>
    </a>
  );
}
```
```typescript
// frontend/src/components/mobile/MobileLayout.tsx
import React from 'react';
import BottomNav from './BottomNav';
import { Leaf, Bell } from 'lucide-react';

interface MobileLayoutProps {
  children: React.ReactNode;
  activeTab: string;
}

export default function MobileLayout({ children, activeTab }: MobileLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-green-600 text-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Leaf size={24} />
          <div>
            <h1 className="font-bold text-lg">GARDENER3.0</h1>
            <p className="text-xs text-green-100">Jardinería Profesional</p>
          </div>
        </div>
        <button className="p-2 hover:bg-green-700 rounded-full">
          <Bell size={20} />
        </button>
      </header>

      {/* Contenido */}
      <main className="flex-1 overflow-y-auto pb-16">
        {children}
      </main>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} />
    </div>
  );
}
```
```typescript
// frontend/src/components/mobile/WorkCard.tsx
import React from 'react';
import { MapPin, Clock, CheckCircle, Activity } from 'lucide-react';

interface WorkCardProps {
  status: 'in-progress' | 'pending' | 'completed';
  title: string;
  location: string;
  time: string;
  progress?: number;
  urgent?: boolean;
}

export default function WorkCard({ status, title, location, time, progress, urgent }: WorkCardProps) {
  const statusConfig = {
    'in-progress': {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      icon: <Activity className="text-blue-600" size={20} />
    },
    'pending': {
      bg: 'bg-gray-50',
      border: 'border-gray-200',
      icon: <Clock className="text-gray-600" size={20} />
    },
    'completed': {
      bg: 'bg-green-50',
      border: 'border-green-200',
      icon: <CheckCircle className="text-green-600" size={20} />
    }
  };

  const config = statusConfig[status];

  return (
    <div className={`${config.bg} ${config.border} border-l-4 rounded-lg p-4`}>
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          {config.icon}
          <h3 className="font-semibold text-gray-900">{title}</h3>
        </div>
        {urgent && (
          <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded-full">
            URGENTE
          </span>
        )}
      </div>

      <div className="flex items-center text-sm text-gray-600 mb-1">
        <MapPin size={14} className="mr-1" />
        {location}
      </div>

      <div className="flex items-center text-sm text-gray-600">
        <Clock size={14} className="mr-1" />
        {time}
      </div>

      {progress !== undefined && (
        <div className="mt-3">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-gray-600">Progreso</span>
            <span className="font-semibold text-blue-600">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      <div className="flex gap-2 mt-3">
        <button className="flex-1 bg-white border border-gray-300 text-gray-700 py-2 rounded-lg text-sm font-medium active:bg-gray-50">
          Ver detalles
        </button>
        {status === 'in-progress' && (
          <button className="flex-1 bg-green-600 text-white py-2 rounded-lg text-sm font-medium active:bg-green-700">
            Finalizar
          </button>
        )}
        {status === 'pending' && (
          <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-medium active:bg-blue-700">
            Iniciar
          </button>
        )}
      </div>
    </div>
  );
}
```
```typescript
// frontend/src/components/InstallPrompt.tsx
'use client';

import React, { useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      setShowPrompt(false);
    }

    setDeferredPrompt(null);
  };

  if (!showPrompt || !deferredPrompt) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 bg-green-600 text-white p-4 rounded-lg shadow-lg z-50">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="font-semibold">Instalar GARDENER3.0</h3>
          <p className="text-sm text-green-100">
            Accede rápido desde tu pantalla de inicio
          </p>
        </div>
        <div className="flex gap-2 ml-4">
          <button
            onClick={() => setShowPrompt(false)}
            className="px-3 py-1 bg-green-700 rounded text-sm hover:bg-green-800"
          >
            Ahora no
          </button>
          <button
            onClick={handleInstall}
            className="px-3 py-1 bg-white text-green-600 rounded text-sm font-semibold hover:bg-gray-100"
          >
            Instalar
          </button>
        </div>
      </div>
    </div>
  );
}
```
```typescript
// frontend/src/lib/utils.ts
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```
```env
// frontend/.env.local
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_APP_NAME=GARDENER3.0
NEXT_PUBLIC_APP_VERSION=1.0.0
```

---

# ARCHIVOS DEL BACKEND
```txt
// backend/requirements.txt
fastapi==0.109.0
uvicorn[standard]==0.27.0
sqlalchemy==2.0.25
psycopg2-binary==2.9.9
pydantic==2.5.3
pydantic-settings==2.1.0
python-dotenv==1.0.0
python-jose[cryptography]==3.3.0
passlib[bcrypt]==1.7.4
python-multipart==0.0.6
anthropic==0.18.1
requests==2.31.0
```
```python
// backend/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1 import clients, gardens, works, ai, species
from app.core.config import settings

app = FastAPI(
    title="GARDENER3.0 API",
    description="API profesional de jardinería con IA - Autor: GPT-RPP",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(clients.router, prefix="/api/v1/clients", tags=["clients"])
app.include_router(gardens.router, prefix="/api/v1/gardens", tags=["gardens"])
app.include_router(works.router, prefix="/api/v1/works", tags=["works"])
app.include_router(ai.router, prefix="/api/v1/ai", tags=["ai"])
app.include_router(species.router, prefix="/api/v1/species", tags=["species"])

@app.get("/")
async def root():
    return {
        "app": "GARDENER3.0 API",
        "version": "1.0.0",
        "author": "GPT-RPP",
        "status": "running"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
```
```python
// backend/app/__init__.py
"""
GARDENER3.0 Backend API
Autor: GPT-RPP
Sistema profesional de gestión de jardinería con IA
"""
__version__ = "1.0.0"
__author__ = "GPT-RPP"
```
```python
// backend/app/core/config.py
from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    # App
    APP_NAME: str = "GARDENER3.0"
    APP_VERSION: str = "1.0.0"
    AUTHOR: str = "GPT-RPP"
    
    # Database
    DATABASE_URL: str = "postgresql://user:password@localhost:5432/gardener"
    
    # Security
    SECRET_KEY: str = "your-secret-key-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # CORS
    ALLOWED_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://localhost:3001",
        "https://yourdomain.com"
    ]
    
    # AI
    ANTHROPIC_API_KEY: str = ""
    
    class Config:
        env_file = ".env"

settings = Settings()
```
```python
// backend/app/core/database.py
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from app.core.config import settings

engine = create_engine(settings.DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```
```python
// backend/app/models/__init__.py
from app.models.operational.client import Client
from app.models.operational.garden import Garden
from app.models.operational.work import Work
from app.models.botanical.species import Species
```
```python
// backend/app/models/operational/client.py
from sqlalchemy import Column, Integer, String, DateTime, Boolean
from app.core.database import Base
from datetime import datetime

class Client(Base):
    __tablename__ = "clients"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(200), nullable=False)
    email = Column(String(200))
    phone = Column(String(50))
    address = Column(String(500))
    city = Column(String(100))
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
```
```python
// backend/app/api/v1/clients.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.models.operational.client import Client
from app.schemas.client import ClientCreate, ClientResponse

router = APIRouter()

@router.get("/", response_model=List[ClientResponse])
def list_clients(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    clients = db.query(Client).offset(skip).limit(limit).all()
    return clients

@router.post("/", response_model=ClientResponse, status_code=201)
def create_client(client: ClientCreate, db: Session = Depends(get_db)):
    db_client = Client(**client.dict())
    db.add(db_client)
    db.commit()
    db.refresh(db_client)
    return db_client
```
```python
// backend/app/schemas/client.py
from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

class ClientBase(BaseModel):
    name: str
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None

class ClientCreate(ClientBase):
    pass

class ClientResponse(ClientBase):
    id: int
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True
```
```env
// backend/.env
DATABASE_URL=postgresql://user:password@localhost:5432/gardener
SECRET_KEY=your-secret-key-here-change-in-production
ANTHROPIC_API_KEY=your-anthropic-api-key
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
```

---

**INSTRUCCIONES DE INSTALACIÓN Y EJECUCIÓN:**

**Frontend (Next.js):**
```bash
cd frontend
npm install
npm run dev
# La app estará en http://localhost:3000
```

**Backend (FastAPI):**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # En Windows: venv\Scripts\activate
pip install -r requirements.txt
python main.py
# La API estará en http://localhost:8000
```

**Para instalar en Android:**
1. Desplegar frontend en HTTPS (Vercel, Netlify, etc.)
2. Abrir en Chrome Android
3. Menú → "Añadir a pantalla de inicio"
4. La app se instalará como PWA nativa