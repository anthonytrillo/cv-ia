import { useState } from 'react';
import { CVWizard } from './components/forms/CVWizard';
import { CVPreview } from './components/cv/CVPreview';
import { usePersistence } from './hooks/usePersistence';
import { useToast } from './hooks/useToast';
import { Toast } from './components/ui';
import { ThemeProvider } from './contexts/ThemeContext';
import { ThemeToggle } from './components/ui';
import styles from './App.module.css';

function AppContent() {
  const [viewMode, setViewMode] = useState<'form' | 'preview'>('form');
  const { showSuccess, showError, toasts, removeToast } = useToast();

  const showToastWrapper = (message: string, type?: 'success' | 'error' | 'info') => {
    if (type === 'success') {
      showSuccess(message);
    } else if (type === 'error') {
      showError(message);
    } else {
      showSuccess(message);
    }
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
            <ThemeToggle />
            <div className={styles.viewToggle}>
              <button
                className={`${styles.viewButton} ${viewMode === 'form' ? styles.active : ''}`}
                onClick={() => setViewMode('form')}
              >
                Formulario
              </button>
              <button
                className={`${styles.viewButton} ${viewMode === 'preview' ? styles.active : ''}`}
                onClick={() => setViewMode('preview')}
              >
                Vista Previa
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        {viewMode === 'form' ? (
          <div className={styles.formContainer}>
            <CVWizard />
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

      {/* Toast notifications */}
      {toasts.map((toast: any) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
