import { useState, useEffect, useRef } from 'react';
import { useCVStore } from '../../../store/cvStore';
import { usePersistence } from '../../../hooks/usePersistence';
import { useToastContext } from '../../../contexts/ToastContext';
import { PersonalInfoForm } from './PersonalInfoForm';
import { ProfessionalSummaryForm } from './ProfessionalSummaryForm';
import { SkillsForm } from './SkillsForm';
import { ExperienceForm } from './ExperienceForm';
import { EducationForm } from './EducationForm';
import { Button } from '../../ui/Button';
import { Card } from '../../ui/Card';
import { Modal } from '../../ui/Modal';
import { ChevronLeft, ChevronRight, Download, Trash2, Eye } from 'lucide-react';
import styles from './CVWizard.module.css';
import { downloadPDF } from '../../../services/pdfService';

const STEPS = [
  { id: 0, title: 'Información Personal', component: PersonalInfoForm },
  { id: 1, title: 'Resumen Profesional', component: ProfessionalSummaryForm },
  { id: 2, title: 'Habilidades', component: SkillsForm },
  { id: 3, title: 'Experiencia', component: ExperienceForm },
  { id: 4, title: 'Educación', component: EducationForm },
];

function isPersonalInfoValid(pi: { fullName: string; email: string; phone: string; professionalTitle: string }) {
  return !!(
    pi.fullName?.trim() &&
    pi.email?.trim() &&
    pi.phone?.trim() &&
    pi.professionalTitle?.trim() &&
    pi.fullName.trim().length >= 2 &&
    pi.professionalTitle.trim().length >= 2
  );
}

export const CVWizard = ({ onGoToPreview }: { onGoToPreview?: () => void }) => {
  const { currentStep, nextStep, prevStep, cvData, clearStoredData } = useCVStore();
  const { showError } = useToastContext();
  const [isFormValid, setIsFormValid] = useState(false);
  const [canDownload, setCanDownload] = useState(false);
  const [showClearModal, setShowClearModal] = useState(false);
  const formCardRef = useRef<HTMLDivElement>(null);

  const { hasStoredData } = usePersistence(() => {});

  const CurrentStepComponent = STEPS[currentStep].component;
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === STEPS.length - 1;

  useEffect(() => {
    switch (currentStep) {
      case 0:
        setIsFormValid(isPersonalInfoValid(cvData.personalInfo));
        break;
      case 1:
      case 2:
      case 3:
      case 4:
        setIsFormValid(true);
        break;
      default:
        setIsFormValid(false);
    }
  }, [currentStep, cvData]);

  useEffect(() => {
    const hasExperienceOrEducation =
      cvData.experiences.length > 0 || cvData.education.length > 0;
    setCanDownload(isPersonalInfoValid(cvData.personalInfo) && hasExperienceOrEducation);
  }, [cvData.personalInfo, cvData.experiences.length, cvData.education.length]);

  const scrollToFirstError = () => {
    const card = formCardRef.current;
    if (!card) return;
    const firstError = card.querySelector('[data-error="true"]');
    if (firstError) {
      (firstError as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      card.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleNext = () => {
    if (currentStep === 0 && !isFormValid) {
      const form = document.querySelector('form');
      if (form) {
        const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
        form.dispatchEvent(submitEvent);
      }
      showError('Completa los campos obligatorios antes de continuar.');
      scrollToFirstError();
      return;
    }

    const form = document.querySelector('form');
    if (form) {
      const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
      form.dispatchEvent(submitEvent);
    }

    setTimeout(() => {
      nextStep();
    }, 100);
  };

  const handlePrev = () => {
    prevStep();
  };

  const handleDownload = async () => {
    if (!canDownload) return;
    const filename = `${cvData.personalInfo.fullName || 'CV'}.pdf`;
    try {
      await downloadPDF(cvData, filename);
      if (onGoToPreview) onGoToPreview();
    } catch (error) {
      console.error('Error downloading PDF:', error);
      showError('Error al descargar el PDF. Inténtalo de nuevo.');
    }
  };

  const handleClearData = () => {
    setShowClearModal(false);
    clearStoredData();
  };

  return (
    <div className={styles.wizard} role="region" aria-label="Crear CV">
      <div className={styles.progressContainer} aria-valuenow={currentStep + 1} aria-valuemin={1} aria-valuemax={STEPS.length} aria-label="Progreso del formulario">
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

      <div className={styles.stepTitle}>
        <h2 id="step-heading">{STEPS[currentStep].title}</h2>
        <p className={styles.stepDescription}>
          {getStepDescription(currentStep)}
        </p>
      </div>

      <div ref={formCardRef}>
        <Card className={styles.formCard}>
          <CurrentStepComponent />
        </Card>
      </div>

      <div className={styles.navigation}>
        <Button
          variant="outline"
          onClick={handlePrev}
          disabled={isFirstStep}
          className={styles.navButton}
          aria-label="Paso anterior"
        >
          <ChevronLeft size={16} aria-hidden />
          Anterior
        </Button>

        <div className={styles.navCenter}>
          {isLastStep ? (
            <>
              {onGoToPreview && (
                <Button
                  variant="outline"
                  onClick={onGoToPreview}
                  className={styles.navButton}
                  aria-label="Ver vista previa del CV"
                >
                  <Eye size={16} aria-hidden />
                  Ver vista previa
                </Button>
              )}
              <Button
                variant="primary"
                onClick={handleDownload}
                className={styles.downloadButton}
                disabled={!canDownload}
                aria-label="Descargar CV en PDF"
              >
                <Download size={16} aria-hidden />
                Descargar CV
              </Button>
            </>
          ) : (
            <Button
              variant="primary"
              onClick={handleNext}
              className={styles.navButton}
              aria-label="Siguiente paso"
            >
              Siguiente
              <ChevronRight size={16} aria-hidden />
            </Button>
          )}
        </div>
      </div>

      {hasStoredData && (
        <div className={styles.clearDataSection}>
          <Button
            variant="outline"
            onClick={() => setShowClearModal(true)}
            className={styles.clearDataButton}
            aria-label="Eliminar todos los datos guardados"
          >
            <Trash2 size={16} aria-hidden />
            Limpiar datos
          </Button>
        </div>
      )}

      <Modal
        isOpen={showClearModal}
        onClose={() => setShowClearModal(false)}
        title="¿Eliminar todos los datos?"
      >
        <p style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>
          Se borrará toda la información guardada. Esta acción no se puede deshacer.
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
          <Button variant="outline" onClick={() => setShowClearModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleClearData} aria-label="Confirmar eliminación de todos los datos">
            Eliminar todo
          </Button>
        </div>
      </Modal>
    </div>
  );
};

const getStepDescription = (step: number): string => {
  const descriptions = [
    'Datos de contacto y título profesional',
    'Opcional. Resumen breve para destacar',
    'Opcional. Añade hasta 10 habilidades',
    'Añade al menos una experiencia laboral',
    'Añade formación o certificaciones'
  ];
  return descriptions[step] || '';
};
