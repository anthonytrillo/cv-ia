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
  lastSavedAt: number | null;

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
  lastSavedAt: null,

  // Acciones
  setPersonalInfo: (data) =>
    set((state) => {
      const newState = {
        cvData: {
          ...state.cvData,
          personalInfo: data,
        },
      };
      persistenceService.saveData(newState.cvData, state.currentStep);
      return { ...newState, lastSavedAt: Date.now() };
    }),

  setProfessionalSummary: (data) =>
    set((state) => {
      const newState = {
        cvData: {
          ...state.cvData,
          professionalSummary: data,
        },
      };
      persistenceService.saveData(newState.cvData, state.currentStep);
      return { ...newState, lastSavedAt: Date.now() };
    }),

  setSkills: (skills) =>
    set((state) => {
      const newState = {
        cvData: {
          ...state.cvData,
          skills,
        },
      };
      persistenceService.saveData(newState.cvData, state.currentStep);
      return { ...newState, lastSavedAt: Date.now() };
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
      persistenceService.saveData(newState.cvData, state.currentStep);
      return { ...newState, lastSavedAt: Date.now() };
    }),

  removeSkill: (id) =>
    set((state) => {
      const newState = {
        cvData: {
          ...state.cvData,
          skills: state.cvData.skills.filter((skill) => skill.id !== id),
        },
      };
      persistenceService.saveData(newState.cvData, state.currentStep);
      return { ...newState, lastSavedAt: Date.now() };
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
      persistenceService.saveData(newState.cvData, state.currentStep);
      return { ...newState, lastSavedAt: Date.now() };
    }),

  setExperiences: (experiences) =>
    set((state) => {
      const newState = {
        cvData: {
          ...state.cvData,
          experiences,
        },
      };
      persistenceService.saveData(newState.cvData, state.currentStep);
      return { ...newState, lastSavedAt: Date.now() };
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
      persistenceService.saveData(newState.cvData, state.currentStep);
      return { ...newState, lastSavedAt: Date.now() };
    }),

  removeExperience: (id) =>
    set((state) => {
      const newState = {
        cvData: {
          ...state.cvData,
          experiences: state.cvData.experiences.filter((exp) => exp.id !== id),
        },
      };
      persistenceService.saveData(newState.cvData, state.currentStep);
      return { ...newState, lastSavedAt: Date.now() };
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
      persistenceService.saveData(newState.cvData, state.currentStep);
      return { ...newState, lastSavedAt: Date.now() };
    }),

  setEducation: (education) =>
    set((state) => {
      const newState = {
        cvData: {
          ...state.cvData,
          education,
        },
      };
      persistenceService.saveData(newState.cvData, state.currentStep);
      return { ...newState, lastSavedAt: Date.now() };
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
      persistenceService.saveData(newState.cvData, state.currentStep);
      return { ...newState, lastSavedAt: Date.now() };
    }),

  removeEducation: (id) =>
    set((state) => {
      const newState = {
        cvData: {
          ...state.cvData,
          education: state.cvData.education.filter((edu) => edu.id !== id),
        },
      };
      persistenceService.saveData(newState.cvData, state.currentStep);
      return { ...newState, lastSavedAt: Date.now() };
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
      persistenceService.saveData(newState.cvData, state.currentStep);
      return { ...newState, lastSavedAt: Date.now() };
    }),

  setCurrentStep: (step) => {
    const state = get();
    persistenceService.saveData(state.cvData, step);
    set({ currentStep: step, lastSavedAt: Date.now() });
  },

  nextStep: () => {
    set((state) => {
      const newStep = Math.min(state.currentStep + 1, 4);
      persistenceService.saveData(state.cvData, newStep);
      return { currentStep: newStep, lastSavedAt: Date.now() };
    });
  },

  prevStep: () => {
    set((state) => {
      const newStep = Math.max(state.currentStep - 1, 0);
      persistenceService.saveData(state.cvData, newStep);
      return { currentStep: newStep, lastSavedAt: Date.now() };
    });
  },

  setLoading: (loading) => set({ isLoading: loading }),

  setError: (error) => set({ error }),

  resetCV: () => {
    set({
      cvData: initialCVData,
      currentStep: 0,
      error: null,
      lastSavedAt: null,
    });
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
    set({
      cvData: initialCVData,
      currentStep: 0,
      error: null,
      isDataRestored: false,
      lastSavedAt: null,
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