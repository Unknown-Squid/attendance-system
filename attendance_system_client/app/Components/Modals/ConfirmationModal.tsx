"use client";

import React from "react";
import Modal from "./Modal";
import Button from "@/app/Components/Buttons/Button";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  icon?: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmVariant?: "primary" | "secondary" | "outline";
  danger?: boolean;
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  icon,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  confirmVariant = "primary",
  danger = false,
}: ConfirmationModalProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} icon={icon}>
      <div className="space-y-6">
        {/* Icon and Message */}
        <div className="flex items-left space-y-4">
          <p className="text-left text-base">{message}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
          {cancelLabel && (
            <Button type="button" variant="outline" onClick={onClose}>
              {cancelLabel}
            </Button>
          )}
          <Button
            type="button"
            variant={danger ? "primary" : confirmVariant}
            onClick={handleConfirm}
            className={danger ? "bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700" : ""}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

