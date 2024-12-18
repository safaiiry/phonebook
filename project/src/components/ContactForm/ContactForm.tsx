import React from 'react';
import { Contact } from '../../types/contact';
import { X } from 'lucide-react';

interface ContactFormProps {
  contact: Contact;
  onChange: (contact: Contact) => void;
  onSubmit: () => void;
  onCancel: () => void;
  isEdit: boolean;
}

export function ContactForm({ contact, onChange, onSubmit, onCancel, isEdit }: ContactFormProps) {
  const handleChange = (field: keyof Contact) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    onChange({ ...contact, [field]: e.target.value });
  };

  return (
    <div className="modal-content">
      <div className="modal-header">
        <h2 className="modal-title">
          {isEdit ? 'Редактирование контакта' : 'Добавление контакта'}
        </h2>
        <button className="icon-button" onClick={onCancel}>
          <X size={20} />
        </button>
      </div>
      <div className="modal-body">
        <div className="search-grid">
          <div className="search-field">
            <label className="search-label">Фамилия</label>
            <input
              type="text"
              className="search-input"
              value={contact.surname}
              onChange={handleChange('surname')}
              placeholder="Введите фамилию"
            />
          </div>
          <div className="search-field">
            <label className="search-label">Имя</label>
            <input
              type="text"
              className="search-input"
              value={contact.name}
              onChange={handleChange('name')}
              placeholder="Введите имя"
            />
          </div>
          <div className="search-field">
            <label className="search-label">Отчество</label>
            <input
              type="text"
              className="search-input"
              value={contact.otch}
              onChange={handleChange('otch')}
              placeholder="Введите отчество"
            />
          </div>
          <div className="search-field">
            <label className="search-label">Улица</label>
            <input
              type="text"
              className="search-input"
              value={contact.street}
              onChange={handleChange('street')}
              placeholder="Введите улицу"
            />
          </div>
          <div className="search-field">
            <label className="search-label">Дом</label>
            <input
              type="text"
              className="search-input"
              value={contact.house}
              onChange={handleChange('house')}
              placeholder="Введите номер дома"
            />
          </div>
          <div className="search-field">
            <label className="search-label">Корпус</label>
            <input
              type="text"
              className="search-input"
              value={contact.corp}
              onChange={handleChange('corp')}
              placeholder="Введите корпус"
            />
          </div>
          <div className="search-field">
            <label className="search-label">Квартира</label>
            <input
              type="text"
              className="search-input"
              value={contact.apart}
              onChange={handleChange('apart')}
              placeholder="Введите квартиру"
            />
          </div>
          <div className="search-field">
            <label className="search-label">Телефон</label>
            <input
              type="text"
              className="search-input"
              value={contact.tel}
              onChange={handleChange('tel')}
              placeholder="Введите телефон"
            />
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <button onClick={onCancel} className="button button-secondary">
          Отменить
        </button>
        <button onClick={onSubmit} className="button button-primary">
          {isEdit ? 'Сохранить' : 'Добавить'}
        </button>
      </div>
    </div>
  );
}