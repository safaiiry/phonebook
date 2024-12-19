import { ReferenceItem } from '../types/referenceData';

const API_URL = 'http://localhost:5243/api/PhoneBook';

interface ReferenceDataResponse {
  items: ReferenceItem[];
}

interface AddUpdateResponse {
  id: number;
}

interface ErrorResponse {
  message: string;
}

export const referenceDataApi = {
  async search(tableName: string, value: string): Promise<ReferenceItem[]> {
    try {
      const response = await fetch(`${API_URL}/GetLikeFromTable`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tableName, value }),
      });

      if (!response.ok) {
        const errorData: ErrorResponse = await response.json();
        throw new Error(errorData.message);
      }

      const data: ReferenceDataResponse = await response.json();
      return data.items;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Произошла ошибка при получении данных');
    }
  },

  async add(tableName: string, value: string): Promise<number> {
    try {
      const response = await fetch(`${API_URL}/AddOrUpdateToTable`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: 0, tableName, value }),
      });

      if (!response.ok) {
        const errorData: ErrorResponse = await response.json();
        throw new Error(errorData.message);
      }

      const data: AddUpdateResponse = await response.json();
      return data.id;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Произошла ошибка при добавлении записи');
    }
  },

  async update(tableName: string, id: number, value: string): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/AddOrUpdateToTable`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, tableName, value }),
      });

      if (!response.ok) {
        const errorData: ErrorResponse = await response.json();
        throw new Error(errorData.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Произошла ошибка при обновлении записи');
    }
  },

  async delete(tableName: string, id: number): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/DeleteFromTable`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tableName, id }),
      });

      if (!response.ok) {
        const errorData: ErrorResponse = await response.json();
        throw new Error(errorData.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Произошла ошибка при удалении записи');
    }
  },
};