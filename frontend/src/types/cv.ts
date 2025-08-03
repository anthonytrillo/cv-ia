export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  linkedin: string;
  professionalTitle: string;
}

export interface ProfessionalSummary {
  summary: string;
}

export interface Skill {
  id: string;
  name: string;
  orderIndex: number;
}

export interface Experience {
  id: string;
  jobTitle: string;
  company: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  description: string;
  achievements: string[];
  orderIndex: number;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  completionDate?: string;
  isExpected: boolean;
  description: string;
  highlights: string[];
  orderIndex: number;
}

export interface CV {
  id: string;
  personalInfo: PersonalInfo;
  professionalSummary: ProfessionalSummary;
  skills: Skill[];
  experiences: Experience[];
  education: Education[];
  templateId: string;
  language: string;
  createdAt: string;
  updatedAt: string;
}

export interface CVFormData {
  personalInfo: PersonalInfo;
  professionalSummary: ProfessionalSummary;
  skills: Skill[];
  experiences: Experience[];
  education: Education[];
}

export interface CVTemplate {
  id: string;
  name: string;
  description: string;
  preview: string;
} 