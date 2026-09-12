import React, { useState } from 'react';
import { Modal, DatePicker, Button } from '@/shared/components';

export interface CustomizeDateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (start: string, end: string) => void;
}

export const CustomizeDateModal: React.FC<CustomizeDateModalProps> = ({
  isOpen,
  onClose,
  onApply,
}) => {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Customize Leave Dates"
      footer={
        <>
          <Button variant="outline" onClick={onClose} size="md">
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              onApply(start, end);
              onClose();
            }}
            size="md"
          >
            Apply Dates
          </Button>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <DatePicker label="Start Date" value={start} onChange={setStart} />
        <DatePicker label="End Date" value={end} onChange={setEnd} />
      </div>
    </Modal>
  );
};
