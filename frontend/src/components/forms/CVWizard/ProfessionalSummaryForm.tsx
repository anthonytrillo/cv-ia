import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCVStore } from '../../../store/cvStore';
import { Textarea } from '../../ui/Textarea';

const professionalSummarySchema = z.object({
  summary: z.string()
    .min(1, 'El resumen profesional es requerido')
    .min(50, 'El resumen debe tener al menos 50 caracteres')
    .max(500, 'El resumen no puede exceder 500 caracteres')
    .refine((val) => {
      const sentences = val.split(/[.!?]+/).filter(s => s.trim().length > 0);
      return sentences.length >= 2;
    }, {
      message: 'El resumen debe contener al menos 2 oraciones completas'
    }),
});

type ProfessionalSummaryFormData = z.infer<typeof professionalSummarySchema>;

export const ProfessionalSummaryForm = () => {
  const { cvData, setProfessionalSummary } = useCVStore();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ProfessionalSummaryFormData>({
    resolver: zodResolver(professionalSummarySchema),
    defaultValues: cvData.professionalSummary,
  });

  // Watch form values and update store automatically
  const watchedValues = watch();
  React.useEffect(() => {
    // Only update if we have meaningful data and it's different from current store data
    const hasValidData = watchedValues.summary && watchedValues.summary.trim().length >= 50;
    const isDifferentFromStore = watchedValues.summary !== cvData.professionalSummary.summary;

    if (hasValidData && isDifferentFromStore) {
      setProfessionalSummary(watchedValues);
    }
  }, [watchedValues, setProfessionalSummary, cvData.professionalSummary]);

  const onSubmit = (data: ProfessionalSummaryFormData) => {
    setProfessionalSummary(data);
    // Prevent form from actually submitting
    return false;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Textarea
          label="Resumen Profesional *"
          placeholder="Describe tu experiencia en atención al cliente, tu enfoque para resolver problemas, y cómo has contribuido a mejorar la satisfacción del cliente. Incluye ejemplos de logros específicos y tu filosofía de servicio al cliente."
          error={errors.summary?.message}
          helperText="Mínimo 50 caracteres. Describe tu experiencia en atención al cliente, logros y enfoque de servicio."
          rows={6}
          {...register('summary')}
        />
      </div>

      <div className="text-sm text-gray-600">
        <p>* Campo obligatorio</p>
        <p className="mt-2">
          <strong>Consejo:</strong> Escribe un resumen que capture la atención del reclutador
          en los primeros segundos. Incluye tu experiencia más relevante, logros cuantificables
          y lo que te hace destacar en tu campo profesional.
        </p>
      </div>
    </form>
  );
}; 