"use client";

import React, { useEffect, useRef } from "react";
import Modal from "./Modal";
import Input from "@/app/Components/Fields/Input";
import Button from "@/app/Components/Fields/Buttons";
import QrCodeIcon from "@mui/icons-material/QrCode";

interface QrCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  qrValue: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: (value: string) => void;
}

const QrCodeModal = ({ isOpen, onClose, qrValue, onChange, onSubmit }: QrCodeModalProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      // Small delay to ensure modal is fully rendered
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="QR Code / TUPC Number"
      icon={<QrCodeIcon className="w-6 h-6" />}
    >
      <div className="space-y-4">
        <Input
          ref={inputRef}
          label="QR CODE VALUE / TUPC NUMBER"
          value={qrValue || ""}
          onChange={onChange}
          onKeyDown={(e) => {
            // Submit on Enter key
            if (e.key === 'Enter' && qrValue && onSubmit) {
              onSubmit(qrValue);
            }
          }}
          placeholder="Enter TUPC number (e.g., TUPC-20-1986) or scan QR code"
          className="font-mono text-sm"
        />
        {qrValue && onSubmit && (
          <Button
            variant="primary"
            onClick={() => onSubmit(qrValue)}
            className="w-full"
          >
            Process TUPC Number
          </Button>
        )}
      </div>
    </Modal>
  );
};

export default QrCodeModal;
