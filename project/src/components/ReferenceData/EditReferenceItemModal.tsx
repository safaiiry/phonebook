import React, { useState } from 'react';
import { Modal } from '../common/Modal';

interface EditReferenceItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (value: string) => void;
  initialValue: string;
}

export function EditReferenceItemModal({
  isOpen,
  onClose,
  onSave,
  initialValue,
}: EditReferenceItemModalProps) {
  const [value, setValue] = useState(initialValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(value);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Редактирование значения">
      <form onSubmit={handleSubmit}>
        <div className="search-field">
          <label className="search-label">Значение</label>
          <input
            type="text"
            className="search-input"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            autoFocus
          />
        </div>
        <div className="modal-footer">
          <button type="button" onClick={onClose} className="button button-secondary">
            Отмена
          </button>
          <button type="submit" className="button button-primary">
            Сохранить
          </button>
        </div>
      </form>
    </Modal>
  );
}