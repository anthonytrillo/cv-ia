import { useState, useEffect } from 'react';
import { CVWizard } from './components/forms/CVWizard';
import { CVPreview } from './components/cv/CVPreview';
import { usePersistence } from './hooks/usePersistence';
import { useCVStore } from './store/cvStore';
import { ThemeProvider } from './contexts/ThemeContext';
import { ToastProvider, useToastContext } from './contexts/ToastContext';
import { ThemeToggle } from './components/ui';
import { CheckCircle2 } from 'lucide-react';
import styles from './App.module.css';

const SAVED_INDICATOR_DURATION_MS = 4000;

function SavedIndicator() {
  const lastSavedAt = useCVStore((s) => s.lastSavedAt);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (lastSavedAt == null) {
      setShow(false);
      return;
    }
    setShow(true);
    const t = setTimeout(() => setShow(false), SAVED_INDICATOR_DURATION_MS);
    return () => clearTimeout(t);
  }, [lastSavedAt]);

  if (!show) return null;
  return (
    <span className={styles.savedIndicator} role="status" aria-live="polite">
      <CheckCircle2 className={styles.savedIcon} size={18} aria-hidden />
      Guardado
    </span>
  );
}

function AppContent() {
  const [viewMode, setViewMode] = useState<'form' | 'preview'>('form');
  const { showSuccess, showError } = useToastContext();

  const showToastWrapper = (message: string, type?: 'success' | 'error' | 'info') => {
    if (type === 'error') showError(message);
    else showSuccess(message);
  };

  const { isInitialized } = usePersistence(showToastWrapper);

  if (!isInitialized) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>CV Builder</h1>
          <div className={styles.headerControls}>
            <SavedIndicator />
            <ThemeToggle />
            <div className={styles.viewToggle} role="tablist" aria-label="Vista">
              <button
                role="tab"
                aria-selected={viewMode === 'form'}
                aria-controls="panel-form"
                id="tab-form"
                className={`${styles.viewButton} ${viewMode === 'form' ? styles.active : ''}`}
                onClick={() => setViewMode('form')}
              >
                Formulario
              </button>
              <button
                role="tab"
                aria-selected={viewMode === 'preview'}
                aria-controls="panel-preview"
                id="tab-preview"
                className={`${styles.viewButton} ${viewMode === 'preview' ? styles.active : ''}`}
                onClick={() => setViewMode('preview')}
              >
                Vista previa
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className={styles.main} id={viewMode === 'form' ? 'panel-form' : 'panel-preview'} role="tabpanel" aria-labelledby={viewMode === 'form' ? 'tab-form' : 'tab-preview'}>
        {viewMode === 'form' ? (
          <div className={styles.formContainer}>
            <CVWizard onGoToPreview={() => setViewMode('preview')} />
          </div>
        ) : (
          <div className={styles.previewContainer}>
            <CVPreview />
          </div>
        )}
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p>&copy; {new Date().getFullYear()} Anthony Trillo. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
