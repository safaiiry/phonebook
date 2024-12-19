import { useEffect } from 'react';
import { X } from 'lucide-react';

interface ErrorToastProps {
  message: string;
  onClose: () => void;
}

export function ErrorToast({ message, onClose }: ErrorToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="error-toast">
      <div className="error-toast-content">
        <span>{message}</span>
        <button onClick={onClose} className="icon-button">
          <X size={16} />
        </button>
      </div>
    </div>
  );
}