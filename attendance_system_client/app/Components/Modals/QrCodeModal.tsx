"use client";

import React, { useEffect, useRef } from "react";
import Modal from "./Modal";
import Input from "@/app/Components/Fields/Input";
import QrCodeIcon from "@mui/icons-material/QrCode";

interface QrCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  qrValue: string;
}

export default function QrCodeModal({ isOpen, onClose, qrValue }: QrCodeModalProps) {
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
      title="QR Code"
      icon={<QrCodeIcon className="w-6 h-6" />}
    >
      <div className="space-y-4">
        <Input
          ref={inputRef}
          label="QR CODE VALUE"
          value={qrValue || ""}
          readOnly
          className="font-mono text-sm"
        />
      </div>
    </Modal>
  );
}

