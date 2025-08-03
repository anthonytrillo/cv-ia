import { useState } from 'react';
import { useCVStore } from '../../../store/cvStore';
import { Input } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { Plus, X } from 'lucide-react';
import styles from './SkillsForm.module.css';

export const SkillsForm = () => {
  const { cvData, addSkill, removeSkill } = useCVStore();
  const [newSkill, setNewSkill] = useState('');

  const handleAddSkill = () => {
    if (newSkill.trim() && cvData.skills.length < 10) {
      addSkill({
        name: newSkill.trim(),
        orderIndex: cvData.skills.length,
      });
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (id: string) => {
    removeSkill(id);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.addSkill}>
        <Input
          label="Agregar Habilidad"
          placeholder="Ej: JavaScript, Liderazgo, Excel..."
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyPress={handleKeyPress}
          helperText={`${cvData.skills.length}/10 habilidades`}
        />
        <Button
          type="button"
          onClick={handleAddSkill}
          disabled={!newSkill.trim() || cvData.skills.length >= 10}
          className={styles.addButton}
        >
          <Plus size={16} />
          Agregar
        </Button>
      </div>

      {cvData.skills.length > 0 && (
        <div className={styles.skillsList}>
          <h3 className={styles.skillsTitle}>Habilidades Agregadas</h3>
          <div className={styles.skillsGrid}>
            {cvData.skills.map((skill) => (
              <div key={skill.id} className={styles.skillItem}>
                <span className={styles.skillName}>{skill.name}</span>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleRemoveSkill(skill.id)}
                  className={styles.removeButton}
                >
                  <X size={14} />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className={styles.helpText}>
        <p>
          <strong>Consejo:</strong> Incluye tanto habilidades técnicas como blandas.
          Las habilidades técnicas son específicas de tu campo (ej: React, Python, Excel),
          mientras que las blandas son transferibles (ej: Liderazgo, Comunicación, Trabajo en equipo).
        </p>
      </div>
    </div>
  );
}; 