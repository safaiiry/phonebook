import { useState } from 'react';
import { TABLE_NAMES, TABLE_LABELS } from '../../types/referenceData';
import { ReferenceDataTable } from './ReferenceDataTable';

export function ReferenceDataTabs() {
  const [activeTab, setActiveTab] = useState<keyof typeof TABLE_NAMES>('SURNAMES');

  return (
    <div className="reference-tabs">
      <div className="tabs-header">
        {Object.entries(TABLE_LABELS).map(([key, label]) => (
          <button
            key={key}
            className={`tab-button ${activeTab === key ? 'active' : ''}`}
            onClick={() => setActiveTab(key as keyof typeof TABLE_NAMES)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="tab-content">
        <ReferenceDataTable tableName={TABLE_NAMES[activeTab]} label={TABLE_LABELS[activeTab]} />
      </div>
    </div>
  );
}