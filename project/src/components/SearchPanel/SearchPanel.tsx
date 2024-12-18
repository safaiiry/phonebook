import React from 'react';
import { Search } from 'lucide-react';
import { ContactFilters } from '../../types/contact';

interface SearchPanelProps {
  filters: ContactFilters;
  onFiltersChange: (filters: ContactFilters) => void;
  onSearch: () => void;
  loading: boolean;
}

export function SearchPanel({ filters, onFiltersChange, onSearch, loading }: SearchPanelProps) {
  const handleInputChange = (field: keyof ContactFilters) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    onFiltersChange({ ...filters, [field]: e.target.value });
  };

  return (
    <div className="search-panel">
      <div className="search-grid">
        <div className="search-field">
          <label className="search-label">Фамилия</label>
          <input
            type="text"
            className="search-input"
            value={filters.surname || ''}
            onChange={handleInputChange('surname')}
            placeholder="Введите фамилию"
          />
        </div>
        <div className="search-field">
          <label className="search-label">Имя</label>
          <input
            type="text"
            className="search-input"
            value={filters.name || ''}
            onChange={handleInputChange('name')}
            placeholder="Введите имя"
          />
        </div>
        <div className="search-field">
          <label className="search-label">Отчество</label>
          <input
            type="text"
            className="search-input"
            value={filters.otch || ''}
            onChange={handleInputChange('otch')}
            placeholder="Введите отчество"
          />
        </div>
        <div className="search-field">
          <label className="search-label">Улица</label>
          <input
            type="text"
            className="search-input"
            value={filters.street || ''}
            onChange={handleInputChange('street')}
            placeholder="Введите улицу"
          />
        </div>
        <div className="search-field">
          <label className="search-label">Дом</label>
          <input
            type="text"
            className="search-input"
            value={filters.house || ''}
            onChange={handleInputChange('house')}
            placeholder="Введите номер дома"
          />
        </div>
        <div className="search-field">
          <label className="search-label">Корпус</label>
          <input
            type="text"
            className="search-input"
            value={filters.corp || ''}
            onChange={handleInputChange('corp')}
            placeholder="Введите корпус"
          />
        </div>
        <div className="search-field">
          <label className="search-label">Квартира</label>
          <input
            type="text"
            className="search-input"
            value={filters.apart || ''}
            onChange={handleInputChange('apart')}
            placeholder="Введите квартиру"
          />
        </div>
        <div className="search-field">
          <label className="search-label">Телефон</label>
          <input
            type="text"
            className="search-input"
            value={filters.tel || ''}
            onChange={handleInputChange('tel')}
            placeholder="Введите телефон"
          />
        </div>
      </div>
      <button
        onClick={onSearch}
        disabled={loading}
        className="button button-primary search-button"
      >
        <Search size={18} />
        {loading ? 'Поиск...' : 'Найти'}
      </button>
    </div>
  );
}