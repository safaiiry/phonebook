import { useEffect, useState } from 'react';
import { Contact, ContactFilters } from './types/contact';
import { ContactForm } from './components/ContactForm/ContactForm';
import { ContactList } from './components/ContactList/ContactList';
import { SearchPanel } from './components/SearchPanel/SearchPanel';
import { ReferenceDataTabs } from './components/ReferenceData/ReferenceDataTabs';
import { UserPlus } from 'lucide-react';
import { contactsApi } from './api/contacts';
import { useErrorHandler } from './hooks/useErrorHandler';
import { ErrorToast } from './components/common/ErrorToast';
import './styles/App.css';

const emptyContact: Contact = {
  surname: '',
  name: '',
  otch: '',
  street: '',
  house: '',
  corp: '',
  apart: '',
  tel: '',
};

function App() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filters, setFilters] = useState<ContactFilters>({});
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [currentContact, setCurrentContact] = useState<Contact>(emptyContact);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'contacts' | 'reference'>('contacts');
  const { error, handleError, clearError } = useErrorHandler(); 

  const handleSearch = async () => {
    try {
      setLoading(true);
      const data = await contactsApi.getContacts(filters);
      setContacts(data);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  const handleAddOrUpdate = async () => {
    try {
      setLoading(true);
      await contactsApi.addOrUpdateContact(currentContact);
      setShowForm(false);
      setCurrentContact(emptyContact);
      handleSearch();
    } catch (error) {
      handleError(error);
    }
    finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      setLoading(true);
      await contactsApi.deleteContact(id);
      handleSearch();
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="content-wrapper">
        <div className="header">
          <h1 className="header-title">Телефонная книга</h1>
          <div className="header-actions">
            <button
              onClick={() => setActiveTab(activeTab === 'contacts' ? 'reference' : 'contacts')}
              className="button button-secondary"
            >
              {activeTab === 'contacts' ? 'Справочники' : 'Контакты'}
            </button>
            {activeTab === 'contacts' && (
              <button
                onClick={() => {
                  setShowForm(true);
                  setEditingContact(null);
                  setCurrentContact(emptyContact);
                }}
                className="button button-primary"
              >
                <UserPlus size={18} />
                Добавить контакт
              </button>
            )}
          </div>
        </div>

        {activeTab === 'contacts' ? (
          <>
            <SearchPanel
              filters={filters}
              onFiltersChange={setFilters}
              onSearch={handleSearch}
              loading={loading}
            />

            {showForm && (
              <div className="modal-overlay">
                <ContactForm
                  contact={currentContact}
                  onChange={setCurrentContact}
                  onSubmit={handleAddOrUpdate}
                  onCancel={() => {
                    setShowForm(false);
                    setCurrentContact(emptyContact);
                  }}
                  isEdit={!!editingContact}
                />
              </div>
            )}

            <ContactList
              contacts={contacts}
              onEdit={(contact) => {
                setEditingContact(contact);
                setCurrentContact(contact);
                setShowForm(true);
              }}
              onDelete={handleDelete}
            />
          </>
        ) : (
          <ReferenceDataTabs />
        )}
        {error && <ErrorToast message={error} onClose={clearError}/>}
      </div>
    </div>
  );
}

export default App;