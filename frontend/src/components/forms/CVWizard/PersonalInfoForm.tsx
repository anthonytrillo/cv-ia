import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCVStore } from '../../../store/cvStore';
import { Input } from '../../ui/Input';
import type { PersonalInfo } from '../../../types/cv';

const personalInfoSchema = z.object({
  fullName: z.string()
    .min(1, 'El nombre completo es requerido')
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El nombre solo puede contener letras y espacios'),
  email: z.string()
    .min(1, 'El email es requerido')
    .email('El email debe ser válido')
    .toLowerCase(),
  phone: z.string()
    .min(1, 'El teléfono es requerido')
    .min(8, 'El teléfono debe tener al menos 8 dígitos')
    .regex(/^[\d\s\+\-\(\)]+$/, 'El teléfono solo puede contener números, espacios y símbolos +-()'),
  linkedin: z.string()
    .url('La URL de LinkedIn debe ser válida')
    .optional()
    .or(z.literal(''))
    .refine((val) => !val || val.includes('linkedin.com'), {
      message: 'La URL debe ser de LinkedIn'
    }),
  professionalTitle: z.string()
    .min(1, 'El título profesional es requerido')
    .min(5, 'El título debe tener al menos 5 caracteres')
    .max(100, 'El título no puede exceder 100 caracteres'),
});

type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;

export const PersonalInfoForm = () => {
  const { cvData, setPersonalInfo } = useCVStore();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: cvData.personalInfo,
  });

  // Watch form values and update store automatically
  const watchedValues = watch();
  React.useEffect(() => {
    // Only update if we have meaningful data and it's different from current store data
    const hasValidData = watchedValues.fullName && watchedValues.email && watchedValues.phone && watchedValues.professionalTitle;
    const isDifferentFromStore =
      watchedValues.fullName !== cvData.personalInfo.fullName ||
      watchedValues.email !== cvData.personalInfo.email ||
      watchedValues.phone !== cvData.personalInfo.phone ||
      watchedValues.professionalTitle !== cvData.personalInfo.professionalTitle ||
      watchedValues.linkedin !== cvData.personalInfo.linkedin;

    if (hasValidData && isDifferentFromStore) {
      setPersonalInfo({
        ...watchedValues,
        linkedin: watchedValues.linkedin || '',
      });
    }
  }, [watchedValues, setPersonalInfo, cvData.personalInfo]);

  const onSubmit = (data: PersonalInfoFormData) => {
    setPersonalInfo({
      ...data,
      linkedin: data.linkedin || '',
    });
    // Prevent form from actually submitting
    return false;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Nombre Completo *"
          placeholder="Ej: Juan Pérez García"
          error={errors.fullName?.message}
          {...register('fullName')}
        />

        <Input
          label="Email *"
          type="email"
          placeholder="tu.email@ejemplo.com"
          error={errors.email?.message}
          {...register('email')}
        />

        <Input
          label="Teléfono *"
          type="tel"
          placeholder="+34 123 456 789"
          error={errors.phone?.message}
          {...register('phone')}
        />

        <Input
          label="LinkedIn"
          type="url"
          placeholder="https://linkedin.com/in/tu-perfil"
          error={errors.linkedin?.message}
          helperText="Opcional"
          {...register('linkedin')}
        />
      </div>

      <Input
        label="Título Profesional *"
        placeholder="Ej: Desarrollador Full Stack, Community Builder, etc."
        error={errors.professionalTitle?.message}
        {...register('professionalTitle')}
      />

      <div className="text-sm text-gray-600">
        <p>* Campos obligatorios</p>
      </div>
    </form>
  );
}; 