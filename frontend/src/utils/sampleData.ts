import type { CVFormData } from '../types/cv';

export const sampleCVData: CVFormData = {
  personalInfo: {
    fullName: 'Ana García López',
    email: 'ana.garcia@email.com',
    phone: '+34 612 345 678',
    linkedin: 'linkedin.com/in/anagarcia',
    professionalTitle: 'Desarrolladora Frontend Senior',
  },
  professionalSummary: {
    summary: 'Desarrolladora frontend con más de 5 años de experiencia en React, TypeScript y tecnologías web modernas. Especializada en crear interfaces de usuario intuitivas y accesibles, con un fuerte enfoque en la experiencia del usuario y el rendimiento de las aplicaciones.',
  },
  skills: [
    { id: '1', name: 'React', orderIndex: 0 },
    { id: '2', name: 'TypeScript', orderIndex: 1 },
    { id: '3', name: 'JavaScript', orderIndex: 2 },
    { id: '4', name: 'HTML5', orderIndex: 3 },
    { id: '5', name: 'CSS3', orderIndex: 4 },
    { id: '6', name: 'Next.js', orderIndex: 5 },
    { id: '7', name: 'Node.js', orderIndex: 6 },
    { id: '8', name: 'Git', orderIndex: 7 },
  ],
  experiences: [
    {
      id: '1',
      jobTitle: 'Desarrolladora Frontend Senior',
      company: 'TechCorp Solutions',
      startDate: 'Enero 2022',
      endDate: 'Presente',
      isCurrent: true,
      description: 'Lidero el desarrollo de aplicaciones web complejas utilizando React y TypeScript. Trabajo en estrecha colaboración con diseñadores y desarrolladores backend para crear experiencias de usuario excepcionales.',
      achievements: [
        'Reduje el tiempo de carga de la aplicación principal en un 40%',
        'Implementé un sistema de componentes reutilizables que mejoró la consistencia del diseño',
        'Mentoré a 3 desarrolladores junior en mejores prácticas de React',
      ],
      orderIndex: 0,
    },
    {
      id: '2',
      jobTitle: 'Desarrolladora Frontend',
      company: 'Digital Innovations',
      startDate: 'Marzo 2020',
      endDate: 'Diciembre 2021',
      isCurrent: false,
      description: 'Desarrollé y mantuve aplicaciones web responsivas utilizando React y JavaScript. Colaboré en proyectos de e-commerce y aplicaciones internas.',
      achievements: [
        'Desarrollé 5 aplicaciones web completas desde cero',
        'Mejoré la accesibilidad de todas las aplicaciones siguiendo estándares WCAG',
        'Implementé testing automatizado con Jest y React Testing Library',
      ],
      orderIndex: 1,
    },
  ],
  education: [
    {
      id: '1',
      degree: 'Ingeniería Informática',
      institution: 'Universidad Politécnica de Madrid',
      completionDate: 'Junio 2019',
      isExpected: false,
      description: 'Especialización en desarrollo de software y tecnologías web.',
      highlights: [
        'Proyecto final: Aplicación web de gestión de tareas con React',
        'Participé en hackathons universitarios',
        'Promedio: 8.5/10',
      ],
      orderIndex: 0,
    },
  ],
}; 