import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from '@react-pdf/renderer';
import type { CVFormData } from '../../types/cv';
import { formatMonthYear } from '../../utils/dateFormat';

/**
 * Template CV optimizado para:
 * - Escaneo rápido (6-10 seg) por reclutadores
 * - Compatibilidad ATS (estructura simple, texto parseable)
 * - 1 página ideal
 * - Jerarquía visual clara
 */
const styles = StyleSheet.create({
  // Page: compacto para caber en 1 página
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    paddingTop: 28,
    paddingBottom: 28,
    paddingLeft: 32,
    paddingRight: 32,
    fontFamily: 'Helvetica',
    fontSize: 10,
  },

  // Header: nombre prominente, contacto compacto
  header: {
    marginBottom: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#1d4ed8',
    paddingBottom: 12,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 12,
    color: '#1d4ed8',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  contactItem: {
    fontSize: 9,
    color: '#4b5563',
  },

  // Secciones: espaciado compacto
  section: {
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingBottom: 4,
    letterSpacing: 0.3,
  },

  // Resumen: 2-3 líneas, legible
  summary: {
    fontSize: 10,
    lineHeight: 1.5,
    color: '#374151',
    textAlign: 'left',
  },

  // Experiencia: jerarquía clara
  experienceItem: {
    marginBottom: 14,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  jobTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#111827',
    flex: 1,
  },
  date: {
    fontSize: 9,
    color: '#6b7280',
  },
  company: {
    fontSize: 10,
    color: '#1d4ed8',
    fontStyle: 'italic',
    marginBottom: 6,
  },
  description: {
    fontSize: 9,
    lineHeight: 1.45,
    color: '#374151',
    marginBottom: 4,
  },
  achievementsList: {
    marginLeft: 0,
  },
  achievement: {
    fontSize: 9,
    color: '#374151',
    marginBottom: 2,
    lineHeight: 1.4,
  },

  // Skills: texto lineal (más ATS-friendly que chips)
  skillsText: {
    fontSize: 10,
    color: '#374151',
    lineHeight: 1.5,
  },

  // Educación
  educationItem: {
    marginBottom: 12,
  },
  educationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  degree: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#111827',
    flex: 1,
  },
  educationDate: {
    fontSize: 9,
    color: '#6b7280',
  },
  institution: {
    fontSize: 9,
    color: '#1d4ed8',
    fontStyle: 'italic',
    marginBottom: 4,
  },
  educationDescription: {
    fontSize: 9,
    lineHeight: 1.4,
    color: '#374151',
  },
});

function formatExperienceDate(
  startDate: string,
  endDate?: string,
  isCurrent?: boolean
): string {
  const start = formatMonthYear(startDate) || startDate;
  const end = isCurrent ? 'Presente' : formatMonthYear(endDate) || endDate || '';
  return end ? `${start} – ${end}` : start;
}

function formatEducationDate(value?: string): string {
  if (!value) return '';
  return formatMonthYear(value) || value;
}

interface SimpleCVDocumentProps {
  cvData: CVFormData;
}

export const SimpleCVDocument: React.FC<SimpleCVDocumentProps> = ({ cvData }) => {
  const { personalInfo, professionalSummary, skills, experiences, education } =
    cvData;

  const contactParts: string[] = [];
  if (personalInfo.email) contactParts.push(personalInfo.email);
  if (personalInfo.phone) contactParts.push(personalInfo.phone);
  if (personalInfo.linkedin) contactParts.push(personalInfo.linkedin);
  const contactString = contactParts.join(' · ');

  const skillsString = skills.map((s) => s.name).join(' · ');

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>
            {personalInfo.fullName || 'Nombre Completo'}
          </Text>
          <Text style={styles.title}>
            {personalInfo.professionalTitle || 'Título Profesional'}
          </Text>
          {contactString ? (
            <Text style={styles.contactItem}>{contactString}</Text>
          ) : null}
        </View>

        {/* Resumen Profesional */}
        {professionalSummary.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Resumen Profesional</Text>
            <Text style={styles.summary}>{professionalSummary.summary}</Text>
          </View>
        )}

        {/* Experiencia (antes que Skills - prioridad para reclutadores) */}
        {experiences.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experiencia Profesional</Text>
            {experiences.map((exp, index) => (
              <View key={index} style={styles.experienceItem}>
                <View style={styles.experienceHeader}>
                  <Text style={styles.jobTitle}>{exp.jobTitle}</Text>
                  <Text style={styles.date}>
                    {formatExperienceDate(
                      exp.startDate,
                      exp.endDate,
                      exp.isCurrent
                    )}
                  </Text>
                </View>
                <Text style={styles.company}>{exp.company}</Text>
                {exp.description ? (
                  <Text style={styles.description}>{exp.description}</Text>
                ) : null}
                {exp.achievements && exp.achievements.length > 0 ? (
                  <View style={styles.achievementsList}>
                    {exp.achievements.map((a, i) => (
                      <Text key={i} style={styles.achievement}>
                        • {a}
                      </Text>
                    ))}
                  </View>
                ) : null}
              </View>
            ))}
          </View>
        )}

        {/* Habilidades (texto lineal, ATS-friendly) */}
        {skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Habilidades</Text>
            <Text style={styles.skillsText}>{skillsString}</Text>
          </View>
        )}

        {/* Educación */}
        {education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Educación</Text>
            {education.map((edu, index) => (
              <View key={index} style={styles.educationItem}>
                <View style={styles.educationHeader}>
                  <Text style={styles.degree}>{edu.degree}</Text>
                  <Text style={styles.educationDate}>
                    {formatEducationDate(edu.completionDate)}
                  </Text>
                </View>
                <Text style={styles.institution}>{edu.institution}</Text>
                {edu.description ? (
                  <Text style={styles.educationDescription}>
                    {edu.description}
                  </Text>
                ) : null}
                {edu.highlights && edu.highlights.length > 0 ? (
                  <View style={styles.achievementsList}>
                    {edu.highlights.map((h, i) => (
                      <Text key={i} style={styles.achievement}>
                        • {h}
                      </Text>
                    ))}
                  </View>
                ) : null}
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
};
