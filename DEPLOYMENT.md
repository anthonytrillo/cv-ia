# Despliegue en GitHub Pages

Este proyecto está configurado para desplegarse automáticamente en GitHub Pages.

## Configuración Automática

El proyecto incluye un workflow de GitHub Actions que se ejecuta automáticamente cuando:
- Se hace push a la rama `main`
- Se crea un Pull Request a la rama `main`

## Pasos para el Despliegue

### 1. Habilitar GitHub Pages

1. Ve a tu repositorio en GitHub
2. Ve a **Settings** → **Pages**
3. En **Source**, selecciona **GitHub Actions**
4. Guarda los cambios

### 2. Configurar el Repositorio

Asegúrate de que tu repositorio tenga la siguiente estructura:
```
cv-ia/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── frontend/
│   ├── package.json
│   ├── vite.config.ts
│   └── ...
└── README.md
```

### 3. Despliegue Automático

Una vez configurado, cada vez que hagas push a la rama `main`, el proyecto se desplegará automáticamente en:
```
https://[tu-usuario].github.io/cv-ia/
```

## Despliegue Manual

Si prefieres desplegar manualmente:

1. Instala gh-pages:
```bash
cd frontend
npm install --save-dev gh-pages
```

2. Ejecuta el deploy:
```bash
npm run deploy
```

## Configuración del Proyecto

El proyecto está configurado con:
- **Base URL**: `/cv-ia/` (para GitHub Pages)
- **Build output**: `dist/`
- **Framework**: React + Vite + TypeScript

## Troubleshooting

### Problemas Comunes

1. **404 en rutas**: Asegúrate de que la base URL esté configurada correctamente en `vite.config.ts`
2. **Build falla**: Verifica que todas las dependencias estén instaladas
3. **Deploy no se ejecuta**: Revisa que el workflow esté en la rama correcta

### Logs

Puedes ver los logs del despliegue en:
- **Actions** → **Deploy to GitHub Pages** → **build-and-deploy**

## Personalización

Para cambiar la URL base, modifica `vite.config.ts`:
```typescript
base: process.env.NODE_ENV === 'production' ? '/tu-repo-name/' : '/',
``` 