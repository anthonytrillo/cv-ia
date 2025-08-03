import { create } from 'zustand';
import type { CVFormData, PersonalInfo, ProfessionalSummary, Skill, Experience, Education } from '../types/cv';

interface CVStore {
  // Estado
  cvData: CVFormData;
  currentStep: number;
  isLoading: boolean;
  error: string | null;

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

export const useCVStore = create<CVStore>((set) => ({
  // Estado inicial
  cvData: initialCVData,
  currentStep: 0,
  isLoading: false,
  error: null,

  // Acciones
  setPersonalInfo: (data) =>
    set((state) => ({
      cvData: {
        ...state.cvData,
        personalInfo: data,
      },
    })),

  setProfessionalSummary: (data) =>
    set((state) => ({
      cvData: {
        ...state.cvData,
        professionalSummary: data,
      },
    })),

  setSkills: (skills) =>
    set((state) => ({
      cvData: {
        ...state.cvData,
        skills,
      },
    })),

  addSkill: (skill) =>
    set((state) => ({
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
    })),

  removeSkill: (id) =>
    set((state) => ({
      cvData: {
        ...state.cvData,
        skills: state.cvData.skills.filter((skill) => skill.id !== id),
      },
    })),

  updateSkill: (id, skill) =>
    set((state) => ({
      cvData: {
        ...state.cvData,
        skills: state.cvData.skills.map((s) =>
          s.id === id ? { ...s, ...skill } : s
        ),
      },
    })),

  setExperiences: (experiences) =>
    set((state) => ({
      cvData: {
        ...state.cvData,
        experiences,
      },
    })),

  addExperience: (experience) =>
    set((state) => ({
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
    })),

  removeExperience: (id) =>
    set((state) => ({
      cvData: {
        ...state.cvData,
        experiences: state.cvData.experiences.filter((exp) => exp.id !== id),
      },
    })),

  updateExperience: (id, experience) =>
    set((state) => ({
      cvData: {
        ...state.cvData,
        experiences: state.cvData.experiences.map((exp) =>
          exp.id === id ? { ...exp, ...experience } : exp
        ),
      },
    })),

  setEducation: (education) =>
    set((state) => ({
      cvData: {
        ...state.cvData,
        education,
      },
    })),

  addEducation: (education) =>
    set((state) => ({
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
    })),

  removeEducation: (id) =>
    set((state) => ({
      cvData: {
        ...state.cvData,
        education: state.cvData.education.filter((edu) => edu.id !== id),
      },
    })),

  updateEducation: (id, education) =>
    set((state) => ({
      cvData: {
        ...state.cvData,
        education: state.cvData.education.map((edu) =>
          edu.id === id ? { ...edu, ...education } : edu
        ),
      },
    })),

  setCurrentStep: (step) => set({ currentStep: step }),

  nextStep: () =>
    set((state) => ({
      currentStep: Math.min(state.currentStep + 1, 4), // 5 pasos totales
    })),

  prevStep: () =>
    set((state) => ({
      currentStep: Math.max(state.currentStep - 1, 0),
    })),

  setLoading: (loading) => set({ isLoading: loading }),

  setError: (error) => set({ error }),

  resetCV: () =>
    set({
      cvData: initialCVData,
      currentStep: 0,
      error: null,
    }),
})); 