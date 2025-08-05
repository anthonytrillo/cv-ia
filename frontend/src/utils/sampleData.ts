import type { CVFormData } from '../types/cv';

export const sampleCVData: CVFormData = {
  personalInfo: {
    fullName: 'María Rodríguez Sánchez',
    email: 'maria.rodriguez@email.com',
    phone: '+34 612 345 678',
    linkedin: 'linkedin.com/in/mariarodriguez',
    professionalTitle: 'Especialista en Atención al Cliente',
  },
  professionalSummary: {
    summary: 'Profesional con más de 4 años de experiencia en atención al cliente y servicio al cliente. Especializada en resolver consultas complejas, gestionar reclamaciones y garantizar la satisfacción del cliente. Experiencia en múltiples canales de atención incluyendo teléfono, email, chat y redes sociales.',
  },
  skills: [
    { id: '1', name: 'Atención al Cliente', orderIndex: 0 },
    { id: '2', name: 'Resolución de Conflictos', orderIndex: 1 },
    { id: '3', name: 'Comunicación Efectiva', orderIndex: 2 },
    { id: '4', name: 'Gestión de Reclamaciones', orderIndex: 3 },
    { id: '5', name: 'Empatía y Paciencia', orderIndex: 4 },
    { id: '6', name: 'CRM (Salesforce, Zendesk)', orderIndex: 5 },
    { id: '7', name: 'Gestión de Quejas', orderIndex: 6 },
    { id: '8', name: 'Orientación a Resultados', orderIndex: 7 },
  ],
  experiences: [
    {
      id: '1',
      jobTitle: 'Supervisora de Atención al Cliente',
      company: 'ServiCorp Solutions',
      startDate: 'Enero 2022',
      endDate: 'Presente',
      isCurrent: true,
      description: 'Lidero un equipo de 8 agentes de atención al cliente, supervisando la calidad del servicio y resolviendo casos complejos. Implementé mejoras en procesos que aumentaron la satisfacción del cliente en un 25%.',
      achievements: [
        'Reduje el tiempo de respuesta promedio de 24h a 4h',
        'Implementé un sistema de seguimiento de casos que mejoró la resolución en un 30%',
        'Entrené a 5 nuevos agentes en mejores prácticas de atención al cliente',
      ],
      orderIndex: 0,
    },
    {
      id: '2',
      jobTitle: 'Agente de Atención al Cliente',
      company: 'CustomerCare Plus',
      startDate: 'Marzo 2020',
      endDate: 'Diciembre 2021',
      isCurrent: false,
      description: 'Atendí consultas y reclamaciones de clientes a través de múltiples canales (teléfono, email, chat). Mantuve un índice de satisfacción del cliente superior al 95%.',
      achievements: [
        'Resolví más de 500 casos mensuales con alta satisfacción del cliente',
        'Mejoré la documentación de procesos de atención al cliente',
        'Implementé técnicas de comunicación efectiva que redujeron conflictos en un 40%',
      ],
      orderIndex: 1,
    },
  ],
  education: [
    {
      id: '1',
      degree: 'Técnico Superior en Administración y Gestión',
      institution: 'IES Comercial de Madrid',
      completionDate: 'Junio 2019',
      isExpected: false,
      description: 'Especialización en gestión empresarial y atención al cliente.',
      highlights: [
        'Proyecto final: Implementación de un sistema CRM para pequeñas empresas',
        'Certificación en Atención al Cliente por la Cámara de Comercio',
        'Promedio: 8.7/10',
      ],
      orderIndex: 0,
    },
  ],
}; 