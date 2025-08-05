import { useState } from 'react';
import { useCVStore } from '../../../store/cvStore';
import { Button } from '../../ui/Button';
import { Download, FileText } from 'lucide-react';
import { downloadPDF } from '../../../services/pdfService';
import { sampleCVData } from '../../../utils/sampleData';
import styles from './CVPreview.module.css';

export const CVPreview = () => {
  const { cvData, setPersonalInfo, setProfessionalSummary, setSkills, setExperiences, setEducation } = useCVStore();
  const { personalInfo, professionalSummary, skills, experiences, education } = cvData;
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadPDF = async () => {
    try {
      setIsDownloading(true);
      const filename = `${personalInfo.fullName || 'CV'}.pdf`;
      await downloadPDF(cvData, filename);
    } catch (error) {
      console.error('Error downloading PDF:', error);
      alert('Error al descargar el PDF. Por favor, inténtalo de nuevo.');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleLoadSampleData = () => {
    setPersonalInfo(sampleCVData.personalInfo);
    setProfessionalSummary(sampleCVData.professionalSummary);
    setSkills(sampleCVData.skills);
    setExperiences(sampleCVData.experiences);
    setEducation(sampleCVData.education);
  };

  return (
    <div className={styles.cvPreview}>
      <div className={styles.downloadSection}>
        <div className={styles.buttonGroup}>
          <Button
            onClick={handleLoadSampleData}
            variant="sampleData"
            size="md"
          >
            <FileText size={16} />
            Cargar Datos de Ejemplo
          </Button>
          <Button
            onClick={handleDownloadPDF}
            loading={isDownloading}
            variant="download"
            size="md"
          >
            <Download size={16} />
            Descargar PDF
          </Button>
        </div>
      </div>
      <div className={styles.cvContent}>
        {/* Header */}
        <header className={styles.header}>
          <h1 className={styles.name}>{personalInfo.fullName || 'Tu Nombre'}</h1>
          <div className={styles.contactInfo}>
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
          </div>
        </header>

        {/* Professional Summary */}
        {professionalSummary.summary && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>{personalInfo.professionalTitle || 'Título Profesional'}</h2>
            <p className={styles.summary}>{professionalSummary.summary}</p>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Habilidades</h2>
            <div className={styles.skillsGrid}>
              {skills.map((skill) => (
                <div key={skill.id} className={styles.skill}>
                  • {skill.name}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Experiencia</h2>
            <div className={styles.experienceList}>
              {experiences.map((experience) => (
                <div key={experience.id} className={styles.experience}>
                  <div className={styles.experienceHeader}>
                    <h3 className={styles.jobTitle}>{experience.jobTitle}</h3>
                    <span className={styles.date}>
                      {experience.startDate} - {experience.isCurrent ? 'Presente' : experience.endDate}
                    </span>
                  </div>
                  <div className={styles.company}>{experience.company}</div>
                  {experience.description && (
                    <p className={styles.description}>{experience.description}</p>
                  )}
                  {experience.achievements.length > 0 && (
                    <ul className={styles.achievements}>
                      {experience.achievements.map((achievement, index) => (
                        <li key={index}>{achievement}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Educación</h2>
            <div className={styles.educationList}>
              {education.map((edu) => (
                <div key={edu.id} className={styles.education}>
                  <div className={styles.educationHeader}>
                    <h3 className={styles.degree}>{edu.degree}</h3>
                    <span className={styles.date}>
                      {edu.isExpected ? 'Esperado' : edu.completionDate}
                    </span>
                  </div>
                  <div className={styles.institution}>{edu.institution}</div>
                  {edu.description && (
                    <p className={styles.description}>{edu.description}</p>
                  )}
                  {edu.highlights.length > 0 && (
                    <ul className={styles.highlights}>
                      {edu.highlights.map((highlight, index) => (
                        <li key={index}>{highlight}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}; 