# Creador de CV Gratuito

Una aplicación web moderna para crear currículums vitae profesionales de forma gratuita. Los usuarios pueden introducir sus datos personales, formación y experiencia, y descargar un CV profesional en formato PDF.

## 🚀 Características

- **Formulario paso a paso**: Interfaz intuitiva que guía al usuario a través del proceso de creación
- **Vista previa en tiempo real**: Visualización del CV mientras se completa la información
- **Diseño profesional**: Basado en el template de ejemplo proporcionado
- **Responsive design**: Funciona perfectamente en dispositivos móviles y desktop
- **Sin registro**: No requiere autenticación para usar la aplicación
- **Gratuito**: Completamente gratuito sin limitaciones
- **Generación de PDF**: Descarga tu CV en formato PDF profesional

## 🛠️ Stack Tecnológico

### Frontend
- **React 18** + **TypeScript** + **Vite**
- **Zustand** (gestión de estado ligero)
- **React Hook Form** + **Zod** (validación)
- **CSS Modules** + Variables CSS personalizadas
- **Lucide React** (iconos)

### Backend (Próximamente)
- **NestJS** (backend API)
- **Supabase** (base de datos)
- **PDF Generation** (generación de PDFs)

## 📋 Estructura del CV

### Secciones incluidas:
1. **Información Personal**
   - Nombre completo
   - Email
   - LinkedIn
   - Teléfono
   - Título profesional

2. **Resumen Profesional**
   - Párrafo descriptivo de 2-3 líneas

3. **Habilidades**
   - Lista de competencias técnicas y blandas
   - Máximo 10 habilidades

4. **Experiencia Laboral**
   - Cargo
   - Empresa/Organización
   - Fechas (desde - hasta)
   - Descripción con logros cuantificables
   - Soporte para múltiples empleos

5. **Educación**
   - Título/Certificación
   - Institución
   - Fecha de finalización
   - Descripción opcional con puntos destacados

## 🎨 Diseño

El diseño está basado en un template profesional y limpio, con:
- Tipografía clara y legible
- Espaciado consistente
- Colores profesionales
- Layout responsive
- Accesibilidad optimizada

## 🚀 Instalación y Desarrollo

### Prerrequisitos
- Node.js 18+ 
- Yarn o npm

### Frontend
```bash
# Navegar al directorio frontend
cd frontend

# Instalar dependencias
yarn install

# Ejecutar en modo desarrollo
yarn dev
```

### Scripts disponibles
```bash
yarn dev          # Ejecutar en modo desarrollo
yarn build        # Construir para producción
yarn preview      # Previsualizar build de producción
yarn lint         # Ejecutar linter
```

## 🌐 Despliegue

### GitHub Pages (Gratuito)

Este proyecto está configurado para desplegarse automáticamente en GitHub Pages:

1. **Habilitar GitHub Pages**:
   - Ve a tu repositorio en GitHub
   - Settings → Pages → Source: GitHub Actions

2. **Despliegue automático**:
   - Cada push a `main` desplegará automáticamente
   - URL: `https://[tu-usuario].github.io/cv-ia/`

3. **Despliegue manual**:
```bash
cd frontend
npm install --save-dev gh-pages
npm run deploy
```

📖 **Ver [DEPLOYMENT.md](DEPLOYMENT.md) para instrucciones detalladas**

## 📁 Estructura del Proyecto

```