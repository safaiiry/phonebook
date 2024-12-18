import React, { useState, useEffect } from 'react';
import { Contact, ContactFilters } from './types/contact';
import { ContactForm } from './components/ContactForm/ContactForm';
import { ContactList } from './components/ContactList/ContactList';
import { SearchPanel } from './components/SearchPanel/SearchPanel';
import { UserPlus } from 'lucide-react';
import { contactsApi } from './api/contacts';
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

  useEffect(() => {
    handleSearch();
  }, []);

  const handleSearch = async () => {
    try {
      setLoading(true);
      const data = await contactsApi.getContacts(filters);
      setContacts(data);
    } catch (error) {
      console.error('Error searching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddOrUpdate = async () => {
    try {
      setLoading(true);
      await contactsApi.addOrUpdateContact(currentContact);
      setShowForm(false);
      setCurrentContact(emptyContact);
      handleSearch();
    } catch (error) {
      console.error('Error saving contact:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      setLoading(true);
      await contactsApi.deleteContact(id);
      handleSearch();
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  return (
    <div className="app-container">
      <div className="content-wrapper">
        <div className="header">
          <h1 className="header-title">Телефонная книга</h1>
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
        </div>

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
      </div>
    </div>
  );
}

export default App;