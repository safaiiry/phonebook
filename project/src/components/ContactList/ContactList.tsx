import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { Contact } from '../../types/contact';

interface ContactListProps {
  contacts: Contact[];
  onEdit: (contact: Contact) => void;
  onDelete: (id: number) => void;
}

export function ContactList({ contacts, onEdit, onDelete }: ContactListProps) {
  return (
    <div className="contacts-container">
      <table className="contact-table">
        <thead>
          <tr>
            <th>ФИО</th>
            <th>Адрес</th>
            <th>Телефон</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td>
                <div className="contact-name">
                  {contact.surname} {contact.name} {contact.otch}
                </div>
              </td>
              <td>
                <div className="contact-address">
                  ул. {contact.street}, д. {contact.house}
                  {contact.corp && `, корп. ${contact.corp}`}
                  {contact.apart && `, кв. ${contact.apart}`}
                </div>
              </td>
              <td>
                <div className="contact-phone">{contact.tel}</div>
              </td>
              <td>
                <div className="action-buttons">
                  <button
                    onClick={() => contact.id && onEdit(contact)}
                    className="icon-button"
                    title="Редактировать"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => contact.id && onDelete(contact.id)}
                    className="icon-button danger"
                    title="Удалить"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {contacts.length === 0 && (
            <tr>
              <td colSpan={4} style={{ textAlign: 'center', padding: '2rem' }}>
                Контакты не найдены
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}