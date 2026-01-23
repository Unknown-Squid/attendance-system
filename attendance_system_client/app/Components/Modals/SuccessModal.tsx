"use client";

import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
  duration?: number; // Auto-close duration in milliseconds (default: 2000ms)
}

const SuccessModal = ({ 
  isOpen, 
  onClose, 
  title = "Success", 
  message,
  duration = 2000 
}: SuccessModalProps) => {
  const [showCheck, setShowCheck] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Trigger check animation after a short delay
      const timer = setTimeout(() => {
        setShowCheck(true);
      }, 100);

      // Auto-close after duration
      const closeTimer = setTimeout(() => {
        onClose();
        setShowCheck(false);
      }, duration);

      return () => {
        clearTimeout(timer);
        clearTimeout(closeTimer);
      };
    } else {
      setShowCheck(false);
    }
  }, [isOpen, duration, onClose]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      icon={<CheckCircleIcon className="w-6 h-6 text-green-500" />}
    >
      <div className="space-y-4">
        {/* Animated Check Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <div
              className={`w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center transition-all duration-300 ${
                showCheck ? "scale-100 opacity-100" : "scale-0 opacity-0"
              }`}
            >
              <CheckCircleIcon
                className={`w-12 h-12 text-green-500 transition-all duration-500 ${
                  showCheck ? "scale-100 rotate-0" : "scale-0 rotate-180"
                }`}
                style={{
                  animation: showCheck ? "checkmark 0.6s ease-in-out" : "none",
                }}
              />
            </div>
            {/* Ripple effect */}
            {showCheck && (
              <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20"></div>
            )}
          </div>
        </div>

        {/* Message */}
        <div className="text-center">
          <p className="text-foreground text-lg font-medium">{message}</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes checkmark {
          0% {
            transform: scale(0) rotate(45deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.2) rotate(45deg);
            opacity: 1;
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }
      `}</style>
    </Modal>
  );
};

export default SuccessModal;
