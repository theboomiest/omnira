import { useEffect } from 'react';

interface ConfirmDialogProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({ message, onConfirm, onCancel }: ConfirmDialogProps) {
  // Optional: Escape key support
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onCancel]);

  return (
    <div className="fixed inset-0 z-50 bg-black/50 bg- flex items-center justify-center b2">
      <div className="bg-gray-800 text-white p-6 rounded shadow-lg max-w-sm w-full">
        <p className="mb-4">{message}</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-3 rounded bg-gray-600 hover:bg-gray-500 tag2"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-3 rounded bg-red-600 hover:bg-red-500 tag2"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
