import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Sparkles } from 'lucide-react';
import { useCVStore } from '../../../store/cvStore';
import { useToastContext } from '../../../contexts/ToastContext';
import { useImproveSummary } from '../../../hooks/useImproveSummary';
import { Textarea } from '../../ui/Textarea';
import { Button } from '../../ui/Button';
import styles from './ProfessionalSummaryForm.module.css';

const professionalSummarySchema = z.object({
  summary: z
    .string()
    .max(500, 'El resumen no puede exceder 500 caracteres')
    .transform((val) => (val ?? '').trim()),
});

type ProfessionalSummaryFormData = z.infer<typeof professionalSummarySchema>;

const MIN_CHARS = 20;

export const ProfessionalSummaryForm = () => {
  const { cvData, setProfessionalSummary } = useCVStore();
  const { showError } = useToastContext();

  const {
    register,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ProfessionalSummaryFormData>({
    resolver: zodResolver(professionalSummarySchema),
    defaultValues: cvData.professionalSummary,
  });

  const summary = watch('summary') ?? '';
  const canImprove = summary.trim().length >= MIN_CHARS;

  const handleImproveSuccess = React.useCallback(
    (text: string) => {
      const safe = text.slice(0, 500);
      setValue('summary', safe);
      setProfessionalSummary({ summary: safe });
    },
    [setValue, setProfessionalSummary]
  );

  const { improve, isLoading } = useImproveSummary({
    onSuccess: handleImproveSuccess,
    onError: (msg) => showError(msg),
  });

  React.useEffect(() => {
    reset(cvData.professionalSummary);
  }, [cvData.professionalSummary, reset]);

  React.useEffect(() => {
    const s = summary;
    if (s !== cvData.professionalSummary.summary) {
      setProfessionalSummary({ summary: s });
    }
  }, [summary, setProfessionalSummary, cvData.professionalSummary.summary]);

  const handleImprove = () => {
    if (!canImprove || isLoading) return;

    const experience = cvData.experiences
      .map((e) => `${e.jobTitle} en ${e.company}: ${e.description}`)
      .join('\n');
    const skills = cvData.skills.map((s) => s.name).join(', ');

    improve({
      jobTitle: cvData.personalInfo.professionalTitle ?? '',
      currentSummary: summary,
      experience,
      skills,
    });
  };

  return (
    <form
      className={styles.form}
      data-testid="professional-summary-form"
      onSubmit={(e) => e.preventDefault()}
    >
      <Textarea
        label="Resumen Profesional"
        placeholder="Ej: Más de 5 años en atención al cliente. Enfocado en resolver consultas y mejorar la satisfacción."
        error={errors.summary?.message}
        helperText="Opcional. Máx. 500 caracteres."
        rows={5}
        {...register('summary')}
        aria-describedby="improve-microcopy"
        readOnly={isLoading}
      />

      <div
        className={styles.improveSection}
        role="region"
        aria-label="Mejorar resumen con IA"
        aria-live="polite"
        aria-busy={isLoading}
      >
        <Button
          type="button"
          variant="secondary"
          className={styles.improveButton}
          onClick={handleImprove}
          disabled={!canImprove || isLoading}
          loading={isLoading}
          aria-label={
            isLoading ? 'Mejorando resumen con IA' : 'Mejorar resumen con IA'
          }
        >
          {!isLoading && <Sparkles aria-hidden size={18} />}
          {isLoading ? 'Mejorando...' : 'Mejorar con IA'}
        </Button>
        <p id="improve-microcopy" className={styles.microcopy}>
          La IA mejora tu texto manteniendo tu experiencia profesional.
        </p>
      </div>

      <p className={styles.optionalNote}>
        Puedes omitir este paso y completarlo más tarde.
      </p>
      <div className={styles.tip}>
        <strong>Consejo:</strong> Un resumen corto con experiencia y logros
        ayuda a destacar.
      </div>
    </form>
  );
}; 