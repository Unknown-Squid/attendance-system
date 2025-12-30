"use client";

import React, { useState } from "react";
import Modal from "./Modal";
import Input from "@/app/Components/Fields/Input";
import Select from "@/app/Components/Fields/Select";
import Button from "@/app/Components/Buttons/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

export interface AttendeeData {
  surname: string;
  firstName: string;
  middleName: string;
  studentNumber: string;
  sex: "male" | "female";
}

interface RegisterAttendeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegister: (data: AttendeeData) => void;
}

export default function RegisterAttendeeModal({
  isOpen,
  onClose,
  onRegister,
}: RegisterAttendeeModalProps) {
  const [surname, setSurname] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [studentNumber, setStudentNumber] = useState("");
  const [sex, setSex] = useState<"male" | "female">("male");
  const [noMiddleName, setNoMiddleName] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const sexOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ];

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!surname.trim()) {
      newErrors.surname = "Surname is required";
    }

    if (!firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!noMiddleName && !middleName.trim()) {
      newErrors.middleName = "Middle name is required";
    }

    if (!studentNumber.trim()) {
      newErrors.studentNumber = "Student number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    onRegister({
      surname: surname.trim(),
      firstName: firstName.trim(),
      middleName: noMiddleName ? "" : middleName.trim(),
      studentNumber: studentNumber.trim(),
      sex,
    });

    // Reset form
    setSurname("");
    setFirstName("");
    setMiddleName("");
    setStudentNumber("");
    setSex("male");
    setNoMiddleName(false);
    setErrors({});
    onClose();
  };

  const handleClose = () => {
    // Reset form on close
    setSurname("");
    setFirstName("");
    setMiddleName("");
    setStudentNumber("");
    setSex("male");
    setNoMiddleName(false);
    setErrors({});
    onClose();
  };

  const handleNoMiddleNameChange = (checked: boolean) => {
    setNoMiddleName(checked);
    if (checked) {
      setMiddleName("");
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.middleName;
        return newErrors;
      });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Register Attendee"
      icon={<PersonAddIcon className="w-6 h-6" />}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Surname */}
        <Input
          label="Surname"
          value={surname}
          onChange={(e) => {
            setSurname(e.target.value);
            if (errors.surname) {
              setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors.surname;
                return newErrors;
              });
            }
          }}
          error={errors.surname}
          placeholder="Enter surname"
          required
        />

        {/* First Name */}
        <Input
          label="First Name"
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
            if (errors.firstName) {
              setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors.firstName;
                return newErrors;
              });
            }
          }}
          error={errors.firstName}
          placeholder="Enter first name"
          required
        />

        {/* Middle Name with Checkbox */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <Input
              label="Middle Name"
              value={middleName}
              onChange={(e) => {
                setMiddleName(e.target.value);
                if (errors.middleName) {
                  setErrors((prev) => {
                    const newErrors = { ...prev };
                    delete newErrors.middleName;
                    return newErrors;
                  });
                }
              }}
              error={errors.middleName}
              placeholder="Enter middle name"
              disabled={noMiddleName}
              required={!noMiddleName}
            />
            <div className="flex items-center gap-2 pt-7">
              <input
                type="checkbox"
                id="noMiddleName"
                checked={noMiddleName}
                onChange={(e) => handleNoMiddleNameChange(e.target.checked)}
                className="w-4 h-4 rounded border-zinc-300 dark:border-zinc-700 text-foreground focus:ring-2 focus:ring-foreground/20 cursor-pointer"
              />
              <label
                htmlFor="noMiddleName"
                className="text-sm text-foreground cursor-pointer whitespace-nowrap"
              >
                No middle name?
              </label>
            </div>
          </div>
        </div>

        {/* Student Number and Sex in same row */}
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Student Number"
            value={studentNumber}
            onChange={(e) => {
              setStudentNumber(e.target.value);
              if (errors.studentNumber) {
                setErrors((prev) => {
                  const newErrors = { ...prev };
                  delete newErrors.studentNumber;
                  return newErrors;
                });
              }
            }}
            error={errors.studentNumber}
            placeholder="Enter student number"
            required
          />

          <Select
            label="Sex"
            value={sex}
            onChange={(e) => setSex(e.target.value as "male" | "female")}
            options={sexOptions}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
          <Button type="button" variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Register
          </Button>
        </div>
      </form>
    </Modal>
  );
}

