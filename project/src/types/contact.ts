export interface Contact {
  id?: number;
  surname: string;
  name: string;
  otch: string;
  street: string;
  house: string;
  corp: string;
  apart: string;
  tel: string;
}

export interface ContactFilters {
  surname?: string;
  name?: string;
  otch?: string;
  street?: string;
  house?: string;
  corp?: string;
  apart?: string;
  tel?: string;
}