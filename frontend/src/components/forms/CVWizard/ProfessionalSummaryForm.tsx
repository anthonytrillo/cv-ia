import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCVStore } from '../../../store/cvStore';
import { Textarea } from '../../ui/Textarea';
import styles from './ProfessionalSummaryForm.module.css';

const professionalSummarySchema = z.object({
  summary: z.string()
    .max(500, 'El resumen no puede exceder 500 caracteres')
    .transform((val) => (val ?? '').trim()),
});

type ProfessionalSummaryFormData = z.infer<typeof professionalSummarySchema>;

export const ProfessionalSummaryForm = () => {
  const { cvData, setProfessionalSummary } = useCVStore();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ProfessionalSummaryFormData>({
    resolver: zodResolver(professionalSummarySchema),
    defaultValues: cvData.professionalSummary,
  });

  // Reset form when cvData.professionalSummary changes (e.g., when data is cleared)
  React.useEffect(() => {
    reset(cvData.professionalSummary);
  }, [cvData.professionalSummary, reset]);

  // Watch form values and update store automatically
  const watchedValues = watch();
  React.useEffect(() => {
    const summary = watchedValues.summary ?? '';
    const isDifferentFromStore = summary !== cvData.professionalSummary.summary;
    if (isDifferentFromStore) {
      setProfessionalSummary({ summary });
    }
  }, [watchedValues, setProfessionalSummary, cvData.professionalSummary]);

  const onSubmit = (data: ProfessionalSummaryFormData) => {
    setProfessionalSummary({ summary: data.summary });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form} data-testid="professional-summary-form">
      <Textarea
        label="Resumen Profesional"
        placeholder="Ej: Más de 5 años en atención al cliente. Enfocado en resolver consultas y mejorar la satisfacción."
        error={errors.summary?.message}
        helperText="Opcional. Máx. 500 caracteres."
        rows={5}
        {...register('summary')}
      />

      <p className={styles.optionalNote}>Puedes omitir este paso y completarlo más tarde.</p>
      <div className={styles.tip}>
        <strong>Consejo:</strong> Un resumen corto con experiencia y logros ayuda a destacar.
      </div>
    </form>
  );
}; 