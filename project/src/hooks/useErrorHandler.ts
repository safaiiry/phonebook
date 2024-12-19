import { useState, useCallback } from 'react';

export function useErrorHandler() {
  const [error, setError] = useState<string | null>(null);

  const handleError = useCallback((error: any) => {
    const message = error.message || 'Произошла ошибка';
    setError(message);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return { error, handleError, clearError };
}