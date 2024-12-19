import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { referenceDataApi } from '../../api/referenceData';
import { ReferenceItem } from '../../types/referenceData';
import { useErrorHandler } from '../../hooks/useErrorHandler';

interface AutocompleteInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  tableName: string;
  placeholder?: string;
}

export function AutocompleteInput({
  label,
  value,
  onChange,
  tableName,
  placeholder,
}: AutocompleteInputProps) {
  const [suggestions, setSuggestions] = useState<ReferenceItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { handleError } = useErrorHandler();

  const loadSuggestions = async (searchValue: string = '') => {
    try {
      setLoading(true);
      const items = await referenceDataApi.search(tableName, searchValue);
      setSuggestions(items);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  // Загрузка начальных данных при монтировании
  useEffect(() => {
    loadSuggestions();
  }, [tableName]);

  return (
    <div className="search-field">
      <label className="search-label">{label}</label>
      <div className="autocomplete-container">
        <div 
          className="search-input-wrapper"
          onClick={() => {
            setIsOpen(!isOpen);
            if (!isOpen) {
              loadSuggestions(value);
            }
          }}
        >
          <input
            type="text"
            className="search-input with-dropdown"
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
              loadSuggestions(e.target.value);
            }}
            placeholder={placeholder}
            readOnly
          />
          <ChevronDown 
            size={20}
            className={`dropdown-icon ${isOpen ? 'open' : ''}`}
          />
        </div>
        {isOpen && (
          <ul className="autocomplete-list">
            {loading ? (
              <li className="autocomplete-loading">Загрузка...</li>
            ) : suggestions.length > 0 ? (
              suggestions.map((item) => (
                <li
                  key={item.id}
                  className="autocomplete-item"
                  onClick={() => {
                    onChange(item.value);
                    setIsOpen(false);
                  }}
                >
                  {item.value}
                </li>
              ))
            ) : (
              <li className="autocomplete-empty">Нет данных</li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}