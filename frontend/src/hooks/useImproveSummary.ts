import { useState, useCallback, useRef } from 'react';
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
  const busyRef = useRef(false);

  const improve = useCallback(
    async (params: {
      jobTitle: string;
      currentSummary: string;
      experience: string;
      skills: string;
    }) => {
      if (busyRef.current) return;
      busyRef.current = true;
      setIsLoading(true);

      try {
        const result = await improveSummary(params);
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
