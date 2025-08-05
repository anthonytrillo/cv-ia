import { useState } from 'react';
import { useCVStore } from '../../../store/cvStore';
import { Input } from '../../ui/Input';
import { Textarea } from '../../ui/Textarea';
import { Button } from '../../ui/Button';
import { Plus, X, Trash2 } from 'lucide-react';
import styles from './EducationForm.module.css';

export const EducationForm = () => {
  const { cvData, addEducation, removeEducation } = useCVStore();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEducation, setNewEducation] = useState({
    degree: '',
    institution: '',
    completionDate: '',
    isExpected: false,
    description: '',
    highlights: [''],
  });

  const handleAddEducation = () => {
    const { degree, institution, completionDate, isExpected, description, highlights } = newEducation;

    // Validaciones básicas
    if (!degree.trim()) {
      alert('El título/certificación es requerido');
      return;
    }

    if (!institution.trim()) {
      alert('La institución es requerida');
      return;
    }

    // Validar longitud de campos
    if (degree.trim().length < 3) {
      alert('El título debe tener al menos 3 caracteres');
      return;
    }

    if (institution.trim().length < 3) {
      alert('La institución debe tener al menos 3 caracteres');
      return;
    }

    if (degree.trim().length > 150) {
      alert('El título no puede exceder 150 caracteres');
      return;
    }

    if (institution.trim().length > 150) {
      alert('La institución no puede exceder 150 caracteres');
      return;
    }

    // Validar fecha si no es esperado
    if (!isExpected && !completionDate) {
      alert('La fecha de finalización es requerida si no está en curso');
      return;
    }

    if (!isExpected && completionDate) {
      const completionDateObj = new Date(completionDate);
      const currentDate = new Date();

      if (completionDateObj > currentDate) {
        alert('La fecha de finalización no puede ser en el futuro');
        return;
      }
    }

    // Validar descripción si se proporciona
    if (description && description.trim().length < 10) {
      alert('La descripción debe tener al menos 10 caracteres');
      return;
    }

    if (description && description.trim().length > 300) {
      alert('La descripción no puede exceder 300 caracteres');
      return;
    }

    // Validar highlights si se proporcionan
    const validHighlights = highlights.filter(h => h.trim().length > 0);
    if (validHighlights.length > 0) {
      for (const highlight of validHighlights) {
        if (highlight.trim().length < 5) {
          alert('Cada punto destacado debe tener al menos 5 caracteres');
          return;
        }
        if (highlight.trim().length > 150) {
          alert('Cada punto destacado no puede exceder 150 caracteres');
          return;
        }
      }
    }

    addEducation({
      degree: degree.trim(),
      institution: institution.trim(),
      completionDate: isExpected ? undefined : completionDate,
      isExpected: isExpected,
      description: description.trim(),
      highlights: validHighlights,
      orderIndex: cvData.education.length,
    });

    setNewEducation({
      degree: '',
      institution: '',
      completionDate: '',
      isExpected: false,
      description: '',
      highlights: [''],
    });
    setShowAddForm(false);
  };

  const handleRemoveEducation = (id: string) => {
    removeEducation(id);
  };

  const handleAddHighlight = () => {
    setNewEducation(prev => ({
      ...prev,
      highlights: [...prev.highlights, ''],
    }));
  };

  const handleRemoveHighlight = (index: number) => {
    setNewEducation(prev => ({
      ...prev,
      highlights: prev.highlights.filter((_, i) => i !== index),
    }));
  };

  const handleHighlightChange = (index: number, value: string) => {
    setNewEducation(prev => ({
      ...prev,
      highlights: prev.highlights.map((highlight, i) =>
        i === index ? value : highlight
      ),
    }));
  };

  return (
    <div className={styles.container}>
      {/* Existing Education */}
      {cvData.education.length > 0 && (
        <div className={styles.educationList}>
          <h3 className={styles.sectionTitle}>Educación Agregada</h3>
          {cvData.education.map((education) => (
            <div key={education.id} className={styles.educationCard}>
              <div className={styles.educationHeader}>
                <div>
                  <h4 className={styles.degree}>{education.degree}</h4>
                  <p className={styles.institution}>{education.institution}</p>
                  <p className={styles.dates}>
                    {education.isExpected ? 'Esperado' : education.completionDate}
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleRemoveEducation(education.id)}
                  className={styles.removeButton}
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add New Education */}
      {!showAddForm ? (
        <Button
          type="button"
          variant="outline"
          onClick={() => setShowAddForm(true)}
          className={styles.addButton}
        >
          <Plus size={16} />
          Agregar Educación
        </Button>
      ) : (
        <div className={styles.addForm}>
          <h3 className={styles.sectionTitle}>Agregar Nueva Educación</h3>

          <div className={styles.formGrid}>
            <Input
              label="Título/Certificación *"
              placeholder="Ej: Técnico Superior en Administración y Gestión"
              value={newEducation.degree}
              onChange={(e) => setNewEducation(prev => ({ ...prev, degree: e.target.value }))}
            />

            <Input
              label="Institución *"
              placeholder="Ej: IES Comercial de Madrid"
              value={newEducation.institution}
              onChange={(e) => setNewEducation(prev => ({ ...prev, institution: e.target.value }))}
            />

            <div className={styles.dateSection}>
              <Input
                label="Fecha de Finalización"
                type="month"
                value={newEducation.completionDate}
                onChange={(e) => setNewEducation(prev => ({ ...prev, completionDate: e.target.value }))}
                disabled={newEducation.isExpected}
              />

              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={newEducation.isExpected}
                  onChange={(e) => setNewEducation(prev => ({ ...prev, isExpected: e.target.checked }))}
                />
                En curso / Esperado
              </label>
            </div>
          </div>

          <Textarea
            label="Descripción"
            placeholder="Describe tu formación y especialización en atención al cliente o gestión empresarial"
            value={newEducation.description}
            onChange={(e) => setNewEducation(prev => ({ ...prev, description: e.target.value }))}
            rows={3}
          />

          <div className={styles.highlightsSection}>
            <label className={styles.highlightsLabel}>Puntos Destacados</label>
            {newEducation.highlights.map((highlight, index) => (
              <div key={index} className={styles.highlightItem}>
                <Input
                  placeholder="Ej: Certificación en Atención al Cliente"
                  value={highlight}
                  onChange={(e) => handleHighlightChange(index, e.target.value)}
                />
                {newEducation.highlights.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleRemoveHighlight(index)}
                    className={styles.removeHighlightButton}
                  >
                    <X size={14} />
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleAddHighlight}
              className={styles.addHighlightButton}
            >
              <Plus size={14} />
              Agregar Punto
            </Button>
          </div>

          <div className={styles.formActions}>
            <Button
              type="button"
              variant="primary"
              onClick={handleAddEducation}
              disabled={!newEducation.degree || !newEducation.institution}
            >
              Agregar Educación
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowAddForm(false)}
            >
              Cancelar
            </Button>
          </div>
        </div>
      )}

      <div className={styles.helpText}>
        <p>
          <strong>Consejo:</strong> Incluye tu formación más relevante para el puesto.
          Si tienes múltiples títulos, prioriza los más recientes o relevantes.
          Incluye certificaciones profesionales si son importantes para tu campo.
        </p>
      </div>
    </div>
  );
}; 