import { useEffect, useState, useRef } from 'react';
import { useCVStore } from '../store/cvStore';
import { persistenceService } from '../services/persistenceService';

export const usePersistence = (showToast?: (message: string, type?: 'success' | 'error' | 'info') => void) => {
  const { loadStoredData, isDataRestored, cvData } = useCVStore();
  const [isInitialized, setIsInitialized] = useState(false);
  const [hasStoredData, setHasStoredData] = useState(false);
  const hasShownRestoreToast = useRef(false);

  useEffect(() => {
    // Verificar si hay datos guardados
    const storedDataInfo = persistenceService.getStoredDataInfo();
    setHasStoredData(storedDataInfo?.hasData || false);

    // Cargar datos guardados al inicializar
    if (!isDataRestored) {
      loadStoredData();
    }

    setIsInitialized(true);
  }, [loadStoredData, isDataRestored]);

  // Actualizar hasStoredData cuando cambie cvData (por ejemplo, cuando se limpien los datos)
  useEffect(() => {
    const storedDataInfo = persistenceService.getStoredDataInfo();
    setHasStoredData(storedDataInfo?.hasData || false);
  }, [cvData]);

  // Función para mostrar notificación de datos restaurados
  const showRestoreNotification = () => {
    if (hasStoredData && isDataRestored && showToast && !hasShownRestoreToast.current) {
      hasShownRestoreToast.current = true;
      showToast('Datos restaurados automáticamente', 'success');
    }
  };

  useEffect(() => {
    if (isInitialized && isDataRestored) {
      showRestoreNotification();
    }
  }, [isInitialized, isDataRestored, hasStoredData]);

  return {
    isInitialized,
    hasStoredData,
    isDataRestored,
  };
}; 