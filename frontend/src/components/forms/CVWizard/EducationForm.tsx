import { useState } from 'react';
import { useCVStore } from '../../../store/cvStore';
import { Input } from '../../ui/Input';
import { Textarea } from '../../ui/Textarea';
import { Button } from '../../ui/Button';
import { Plus, X, Trash2 } from 'lucide-react';
import { formatMonthYear } from '../../../utils/dateFormat';
import styles from './EducationForm.module.css';

type FormErrors = { degree?: string; institution?: string; completionDate?: string; description?: string };

export const EducationForm = () => {
  const { cvData, addEducation, removeEducation } = useCVStore();
  const [showAddForm, setShowAddForm] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [newEducation, setNewEducation] = useState({
    degree: '',
    institution: '',
    completionDate: '',
    isExpected: false,
    description: '',
    highlights: [''],
  });

  const validate = (): boolean => {
    const { degree, institution, completionDate, isExpected, description, highlights } = newEducation;
    const next: FormErrors = {};

    if (!degree.trim()) next.degree = 'El título es requerido';
    else if (degree.trim().length < 3) next.degree = 'Mínimo 3 caracteres';
    else if (degree.trim().length > 150) next.degree = 'Máximo 150 caracteres';

    if (!institution.trim()) next.institution = 'La institución es requerida';
    else if (institution.trim().length < 3) next.institution = 'Mínimo 3 caracteres';
    else if (institution.trim().length > 150) next.institution = 'Máximo 150 caracteres';

    if (!isExpected && !completionDate) next.completionDate = 'Indica la fecha o marca "En curso"';
    if (!isExpected && completionDate) {
      const d = new Date(completionDate);
      if (d > new Date()) next.completionDate = 'La fecha no puede ser futura';
    }

    if (description?.trim()) {
      if (description.trim().length < 10) next.description = 'Mínimo 10 caracteres';
      else if (description.trim().length > 300) next.description = 'Máximo 300 caracteres';
    }

    const validHighlights = highlights.filter(h => h.trim().length > 0);
    for (const h of validHighlights) {
      if (h.trim().length < 5 || h.trim().length > 150) {
        next.description = next.description || 'Cada punto destacado: entre 5 y 150 caracteres';
        break;
      }
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleAddEducation = () => {
    if (!validate()) return;

    const { degree, institution, completionDate, isExpected, description, highlights } = newEducation;
    const validHighlights = highlights.filter(h => h.trim().length >= 5 && h.trim().length <= 150);

    addEducation({
      degree: degree.trim(),
      institution: institution.trim(),
      completionDate: isExpected ? undefined : completionDate,
      isExpected,
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
    setErrors({});
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
                    {education.isExpected ? 'En curso' : formatMonthYear(education.completionDate) || education.completionDate}
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleRemoveEducation(education.id)}
                  className={styles.removeButton}
                  aria-label={`Eliminar educación ${education.degree}`}
                >
                  <Trash2 size={14} aria-hidden />
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
          aria-label="Agregar nueva educación"
        >
          <Plus size={16} aria-hidden />
          Agregar Educación
        </Button>
      ) : (
        <div className={styles.addForm}>
          <h3 className={styles.sectionTitle}>Agregar Nueva Educación</h3>

          <div className={styles.formGrid}>
            <Input
              label="Título/Certificación *"
              placeholder="Ej: Técnico Superior en Administración"
              value={newEducation.degree}
              onChange={(e) => { setNewEducation(prev => ({ ...prev, degree: e.target.value })); setErrors(prev => ({ ...prev, degree: undefined })); }}
              error={errors.degree}
            />

            <Input
              label="Institución *"
              placeholder="Ej: IES Comercial de Madrid"
              value={newEducation.institution}
              onChange={(e) => { setNewEducation(prev => ({ ...prev, institution: e.target.value })); setErrors(prev => ({ ...prev, institution: undefined })); }}
              error={errors.institution}
            />

            <div className={styles.dateSection}>
              <Input
                label="Fecha de finalización"
                type="month"
                value={newEducation.completionDate}
                onChange={(e) => { setNewEducation(prev => ({ ...prev, completionDate: e.target.value })); setErrors(prev => ({ ...prev, completionDate: undefined })); }}
                disabled={newEducation.isExpected}
                error={errors.completionDate}
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
            label="Descripción (opcional)"
            placeholder="Breve descripción de la formación"
            value={newEducation.description}
            onChange={(e) => { setNewEducation(prev => ({ ...prev, description: e.target.value })); setErrors(prev => ({ ...prev, description: undefined })); }}
            rows={3}
            error={errors.description}
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
                    aria-label="Eliminar punto destacado"
                  >
                    <X size={14} aria-hidden />
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
              aria-label="Agregar punto destacado"
            >
              <Plus size={14} aria-hidden />
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