import { useState } from 'react';
import { CVWizard } from './components/forms/CVWizard';
import { CVPreview } from './components/cv/CVPreview';
import { Button } from './components/ui/Button';
import { FileText, Edit3 } from 'lucide-react';
import './styles/globals.css';
import styles from './App.module.css';

function App() {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>
            <FileText size={24} />
            Creador de CV Gratuito
          </h1>
          <p className={styles.subtitle}>
            Crea tu currículum profesional en minutos
          </p>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.viewToggle}>
            <Button
              variant={!showPreview ? 'primary' : 'outline'}
              onClick={() => setShowPreview(false)}
              className={styles.toggleButton}
            >
              <Edit3 size={16} />
              Editar CV
            </Button>
            <Button
              variant={showPreview ? 'primary' : 'outline'}
              onClick={() => setShowPreview(true)}
              className={styles.toggleButton}
            >
              <FileText size={16} />
              Vista Previa
            </Button>
          </div>

          {showPreview ? (
            <div className={styles.previewContainer}>
              <CVPreview />
            </div>
          ) : (
            <div className={styles.wizardContainer}>
              <CVWizard />
            </div>
          )}
        </div>
      </main>

      <footer className={styles.footer}>
        <p>&copy; {new Date().getFullYear()} Anthony Trillo. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default App;
