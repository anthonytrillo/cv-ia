# Análisis UX/UI y accesibilidad de botones

**Última actualización:** Mejoras aplicadas (aria-label en botones con icono, tamaños mínimos 40px, ThemeToggle, view toggle).

**Cambios ya aplicados en código:** estado loading del Button (spinner + `aria-busy`), Toast (contraste, área 44px, `aria-label`, `:focus-visible`), variante `danger` en Button y uso en modal "Eliminar todo", jerarquía del último paso ("Ver vista previa" como outline, "Descargar CV" como único primario).

---

## 1. Evaluación general de botones

El proyecto tiene **un único componente de botón** (`Button`) con variantes `primary`, `secondary`, `outline`, `sampleData` y `download`, más tamaños `sm`, `md`, `lg`. No existen componentes separados tipo CTA, SubmitButton o ActionButton; todo pasa por `Button`.

**Puntos fuertes:**
- Consistencia: un solo sistema de botones.
- Área táctil en móvil: `min-height: 44px` (variable `--touch-target-min`).
- Uso de `aria-label` en la mayoría de botones con icono (CVWizard, CVPreview).
- Jerarquía clara: primario (azul), outline (secundario), destructivo (rojo vía `.clearDataButton`).
- Estados: hover, active, disabled y focus-visible definidos en el componente.
- Labels en general descriptivos ("Descargar CV", "Ver vista previa", "Limpiar datos", "Eliminar todo").

**Puntos débiles:**
- Estado **loading** sin estilos: se usa `loading` y `spinner` en el JSX pero no existen las clases `.loading` ni `.spinner` en `Button.module.css`, por lo que el spinner no se ve.
- Botón de cierre del **Toast**: área pequeña y contraste del icono bajo (text-tertiary sobre fondo claro).
- **Tabs del header** (Formulario / Vista previa): son `<button>` nativos con estilos propios; no usan el componente `Button`, por lo que hay una pequeña inconsistencia visual.
- En **desktop** el tamaño `sm` baja a 32px de alto, por debajo del mínimo recomendado de 44px para usuarios que usen touch o con dificultades.
- Modal de confirmación: el botón destructivo "Eliminar todo" usa `variant="primary"` y se pinta de rojo solo por la clase `.clearDataButton`; semánticamente sería más claro una variante `danger` en el propio `Button`.

---

## 2. Problemas de contraste detectados

| Ubicación | Elemento | Problema | Sugerencia |
|-----------|----------|----------|------------|
| **Toast** | Botón cerrar (X) | Color `var(--text-tertiary)` (#9ca3af) sobre fondo claro. Contraste ~2.8:1, por debajo de 4.5:1 WCAG AA. | Usar `var(--text-secondary)` o `var(--text-primary)` para el icono, o fondo/contorno que asegure ≥4.5:1. |
| **View toggle (App)** | Tabs "Formulario" / "Vista previa" inactivos | Texto `--text-secondary` (#6b7280) sobre `--bg-secondary` (#f8f9fa). Contraste en el límite. | Aumentar contraste (p. ej. `--text-primary` para inactivos o fondo más diferenciado). |
| **ThemeToggle** | Icono luna/sol | `--text-secondary` sobre `--bg-card`. Aproximadamente 4.6:1; aceptable pero mejorable en modo oscuro. | Revisar en dark que icono/fondo mantengan ≥4.5:1. |

Resto de botones (primary, download, outline, sampleData, clearData): texto blanco sobre fondo saturado o texto oscuro sobre claro; contraste suficiente para texto normal y grande.

---

## 3. Problemas de jerarquía visual

| Problema | Dónde | Impacto |
|----------|--------|---------|
| **Dos botones primarios en último paso** | CVWizard: "Ver vista previa" y "Descargar CV" son ambos `variant="primary"`. | La acción principal (Descargar) no destaca más que la secundaria. |
| **Recomendación** | Último paso del wizard | Usar solo "Descargar CV" como primario (o más prominente) y "Ver vista previa" como `outline` o `secondary`. |
| **Destructivo con variante primary** | Modal "Eliminar todo" usa `variant="primary"` + clase que lo pinta de rojo. | Funciona visualmente pero mezcla semántica (primario = azul en el resto de la app). |
| **Recomendación** | Modal de confirmación | Introducir variante `danger` en `Button` y usarla aquí para consistencia y accesibilidad (nombre de rol/estado). |

Jerarquía en el resto de pantallas (Anterior outline, Siguiente/Descargar primario, Limpiar datos outline+rojo) es clara.

---

## 4. Problemas de claridad en labels

| Botón | Ubicación | Valoración | Sugerencia |
|-------|-----------|------------|------------|
| "Cancelar" | Modal eliminar datos | Aceptable en contexto de modal. | Opcional: "No, mantener datos" si se quiere máxima claridad. |
| "Agregar", "Agregar Experiencia", "Agregar Educación" | Formularios | Claros y con verbo de acción. | Mantener. |
| "Siguiente" / "Anterior" | Wizard | Claros. | Mantener. |
| "Datos de ejemplo" | CVPreview | Claro. | Mantener. |
| "Limpiar datos" | Wizard | Claro; el modal "Eliminar todo" lo refuerza. | Mantener. |

No se detectan labels ambiguos ("Aceptar", "OK", "Continuar" sin contexto). Los aria-labels añadidos (p. ej. "Descargar CV en PDF") mejoran la claridad para lectores de pantalla.

---

## 5. Problemas de tamaño o interacción

| Elemento | Problema | Dónde |
|----------|----------|--------|
| **Tamaño `sm` en desktop** | En `@media (min-width: 768px)`, `.sm` tiene `min-height: 32px`, por debajo de 44px. | Button.module.css |
| **Impacto** | Botones pequeños (quitar habilidad, quitar logro, X en toasts) pueden ser difíciles para usuarios con movilidad reducida o pantallas táctiles. | ExperienceForm, EducationForm, SkillsForm, Toast |
| **Toast closeButton** | Solo `padding: var(--spacing-xs)` (4px); área táctil muy pequeña. | Toast.module.css |
| **ThemeToggle** | Solo `padding: var(--spacing-sm)`; no hay min-height. En móvil puede ser < 44px. | ThemeToggle.module.css |

Recomendación: mantener 44px como mínimo para cualquier control interactivo en móvil; en desktop, opcional bajar a 40px para acciones secundarias, pero evitar 32px para elementos que se usen con frecuencia o en móvil.

---

## 6. Problemas de estados visuales

| Estado | Situación | Acción recomendada |
|--------|-----------|---------------------|
| **Loading** | El componente acepta `loading` y renderiza `<span className={styles.spinner} />`, pero **no existen** `.loading` ni `.spinner` en `Button.module.css`. El spinner no se ve. | Definir `.loading` (opacidad/cursor) y `.spinner` (animación de giro) en Button.module.css. |
| **Focus** | Correcto uso de `:focus-visible` y `--border-focus`. | Mantener. |
| **Hover** | Definido para todas las variantes. | Mantener. |
| **Active** | scale(0.98) en móvil y translateY en desktop. | Mantener. |
| **Disabled** | opacity 0.5 y pointer-events: none. | Opcional: añadir `aria-disabled="true"` cuando `disabled` para lectores de pantalla. |

El Toast closeButton no tiene estado focus-visible explícito; conviene añadirlo para navegación por teclado.

---

## 7. Problemas de consistencia

| Aspecto | Inconsistencia |
|---------|----------------|
| **Componente** | Tabs del header (Formulario / Vista previa) son `<button>` con `App.module.css` (`.viewButton`), no el componente `Button`. Mismo criterio de diseño (altura, bordes) pero otro origen de estilos. |
| **Destructivo** | El estilo destructivo (rojo) se aplica vía clase local `.clearDataButton` en CVWizard en lugar de una variante `danger` del diseño system. |
| **Botón cerrar Toast** | Estilo ad hoc en Toast.module.css (sin variantes del Button). Área y contraste diferentes al resto de botones. |

Recomendación: unificar tabs del header con `Button variant="outline"` o, si se mantienen como tabs nativos, documentar que son la excepción; y mover el estilo destructivo a una variante `danger` del `Button`.

---

## 8. Recomendaciones de mejora (priorizadas)

1. **Alta – Estado loading del Button**  
   Añadir en `Button.module.css` las clases `.loading` y `.spinner` (y opcionalmente ocultar texto cuando `loading`) para que el estado de carga sea visible (p. ej. en "Descargar PDF").

2. **Alta – Contraste botón cerrar Toast**  
   Aumentar contraste del icono (color) y/o del área del botón; asegurar mínimo 4.5:1 con el fondo.

3. **Alta – Área táctil Toast closeButton**  
   Aumentar padding o min-height para que el botón de cierre tenga al menos 44×44px en móvil.

4. **Media – Jerarquía en último paso del wizard**  
   Hacer "Ver vista previa" secundario (outline) y "Descargar CV" el único primario (o el más destacado) en el último paso.

5. **Media – Variante `danger` en Button**  
   Añadir variante `danger` (rojo) en el componente Button y usarla en "Eliminar todo"; quitar la dependencia de `.clearDataButton` para el color.

6. **Media – Tamaño mínimo en desktop**  
   Evitar `min-height: 32px` en `.sm`; usar al menos 40px o mantener 44px para acciones que también aparezcan en móvil.

7. **Baja – ThemeToggle**  
   Asegurar `min-height: 44px` (o 40px) y suficiente padding en móvil.

8. **Baja – Focus en Toast closeButton**  
   Añadir `:focus-visible` y, en el JSX, `aria-label="Cerrar"` (o similar) para teclado y lectores de pantalla.

9. **Baja – Unificación de tabs del header**  
   Valorar usar `Button variant="outline"` para las pestañas o documentar la excepción en el design system.

Prioridad para **usuarios mayores o con baja experiencia digital**: 1 (feedback de carga), 2 y 3 (ver y pulsar el cierre del Toast), 4 (acción principal obvia) y 6 (botones más fáciles de pulsar).
