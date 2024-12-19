import { Contact, ContactFilters } from '../types/contact';

const API_URL = 'http://localhost:5243/api/PhoneBook';

export const contactsApi = {
  async getContacts(filters: ContactFilters): Promise<Contact[]> {
    try {
      const response = await fetch(`${API_URL}/GetContacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ filters: convertFilters(filters) }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      return data.contacts;
    } catch (error) {
      console.error('Error fetching contacts:', error);
      throw error;
    }
  },

  async addOrUpdateContact(contact: Contact): Promise<number> {
    try {
      const response = await fetch(`${API_URL}/AddOrUpdateContact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: contact.id,
          surname: contact.surname,
          name: contact.name,
          otch: contact.otch,
          street: contact.street,
          house: contact.house,
          corp: contact.corp,
          apart: parseInt(contact.apart) || 0,
          tel: contact.tel,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      return data.id;
    } catch (error) {
      console.error('Error saving contact:', error);
      throw error;
    }
  },

  async deleteContact(id: number): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/DeleteContact?id=${id}`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
      throw error;
    }
  },
};

function convertFilters(filters: ContactFilters): Record<string, any> {
  const converted: Record<string, any> = {};
  
  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      converted[key.toLowerCase()] = value;
    }
  });
  
  return converted;
}