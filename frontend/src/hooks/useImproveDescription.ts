import { useState, useCallback, useRef } from 'react';
import { improveDescription } from '../services/aiService';

interface UseImproveDescriptionParams {
  onSuccess: (text: string) => void;
  onError: (message: string) => void;
}

export function useImproveDescription({
  onSuccess,
  onError,
}: UseImproveDescriptionParams) {
  const [isLoading, setIsLoading] = useState(false);
  const busyRef = useRef(false);

  const improve = useCallback(
    async (params: { jobTitle: string; currentDescription: string }) => {
      if (busyRef.current) return;
      busyRef.current = true;
      setIsLoading(true);

      try {
        const result = await improveDescription(params);
        onSuccess(result.trim());
      } catch {
        onError('No pudimos mejorar el texto. Intenta nuevamente.');
      } finally {
        busyRef.current = false;
        setIsLoading(false);
      }
    },
    [onSuccess, onError]
  );

  return { improve, isLoading };
}
