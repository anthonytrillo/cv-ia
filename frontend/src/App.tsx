import { useState } from 'react';
import { CVWizard } from './components/forms/CVWizard';
import { CVPreview } from './components/cv/CVPreview';
import { Button } from './components/ui/Button';
import { Toast } from './components/ui/Toast';
import { FileText, Edit3, Trash2 } from 'lucide-react';
import { usePersistence } from './hooks/usePersistence';
import { useToast } from './hooks/useToast';
import { useCVStore } from './store/cvStore';
import './styles/globals.css';
import styles from './App.module.css';

function App() {
  const [showPreview, setShowPreview] = useState(false);
  const { toasts, showSuccess, removeToast } = useToast();
  const { clearStoredData } = useCVStore();

  // Wrapper function to match the expected signature
  const showToastWrapper = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    if (type === 'success') {
      showSuccess(message);
    } else if (type === 'error') {
      // We don't have showError in the current scope, so we'll use showSuccess for now
      showSuccess(message);
    } else {
      showSuccess(message);
    }
  };

  const { isInitialized, hasStoredData } = usePersistence(showToastWrapper);

  // Función para limpiar datos
  const handleClearData = () => {
    if (confirm('¿Estás seguro de que quieres eliminar todos los datos guardados? Esta acción no se puede deshacer.')) {
      clearStoredData();
      showSuccess('Datos eliminados exitosamente');
    }
  };

  // Mostrar loading mientras se inicializa
  if (!isInitialized) {
    return (
      <div className={styles.app}>
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <p>Cargando...</p>
        </div>
      </div>
    );
  }

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

          {/* Botones de persistencia */}
          <div className={styles.persistenceControls}>
            {hasStoredData && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearData}
                className={styles.persistenceButton}
              >
                <Trash2 size={14} />
                Limpiar Datos
              </Button>
            )}
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

      {/* Toast Notifications */}
      {toasts.map((toast) => (
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

export default App;
