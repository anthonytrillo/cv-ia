import { useState, useEffect } from 'react';
import { useCVStore } from '../../../store/cvStore';
import { usePersistence } from '../../../hooks/usePersistence';
import { PersonalInfoForm } from './PersonalInfoForm';
import { ProfessionalSummaryForm } from './ProfessionalSummaryForm';
import { SkillsForm } from './SkillsForm';
import { ExperienceForm } from './ExperienceForm';
import { EducationForm } from './EducationForm';
import { Button } from '../../ui/Button';
import { Card } from '../../ui/Card';
import { ChevronLeft, ChevronRight, Download, Trash2 } from 'lucide-react';
import styles from './CVWizard.module.css';
import { downloadPDF } from '../../../services/pdfService';

const STEPS = [
  { id: 0, title: 'Información Personal', component: PersonalInfoForm },
  { id: 1, title: 'Resumen Profesional', component: ProfessionalSummaryForm },
  { id: 2, title: 'Habilidades', component: SkillsForm },
  { id: 3, title: 'Experiencia', component: ExperienceForm },
  { id: 4, title: 'Educación', component: EducationForm },
];

export const CVWizard = () => {
  const { currentStep, nextStep, prevStep, cvData, clearStoredData } = useCVStore();
  const [isFormValid, setIsFormValid] = useState(false);

  // Check if there are stored data to clear
  const { hasStoredData } = usePersistence(() => { });

  const CurrentStepComponent = STEPS[currentStep].component;
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === STEPS.length - 1;

  // Check form validity based on current step
  useEffect(() => {
    const checkFormValidity = () => {
      switch (currentStep) {
        case 0: // Personal Info
          const personalInfo = cvData.personalInfo;
          setIsFormValid(
            !!personalInfo.fullName &&
            !!personalInfo.email &&
            !!personalInfo.phone &&
            !!personalInfo.professionalTitle &&
            personalInfo.fullName.trim().length > 0 &&
            personalInfo.email.trim().length > 0 &&
            personalInfo.phone.trim().length > 0 &&
            personalInfo.professionalTitle.trim().length > 0
          );
          break;
        case 1: // Professional Summary
          const summary = cvData.professionalSummary.summary;
          setIsFormValid(!!summary && summary.trim().length >= 50);
          break;
        case 2: // Skills
          setIsFormValid(cvData.skills.length > 0);
          break;
        case 3: // Experience
          setIsFormValid(cvData.experiences.length > 0);
          break;
        case 4: // Education
          setIsFormValid(cvData.education.length > 0);
          break;
        default:
          setIsFormValid(false);
      }
    };

    checkFormValidity();
  }, [currentStep, cvData]);

  const handleNext = () => {
    if (!isFormValid) {
      // Trigger form submission to show validation errors
      const form = document.querySelector('form');
      if (form) {
        const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
        form.dispatchEvent(submitEvent);
      }
      return;
    }

    // Trigger form submission for the current step
    const form = document.querySelector('form');
    if (form) {
      const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
      form.dispatchEvent(submitEvent);
    }

    // Small delay to allow form submission to complete
    setTimeout(() => {
      nextStep();
    }, 100);
  };

  const handlePrev = () => {
    prevStep();
  };

  const handleDownload = async () => {
    const filename = `${cvData.personalInfo.fullName || 'CV'}.pdf`;

    try {
      await downloadPDF(cvData, filename);
    } catch (error) {
      console.error('Error downloading PDF:', error);
      alert('Error al descargar el PDF. Por favor, inténtalo de nuevo.');
    }
  };

  const handleClearData = () => {
    if (confirm('¿Estás seguro de que quieres eliminar todos los datos guardados? Esta acción no se puede deshacer.')) {
      clearStoredData();
    }
  };

  return (
    <div className={styles.wizard}>
      {/* Progress Bar */}
      <div className={styles.progressContainer}>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
          />
        </div>
        <div className={styles.stepIndicator}>
          Paso {currentStep + 1} de {STEPS.length}
        </div>
      </div>

      {/* Step Title */}
      <div className={styles.stepTitle}>
        <h2>{STEPS[currentStep].title}</h2>
        <p className={styles.stepDescription}>
          {getStepDescription(currentStep)}
        </p>
      </div>

      {/* Form Content */}
      <Card className={styles.formCard}>
        <CurrentStepComponent />
      </Card>

      {/* Navigation */}
      <div className={styles.navigation}>
        <Button
          variant="outline"
          onClick={handlePrev}
          disabled={isFirstStep}
          className={styles.navButton}
        >
          <ChevronLeft size={16} />
          Anterior
        </Button>

        <div className={styles.navCenter}>
          {isLastStep ? (
            <Button
              variant="primary"
              onClick={handleDownload}
              className={styles.downloadButton}
              disabled={!isFormValid}
            >
              <Download size={16} />
              Descargar CV
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={handleNext}
              className={styles.navButton}
              disabled={!isFormValid}
            >
              Siguiente
              <ChevronRight size={16} />
            </Button>
          )}
        </div>
      </div>

      {/* Clear Data Button - Only show when there are stored data */}
      {hasStoredData && (
        <div className={styles.clearDataSection}>
          <Button
            variant="outline"
            onClick={handleClearData}
            className={styles.clearDataButton}
          >
            <Trash2 size={16} />
            Limpiar Datos
          </Button>
        </div>
      )}
    </div>
  );
};

const getStepDescription = (step: number): string => {
  const descriptions = [
    'Completa tu información personal básica',
    'Describe tu experiencia en atención al cliente y objetivos profesionales',
    'Agrega tus habilidades en servicio al cliente y resolución de problemas',
    'Incluye tu experiencia laboral en atención al cliente',
    'Agrega tu formación académica y certificaciones'
  ];
  return descriptions[step] || '';
}; 