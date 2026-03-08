import { useState, useCallback } from 'react';
import { improveSummary } from '../services/aiService';

interface UseImproveSummaryParams {
  onSuccess: (text: string) => void;
  onError: (message: string) => void;
}

export function useImproveSummary({
  onSuccess,
  onError,
}: UseImproveSummaryParams) {
  const [isLoading, setIsLoading] = useState(false);

  const improve = useCallback(
    async (params: {
      jobTitle: string;
      currentSummary: string;
      experience: string;
      skills: string;
    }) => {
      if (isLoading) return;
      setIsLoading(true);

      try {
        const result = await improveSummary(params);
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
