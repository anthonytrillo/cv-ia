# Deploy en Render – Guía paso a paso

## Arquitectura

- **Backend** (Web Service): API con Groq → ya desplegado en `https://cv-builder-2jgx.onrender.com`
- **Frontend** (Static Site): App React → se despliega siguiendo estos pasos

---

## Paso 1: Crear el Static Site

1. Entrá a [dashboard.render.com](https://dashboard.render.com)
2. Clic en **New** → **Static Site**
3. Conectá el mismo repo de GitHub que usa el backend

---

## Paso 2: Configuración del Static Site

| Campo | Valor |
|-------|-------|
| **Name** | `cv-ia-frontend` (o el que prefieras) |
| **Root Directory** | `frontend` |
| **Build Command** | `yarn install && yarn build` |
| **Publish Directory** | `dist` |

---

## Paso 3: Variables de entorno

En **Environment** (en la misma pantalla o en Settings del servicio):

| Variable | Valor |
|----------|-------|
| `VITE_API_URL` | `https://cv-builder-2jgx.onrender.com` |
| `VITE_BASE` | `/` |

- `VITE_API_URL`: URL del backend para que el frontend llame al API
- `VITE_BASE`: base path para que la app funcione en la raíz del dominio de Render

---

## Paso 4: Deploy

1. Clic en **Create Static Site**
2. Render va a instalar dependencias y hacer el build
3. Cuando termine, vas a tener una URL tipo: `https://cv-ia-frontend.onrender.com`

---

## Paso 5: Configurar CORS en el backend

En el servicio del **backend**, en **Environment**, agregá:

| Variable | Valor |
|----------|-------|
| `FRONTEND_URL` | URL del frontend (ej: `https://cv-ia-frontend.onrender.com`) |

Sin `FRONTEND_URL` configurada, el navegador puede bloquear las peticiones al API por CORS.

---

## Paso 6: Verificar

1. Abrí la URL del frontend
2. Completá el formulario hasta "Resumen Profesional"
3. Escribí al menos 20 caracteres en el resumen
4. Clic en **Mejorar con IA**
5. La primera vez puede tardar ~30 s (cold start del backend)

---

## Resumen de URLs

- **Frontend:** `https://[tu-frontend].onrender.com`
- **Backend:** `https://cv-builder-2jgx.onrender.com`
