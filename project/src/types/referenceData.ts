export interface ReferenceItem {
    id: number;
    value: string;
  }
  
  export interface TableNames {
    FIRST_NAMES: string;
    SURNAMES: string;
    OTCHS: string;
    STREETS: string;
  }
  
  export const TABLE_NAMES: TableNames = {
    FIRST_NAMES: 'first_names',
    SURNAMES: 'surnames',
    OTCHS: 'otchs',
    STREETS: 'streets',
  } as const;
  
  export const TABLE_LABELS: Record<keyof TableNames, string> = {
    FIRST_NAMES: 'Имена',
    SURNAMES: 'Фамилии',
    OTCHS: 'Отчества',
    STREETS: 'Улицы',
  };