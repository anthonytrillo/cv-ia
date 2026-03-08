import { useState } from 'react';
import { useCVStore } from '../../../store/cvStore';
import { useToastContext } from '../../../contexts/ToastContext';
import { Button } from '../../ui/Button';
import { Download, FileText, Pencil } from 'lucide-react';
import { downloadPDF } from '../../../services/pdfService';
import { sampleCVData } from '../../../utils/sampleData';
import { formatMonthYear } from '../../../utils/dateFormat';
import styles from './CVPreview.module.css';

export const CVPreview = ({ onGoToEdit }: { onGoToEdit?: () => void }) => {
  const { cvData, setPersonalInfo, setProfessionalSummary, setSkills, setExperiences, setEducation } = useCVStore();
  const { showSuccess, showError } = useToastContext();
  const { personalInfo, professionalSummary, skills, experiences, education } = cvData;
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadPDF = async () => {
    try {
      setIsDownloading(true);
      const filename = `${personalInfo.fullName || 'CV'}.pdf`;
      await downloadPDF(cvData, filename);
      showSuccess('CV descargado correctamente');
    } catch (error) {
      console.error('Error downloading PDF:', error);
      showError('Error al descargar el PDF. Inténtalo de nuevo.');
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
          {onGoToEdit && (
            <Button
              onClick={onGoToEdit}
              variant="outline"
              size="md"
              aria-label="Volver a editar el formulario"
            >
              <Pencil size={16} aria-hidden />
              Editar
            </Button>
          )}
          <Button
            onClick={handleDownloadPDF}
            loading={isDownloading}
            variant="download"
            size="lg"
            aria-label="Descargar CV en PDF"
          >
            <Download size={20} aria-hidden />
            Descargar PDF
          </Button>
          <Button
            onClick={handleLoadSampleData}
            variant="outline"
            size="md"
            aria-label="Cargar datos de ejemplo"
          >
            <FileText size={16} aria-hidden />
            Datos de ejemplo
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
                      {formatMonthYear(experience.startDate) || experience.startDate} – {experience.isCurrent ? 'Presente' : (formatMonthYear(experience.endDate) || experience.endDate)}
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
                      {edu.isExpected ? 'En curso' : (formatMonthYear(edu.completionDate) || edu.completionDate)}
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