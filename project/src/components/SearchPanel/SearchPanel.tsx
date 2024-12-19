import { Search } from 'lucide-react';
import { ContactFilters } from '../../types/contact';
import { AutocompleteInput } from './AutoCompleteInput';
import { TABLE_NAMES } from '../../types/referenceData';

interface SearchPanelProps {
  filters: ContactFilters;
  onFiltersChange: (filters: ContactFilters) => void;
  onSearch: () => void;
  loading: boolean;
}

export function SearchPanel({ filters, onFiltersChange, onSearch, loading }: SearchPanelProps) {
  const handleInputChange = (field: keyof ContactFilters) => (
    value : string
  ) => {
    onFiltersChange({ ...filters, [field]: value });
  };

  return (
    <div className="search-panel">
      <div className="search-grid">
        <AutocompleteInput
          label='Фамилия'
          value={filters.surname || ''}
          onChange={handleInputChange('surname')}
          tableName={TABLE_NAMES.SURNAMES}
          placeholder='Введите фамилию'
        />
        <AutocompleteInput
          label='Имя'
          value={filters.name || ''}
          onChange={handleInputChange('name')}
          tableName={TABLE_NAMES.FIRST_NAMES}
          placeholder='Введите имя'
        />
        <AutocompleteInput
          label='Отчество'
          value={filters.otch || ''}
          onChange={handleInputChange('otch')}
          tableName={TABLE_NAMES.OTCHS}
          placeholder='Введите отчество'
        />
        <AutocompleteInput
          label='Улица'
          value={filters.street || ''}
          onChange={handleInputChange('street')}
          tableName={TABLE_NAMES.STREETS}
          placeholder='Введите улицу'
        />
        <div className="search-field">
          <label className="search-label">Дом</label>
          <input
            type="text"
            className="search-input"
            value={filters.house || ''}
            onChange={(e) => handleInputChange('house')(e.target.value)}
            placeholder="Введите номер дома"
          />
        </div>
        <div className="search-field">
          <label className="search-label">Корпус</label>
          <input
            type="text"
            className="search-input"
            value={filters.corp || ''}
            onChange={(e) => handleInputChange('corp')(e.target.value)}
            placeholder="Введите корпус"
          />
        </div>
        <div className="search-field">
          <label className="search-label">Квартира</label>
          <input
            type="text"
            className="search-input"
            value={filters.apart || ''}
            onChange={(e) => handleInputChange('apart')(e.target.value)}
            placeholder="Введите квартиру"
          />
        </div>
        <div className="search-field">
          <label className="search-label">Телефон</label>
          <input
            type="text"
            className="search-input"
            value={filters.tel || ''}
            onChange={(e) => handleInputChange('tel')(e.target.value)}
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