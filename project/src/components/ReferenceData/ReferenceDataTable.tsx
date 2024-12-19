import { useState, useEffect } from 'react';
import { Pencil, Plus, Search, Trash2 } from 'lucide-react';
import { referenceDataApi } from '../../api/referenceData';
import { ReferenceItem } from '../../types/referenceData';
import { EditReferenceItemModal } from './EditReferenceItemModal';
import { useErrorHandler } from '../../hooks/useErrorHandler';
import { ErrorToast } from '../common/ErrorToast';

interface Props {
  tableName: string;
  label: string;
}

export function ReferenceDataTable({ tableName, label }: Props) {
  const [items, setItems] = useState<ReferenceItem[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [editItem, setEditItem] = useState<ReferenceItem | null>(null);
  const [newValue, setNewValue] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { error, handleError, clearError } = useErrorHandler();

  const loadItems = async () => {
    try {
      setLoading(true);
      const data = await referenceDataApi.search(tableName, searchValue);
      setItems(data);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, [tableName, searchValue]);

  const handleAdd = async () => {
    if (!newValue.trim()) return;
    try {
      await referenceDataApi.add(tableName, newValue);
      setNewValue('');
      loadItems();
    } catch (error) {
      handleError(error);
    }
  };

  const handleUpdate = async () => {
    if (!editItem || !newValue.trim()) return;
    try {
      await referenceDataApi.update(tableName, editItem.id, newValue);
      setIsEditModalOpen(false);
      setEditItem(null);
      loadItems();
    } catch (error) {
      handleError(error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await referenceDataApi.delete(tableName, id);
      loadItems();
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="reference-table">
      <div className="reference-header">
        <h2>{label}</h2>
        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Поиск..."
            className="search-input"
          />
        </div>
      </div>

      <div className="add-form">
        <input
          type="text"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          placeholder="Добавить новое значение"
          className="add-input"
        />
        <button onClick={handleAdd} className="button button-primary">
          <Plus size={18} />
          Добавить
        </button>
      </div>

      <div className="items-list">
        {loading ? (
          <div className="loading">Загрузка...</div>
        ) : (
          <table>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.value}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        onClick={() => {
                          setEditItem(item);
                          setIsEditModalOpen(true);
                        }}
                        className="icon-button"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="icon-button danger"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <EditReferenceItemModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditItem(null);
        }}
        onSave={handleUpdate}
        initialValue={editItem?.value || ''}
      />

      {error && <ErrorToast message={error} onClose={clearError} />}
    </div>
  );
}