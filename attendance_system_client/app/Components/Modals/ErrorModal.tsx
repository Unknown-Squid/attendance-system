"use client";

import React from "react";
import Modal from "./Modal";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
}

const ErrorModal = ({ 
  isOpen, 
  onClose, 
  title = "Error", 
  message
}: ErrorModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      icon={<ErrorOutlineIcon className="w-6 h-6 text-red-500" />}
    >
      <div className="space-y-4">
        {/* Error Icon */}
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
            <ErrorOutlineIcon className="w-10 h-10 text-red-500" />
          </div>
        </div>

        {/* Message */}
        <div className="text-center">
          <p className="text-foreground text-lg font-medium">{message}</p>
        </div>
      </div>
    </Modal>
  );
};

export default ErrorModal;
