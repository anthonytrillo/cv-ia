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

- **Frontend**: React 18 + TypeScript + Vite
- **Estado**: Zustand (gestión de estado ligero)
- **Formularios**: React Hook Form + Zod (validación)
- **Estilos**: CSS Modules + Variables CSS personalizadas
- **Iconos**: Lucide React
- **UI**: Componentes reutilizables con diseño system
- **PDF**: @react-pdf/renderer para generación de PDFs

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

### Instalación
```bash
# Clonar el repositorio
git clone <repository-url>
cd cv-ia/frontend

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

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── ui/           # Componentes base reutilizables
│   │   ├── Button/
│   │   ├── Input/
│   │   ├── Textarea/
│   │   └── Card/
│   ├── forms/        # Formularios específicos
│   │   └── CVWizard/
│   ├── cv/           # Componentes de preview del CV
│   │   └── CVPreview/
│   └── layout/       # Layout components
├── hooks/            # Custom hooks
├── services/         # API calls y servicios
├── types/            # TypeScript interfaces
├── utils/            # Funciones utilitarias
├── store/            # Estado global (Zustand)
└── styles/           # CSS Modules y estilos globales
    ├── globals.css   # Estilos globales
    ├── variables.css # Variables CSS custom
    └── components/   # CSS Modules por componente
```

## 🎯 Funcionalidades Implementadas

- [x] Generación de PDF
- [x] Vista previa en tiempo real
- [x] Formulario paso a paso
- [x] Diseño responsive

## 🎯 Próximas Funcionalidades

- [ ] Múltiples templates de CV
- [ ] Sistema de autenticación
- [ ] Guardado permanente de CVs
- [ ] Compartir CV por link público
- [ ] Exportar en diferentes formatos
- [ ] Integración con LinkedIn
- [ ] Sugerencias de contenido con IA

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Contacto

Para preguntas o soporte, por favor abre un issue en el repositorio.

---

**Nota**: Este es un MVP (Minimum Viable Product) diseñado para lanzamiento rápido. La aplicación está optimizada para velocidad de desarrollo manteniendo buenas prácticas para facilitar futuras expansiones.
