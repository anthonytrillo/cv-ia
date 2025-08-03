import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from '@react-pdf/renderer';
import type { CVFormData } from '../../types/cv';

// Create professional styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 40,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 30,
    borderBottom: '2px solid #2563eb',
    paddingBottom: 20,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.05,
  },
  title: {
    fontSize: 16,
    color: '#2563eb',
    marginBottom: 12,
    fontWeight: 'bold',
  },
  contactInfo: {
    fontSize: 10,
    color: '#6b7280',
    textAlign: 'center',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 12,
    borderBottom: '1px solid #e5e7eb',
    paddingBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.05,
  },
  summary: {
    fontSize: 11,
    lineHeight: 1.6,
    color: '#374151',
    textAlign: 'justify',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skill: {
    backgroundColor: '#f3f4f6',
    padding: '6px 12px',
    borderRadius: 4,
    fontSize: 10,
    color: '#374151',
    marginBottom: 4,
  },
  experienceItem: {
    marginBottom: 20,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  jobTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  company: {
    fontSize: 12,
    color: '#2563eb',
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  date: {
    fontSize: 10,
    color: '#6b7280',
    fontWeight: '500',
  },
  description: {
    fontSize: 10,
    lineHeight: 1.5,
    color: '#374151',
    textAlign: 'justify',
    marginBottom: 8,
  },
  achievements: {
    marginLeft: 15,
  },
  achievement: {
    fontSize: 10,
    color: '#374151',
    marginBottom: 2,
  },
  educationItem: {
    marginBottom: 15,
  },
  educationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  degree: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  institution: {
    fontSize: 11,
    color: '#2563eb',
    fontStyle: 'italic',
  },
  educationDate: {
    fontSize: 10,
    color: '#6b7280',
  },
  educationDescription: {
    fontSize: 10,
    lineHeight: 1.4,
    color: '#374151',
  },
});

interface SimpleCVDocumentProps {
  cvData: CVFormData;
}

export const SimpleCVDocument: React.FC<SimpleCVDocumentProps> = ({ cvData }) => {
  const { personalInfo, professionalSummary, skills, experiences, education } = cvData;

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
          <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 20 }}>
            {personalInfo.email && <Text style={styles.contactInfo}>{personalInfo.email}</Text>}
            {personalInfo.phone && <Text style={styles.contactInfo}>{personalInfo.phone}</Text>}
            {personalInfo.linkedin && <Text style={styles.contactInfo}>{personalInfo.linkedin}</Text>}
          </View>
        </View>

        {/* Professional Summary */}
        {professionalSummary.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Resumen Profesional</Text>
            <Text style={styles.summary}>{professionalSummary.summary}</Text>
          </View>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Habilidades</Text>
            <View style={styles.skillsContainer}>
              {skills.map((skill, index) => (
                <Text key={index} style={styles.skill}>
                  {skill.name}
                </Text>
              ))}
            </View>
          </View>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experiencia Profesional</Text>
            {experiences.map((experience, index) => (
              <View key={index} style={styles.experienceItem}>
                <View style={styles.experienceHeader}>
                  <Text style={styles.jobTitle}>{experience.jobTitle}</Text>
                  <Text style={styles.date}>
                    {experience.startDate} - {experience.endDate || 'Presente'}
                  </Text>
                </View>
                <Text style={styles.company}>{experience.company}</Text>
                {experience.description && (
                  <Text style={styles.description}>{experience.description}</Text>
                )}
                {experience.achievements && experience.achievements.length > 0 && (
                  <View style={styles.achievements}>
                    {experience.achievements.map((achievement, achievementIndex) => (
                      <Text key={achievementIndex} style={styles.achievement}>
                        • {achievement}
                      </Text>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Educación</Text>
            {education.map((edu, index) => (
              <View key={index} style={styles.educationItem}>
                <View style={styles.educationHeader}>
                  <Text style={styles.degree}>{edu.degree}</Text>
                  <Text style={styles.educationDate}>
                    {edu.completionDate}
                  </Text>
                </View>
                <Text style={styles.institution}>{edu.institution}</Text>
                {edu.description && (
                  <Text style={styles.educationDescription}>
                    {edu.description}
                  </Text>
                )}
                {edu.highlights && edu.highlights.length > 0 && (
                  <View style={styles.achievements}>
                    {edu.highlights.map((highlight, highlightIndex) => (
                      <Text key={highlightIndex} style={styles.achievement}>
                        • {highlight}
                      </Text>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}; 