import { create } from 'zustand';
import type { CVFormData, PersonalInfo, ProfessionalSummary, Skill, Experience, Education } from '../types/cv';
import { persistenceService } from '../services/persistenceService';

interface CVStore {
  // Estado
  cvData: CVFormData;
  currentStep: number;
  isLoading: boolean;
  error: string | null;
  isDataRestored: boolean;

  // Acciones
  setPersonalInfo: (data: PersonalInfo) => void;
  setProfessionalSummary: (data: ProfessionalSummary) => void;
  setSkills: (skills: Skill[]) => void;
  addSkill: (skill: Omit<Skill, 'id'>) => void;
  removeSkill: (id: string) => void;
  updateSkill: (id: string, skill: Partial<Skill>) => void;
  setExperiences: (experiences: Experience[]) => void;
  addExperience: (experience: Omit<Experience, 'id'>) => void;
  removeExperience: (id: string) => void;
  updateExperience: (id: string, experience: Partial<Experience>) => void;
  setEducation: (education: Education[]) => void;
  addEducation: (education: Omit<Education, 'id'>) => void;
  removeEducation: (id: string) => void;
  updateEducation: (id: string, education: Partial<Education>) => void;
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  resetCV: () => void;
  loadStoredData: () => void;
  saveCurrentData: () => void;
  clearStoredData: () => void;
  exportCVData: () => string;
  importCVData: (jsonData: string) => boolean;
}

const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

const initialCVData: CVFormData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    linkedin: '',
    professionalTitle: '',
  },
  professionalSummary: {
    summary: '',
  },
  skills: [],
  experiences: [],
  education: [],
};

export const useCVStore = create<CVStore>((set, get) => ({
  // Estado inicial
  cvData: initialCVData,
  currentStep: 0,
  isLoading: false,
  error: null,
  isDataRestored: false,

  // Acciones
  setPersonalInfo: (data) =>
    set((state) => {
      const newState = {
        cvData: {
          ...state.cvData,
          personalInfo: data,
        },
      };
      // Guardar automáticamente
      persistenceService.saveData(newState.cvData, state.currentStep);
      return newState;
    }),

  setProfessionalSummary: (data) =>
    set((state) => {
      const newState = {
        cvData: {
          ...state.cvData,
          professionalSummary: data,
        },
      };
      // Guardar automáticamente
      persistenceService.saveData(newState.cvData, state.currentStep);
      return newState;
    }),

  setSkills: (skills) =>
    set((state) => {
      const newState = {
        cvData: {
          ...state.cvData,
          skills,
        },
      };
      // Guardar automáticamente
      persistenceService.saveData(newState.cvData, state.currentStep);
      return newState;
    }),

  addSkill: (skill) =>
    set((state) => {
      const newState = {
        cvData: {
          ...state.cvData,
          skills: [
            ...state.cvData.skills,
            {
              ...skill,
              id: generateId(),
              orderIndex: state.cvData.skills.length,
            },
          ],
        },
      };
      // Guardar automáticamente
      persistenceService.saveData(newState.cvData, state.currentStep);
      return newState;
    }),

  removeSkill: (id) =>
    set((state) => {
      const newState = {
        cvData: {
          ...state.cvData,
          skills: state.cvData.skills.filter((skill) => skill.id !== id),
        },
      };
      // Guardar automáticamente
      persistenceService.saveData(newState.cvData, state.currentStep);
      return newState;
    }),

  updateSkill: (id, skill) =>
    set((state) => {
      const newState = {
        cvData: {
          ...state.cvData,
          skills: state.cvData.skills.map((s) =>
            s.id === id ? { ...s, ...skill } : s
          ),
        },
      };
      // Guardar automáticamente
      persistenceService.saveData(newState.cvData, state.currentStep);
      return newState;
    }),

  setExperiences: (experiences) =>
    set((state) => {
      const newState = {
        cvData: {
          ...state.cvData,
          experiences,
        },
      };
      // Guardar automáticamente
      persistenceService.saveData(newState.cvData, state.currentStep);
      return newState;
    }),

  addExperience: (experience) =>
    set((state) => {
      const newState = {
        cvData: {
          ...state.cvData,
          experiences: [
            ...state.cvData.experiences,
            {
              ...experience,
              id: generateId(),
              orderIndex: state.cvData.experiences.length,
            },
          ],
        },
      };
      // Guardar automáticamente
      persistenceService.saveData(newState.cvData, state.currentStep);
      return newState;
    }),

  removeExperience: (id) =>
    set((state) => {
      const newState = {
        cvData: {
          ...state.cvData,
          experiences: state.cvData.experiences.filter((exp) => exp.id !== id),
        },
      };
      // Guardar automáticamente
      persistenceService.saveData(newState.cvData, state.currentStep);
      return newState;
    }),

  updateExperience: (id, experience) =>
    set((state) => {
      const newState = {
        cvData: {
          ...state.cvData,
          experiences: state.cvData.experiences.map((exp) =>
            exp.id === id ? { ...exp, ...experience } : exp
          ),
        },
      };
      // Guardar automáticamente
      persistenceService.saveData(newState.cvData, state.currentStep);
      return newState;
    }),

  setEducation: (education) =>
    set((state) => {
      const newState = {
        cvData: {
          ...state.cvData,
          education,
        },
      };
      // Guardar automáticamente
      persistenceService.saveData(newState.cvData, state.currentStep);
      return newState;
    }),

  addEducation: (education) =>
    set((state) => {
      const newState = {
        cvData: {
          ...state.cvData,
          education: [
            ...state.cvData.education,
            {
              ...education,
              id: generateId(),
              orderIndex: state.cvData.education.length,
            },
          ],
        },
      };
      // Guardar automáticamente
      persistenceService.saveData(newState.cvData, state.currentStep);
      return newState;
    }),

  removeEducation: (id) =>
    set((state) => {
      const newState = {
        cvData: {
          ...state.cvData,
          education: state.cvData.education.filter((edu) => edu.id !== id),
        },
      };
      // Guardar automáticamente
      persistenceService.saveData(newState.cvData, state.currentStep);
      return newState;
    }),

  updateEducation: (id, education) =>
    set((state) => {
      const newState = {
        cvData: {
          ...state.cvData,
          education: state.cvData.education.map((edu) =>
            edu.id === id ? { ...edu, ...education } : edu
          ),
        },
      };
      // Guardar automáticamente
      persistenceService.saveData(newState.cvData, state.currentStep);
      return newState;
    }),

  setCurrentStep: (step) => {
    set({ currentStep: step });
    // Guardar el paso actual
    const state = get();
    persistenceService.saveData(state.cvData, step);
  },

  nextStep: () => {
    set((state) => {
      const newStep = Math.min(state.currentStep + 1, 4);
      // Guardar el paso actual
      persistenceService.saveData(state.cvData, newStep);
      return { currentStep: newStep };
    });
  },

  prevStep: () => {
    set((state) => {
      const newStep = Math.max(state.currentStep - 1, 0);
      // Guardar el paso actual
      persistenceService.saveData(state.cvData, newStep);
      return { currentStep: newStep };
    });
  },

  setLoading: (loading) => set({ isLoading: loading }),

  setError: (error) => set({ error }),

  resetCV: () => {
    set({
      cvData: initialCVData,
      currentStep: 0,
      error: null,
    });
    // Limpiar datos guardados
    persistenceService.clearData();
  },

  // Cargar datos guardados
  loadStoredData: () => {
    const storedData = persistenceService.loadData();
    if (storedData) {
      set({
        cvData: storedData.cvData,
        currentStep: storedData.currentStep,
        isDataRestored: true,
      });
    }
  },

  // Guardar datos actuales inmediatamente
  saveCurrentData: () => {
    const state = get();
    persistenceService.saveDataImmediate(state.cvData, state.currentStep);
  },

  // Limpiar datos guardados
  clearStoredData: () => {
    persistenceService.clearData();
    // También resetear el estado del store
    set({
      cvData: initialCVData,
      currentStep: 0,
      error: null,
      isDataRestored: false,
    });
  },

  // Exportar datos del CV
  exportCVData: () => {
    const state = get();
    return persistenceService.exportData(state.cvData);
  },

  // Importar datos del CV
  importCVData: (jsonData: string) => {
    const importedData = persistenceService.importData(jsonData);
    if (importedData) {
      set({
        cvData: importedData,
        currentStep: 0,
        isDataRestored: true,
      });
      // Guardar los datos importados
      persistenceService.saveDataImmediate(importedData, 0);
      return true;
    }
    return false;
  },
})); 