import { useState } from 'react';
import { useCVStore } from '../../../store/cvStore';
import { Input } from '../../ui/Input';
import { Textarea } from '../../ui/Textarea';
import { Button } from '../../ui/Button';
import { Plus, X, Trash2 } from 'lucide-react';
import styles from './ExperienceForm.module.css';

export const ExperienceForm = () => {
  const { cvData, addExperience, removeExperience } = useCVStore();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newExperience, setNewExperience] = useState({
    jobTitle: '',
    company: '',
    startDate: '',
    endDate: '',
    isCurrent: false,
    description: '',
    achievements: [''],
  });

  const handleAddExperience = () => {
    if (newExperience.jobTitle && newExperience.company && newExperience.startDate) {
      addExperience({
        jobTitle: newExperience.jobTitle,
        company: newExperience.company,
        startDate: newExperience.startDate,
        endDate: newExperience.isCurrent ? undefined : newExperience.endDate,
        isCurrent: newExperience.isCurrent,
        description: newExperience.description,
        achievements: newExperience.achievements.filter(a => a.trim()),
        orderIndex: cvData.experiences.length,
      });

      setNewExperience({
        jobTitle: '',
        company: '',
        startDate: '',
        endDate: '',
        isCurrent: false,
        description: '',
        achievements: [''],
      });
      setShowAddForm(false);
    }
  };

  const handleRemoveExperience = (id: string) => {
    removeExperience(id);
  };

  const handleAddAchievement = () => {
    setNewExperience(prev => ({
      ...prev,
      achievements: [...prev.achievements, ''],
    }));
  };

  const handleRemoveAchievement = (index: number) => {
    setNewExperience(prev => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== index),
    }));
  };

  const handleAchievementChange = (index: number, value: string) => {
    setNewExperience(prev => ({
      ...prev,
      achievements: prev.achievements.map((achievement, i) =>
        i === index ? value : achievement
      ),
    }));
  };

  return (
    <div className={styles.container}>
      {/* Existing Experiences */}
      {cvData.experiences.length > 0 && (
        <div className={styles.experiencesList}>
          <h3 className={styles.sectionTitle}>Experiencias Agregadas</h3>
          {cvData.experiences.map((experience) => (
            <div key={experience.id} className={styles.experienceCard}>
              <div className={styles.experienceHeader}>
                <div>
                  <h4 className={styles.jobTitle}>{experience.jobTitle}</h4>
                  <p className={styles.company}>{experience.company}</p>
                  <p className={styles.dates}>
                    {experience.startDate} - {experience.isCurrent ? 'Presente' : experience.endDate}
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleRemoveExperience(experience.id)}
                  className={styles.removeButton}
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add New Experience */}
      {!showAddForm ? (
        <Button
          type="button"
          variant="outline"
          onClick={() => setShowAddForm(true)}
          className={styles.addButton}
        >
          <Plus size={16} />
          Agregar Experiencia
        </Button>
      ) : (
        <div className={styles.addForm}>
          <h3 className={styles.sectionTitle}>Agregar Nueva Experiencia</h3>

          <div className={styles.formGrid}>
            <Input
              label="Cargo *"
              placeholder="Ej: Agente de Atención al Cliente"
              value={newExperience.jobTitle}
              onChange={(e) => setNewExperience(prev => ({ ...prev, jobTitle: e.target.value }))}
            />

            <Input
              label="Empresa *"
              placeholder="Ej: ServiCorp Solutions, CustomerCare Plus"
              value={newExperience.company}
              onChange={(e) => setNewExperience(prev => ({ ...prev, company: e.target.value }))}
            />

            <Input
              label="Fecha de Inicio *"
              type="month"
              value={newExperience.startDate}
              onChange={(e) => setNewExperience(prev => ({ ...prev, startDate: e.target.value }))}
            />

            <div className={styles.dateSection}>
              <Input
                label="Fecha de Fin"
                type="month"
                value={newExperience.endDate}
                onChange={(e) => setNewExperience(prev => ({ ...prev, endDate: e.target.value }))}
                disabled={newExperience.isCurrent}
              />

              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={newExperience.isCurrent}
                  onChange={(e) => setNewExperience(prev => ({ ...prev, isCurrent: e.target.checked }))}
                />
                Trabajo actual
              </label>
            </div>
          </div>

          <Textarea
            label="Descripción"
            placeholder="Describe tus responsabilidades en atención al cliente, canales de atención y tipo de consultas que manejabas"
            value={newExperience.description}
            onChange={(e) => setNewExperience(prev => ({ ...prev, description: e.target.value }))}
            rows={3}
          />

          <div className={styles.achievementsSection}>
            <label className={styles.achievementsLabel}>Logros Principales</label>
            {newExperience.achievements.map((achievement, index) => (
              <div key={index} className={styles.achievementItem}>
                <Input
                  placeholder="Ej: Reduje el tiempo de respuesta promedio de 24h a 4h"
                  value={achievement}
                  onChange={(e) => handleAchievementChange(index, e.target.value)}
                />
                {newExperience.achievements.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleRemoveAchievement(index)}
                    className={styles.removeAchievementButton}
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
              onClick={handleAddAchievement}
              className={styles.addAchievementButton}
            >
              <Plus size={14} />
              Agregar Logro
            </Button>
          </div>

          <div className={styles.formActions}>
            <Button
              type="button"
              variant="primary"
              onClick={handleAddExperience}
              disabled={!newExperience.jobTitle || !newExperience.company || !newExperience.startDate}
            >
              Agregar Experiencia
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
          <strong>Consejo:</strong> Incluye experiencias relevantes para el puesto al que aplicas.
          Usa verbos de acción y cuantifica tus logros cuando sea posible (ej: "Incrementé las ventas en un 25%").
        </p>
      </div>
    </div>
  );
}; 