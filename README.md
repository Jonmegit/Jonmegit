# Mini Gestión de Tareas

Proyecto de ejemplo con backend en Node.js/Express y frontend en React.

## Backend
- Express + SQLite
- Autenticación con JWT
- Validación con Zod
- Tests con Jest

### Comandos
```bash
cd backend
npm install
npm run seed
npm run dev
npm test
```

## Frontend
- Vite + React + Zustand
- Tailwind CSS
- Tests con Vitest

### Comandos
```bash
cd frontend
npm install
npm run dev
npm test
```

## ETL BOE Administradores Concursales

En la carpeta `edictos` se incluye un ejemplo sencillo de ETL en Python que descarga el feed del BOE, filtra los nombramientos de administradores concursales y da de alta oportunidades en Odoo mediante XML-RPC.

### Comandos
```bash
cd edictos
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
pytest
```
