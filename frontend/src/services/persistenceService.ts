import type { CVFormData } from '../types/cv';

const STORAGE_KEY = 'cv-builder-data';
const STORAGE_VERSION = '1.0';

interface StoredData {
  version: string;
  timestamp: number;
  cvData: CVFormData;
  currentStep: number;
}

export class PersistenceService {
  private static instance: PersistenceService;
  private debounceTimer: NodeJS.Timeout | null = null;
  private readonly DEBOUNCE_DELAY = 1000; // 1 segundo

  private constructor() { }

  static getInstance(): PersistenceService {
    if (!PersistenceService.instance) {
      PersistenceService.instance = new PersistenceService();
    }
    return PersistenceService.instance;
  }

  // Guardar datos con debounce
  saveData(cvData: CVFormData, currentStep: number): void {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }

    this.debounceTimer = setTimeout(() => {
      this.saveToStorage(cvData, currentStep);
    }, this.DEBOUNCE_DELAY);
  }

  // Guardar inmediatamente
  saveDataImmediate(cvData: CVFormData, currentStep: number): void {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
    this.saveToStorage(cvData, currentStep);
  }

  private saveToStorage(cvData: CVFormData, currentStep: number): void {
    try {
      const dataToStore: StoredData = {
        version: STORAGE_VERSION,
        timestamp: Date.now(),
        cvData,
        currentStep,
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToStore));
      console.log('Datos guardados en localStorage');
    } catch (error) {
      console.error('Error al guardar datos:', error);
    }
  }

  // Cargar datos guardados
  loadData(): { cvData: CVFormData; currentStep: number } | null {
    try {
      const storedData = localStorage.getItem(STORAGE_KEY);
      if (!storedData) {
        return null;
      }

      const parsedData: StoredData = JSON.parse(storedData);

      // Validar versión y estructura
      if (parsedData.version !== STORAGE_VERSION) {
        console.warn('Versión de datos incompatible, usando datos por defecto');
        return null;
      }

      // Validar que los datos tengan la estructura correcta
      if (!this.validateDataStructure(parsedData.cvData)) {
        console.warn('Estructura de datos inválida, usando datos por defecto');
        return null;
      }

      console.log('Datos cargados desde localStorage');
      return {
        cvData: parsedData.cvData,
        currentStep: parsedData.currentStep,
      };
    } catch (error) {
      console.error('Error al cargar datos:', error);
      return null;
    }
  }

  // Validar estructura de datos
  private validateDataStructure(cvData: any): boolean {
    return (
      cvData &&
      typeof cvData === 'object' &&
      cvData.personalInfo &&
      cvData.professionalSummary &&
      Array.isArray(cvData.skills) &&
      Array.isArray(cvData.experiences) &&
      Array.isArray(cvData.education)
    );
  }

  // Limpiar datos guardados
  clearData(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
      console.log('Datos eliminados de localStorage');
    } catch (error) {
      console.error('Error al eliminar datos:', error);
    }
  }

  // Exportar datos como JSON
  exportData(cvData: CVFormData): string {
    const exportData = {
      version: STORAGE_VERSION,
      timestamp: Date.now(),
      cvData,
    };
    return JSON.stringify(exportData, null, 2);
  }

  // Importar datos desde JSON
  importData(jsonData: string): CVFormData | null {
    try {
      const parsedData = JSON.parse(jsonData);

      if (!this.validateDataStructure(parsedData.cvData)) {
        throw new Error('Estructura de datos inválida');
      }

      return parsedData.cvData;
    } catch (error) {
      console.error('Error al importar datos:', error);
      return null;
    }
  }

  // Verificar si hay datos guardados
  hasStoredData(): boolean {
    try {
      const storedData = localStorage.getItem(STORAGE_KEY);
      return !!storedData;
    } catch (error) {
      return false;
    }
  }

  // Obtener información de los datos guardados
  getStoredDataInfo(): { timestamp: number; hasData: boolean } | null {
    try {
      const storedData = localStorage.getItem(STORAGE_KEY);
      if (!storedData) {
        return { timestamp: 0, hasData: false };
      }

      const parsedData: StoredData = JSON.parse(storedData);
      return {
        timestamp: parsedData.timestamp,
        hasData: true,
      };
    } catch (error) {
      return null;
    }
  }
}

export const persistenceService = PersistenceService.getInstance(); 