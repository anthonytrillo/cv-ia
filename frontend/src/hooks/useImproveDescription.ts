import { useState, useCallback } from 'react';
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

  const improve = useCallback(
    async (params: { jobTitle: string; currentDescription: string }) => {
      if (isLoading) return;
      setIsLoading(true);

      try {
        const result = await improveDescription(params);
        onSuccess(result.trim());
      } catch {
        onError('No pudimos mejorar el texto. Intenta nuevamente.');
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, onSuccess, onError]
  );

  return { improve, isLoading };
}
