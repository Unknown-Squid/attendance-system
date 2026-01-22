"use client";

import { useState, useEffect } from "react";
import MainSidebar from "@/app/Components/Sidebars/MainSidebar";
import Header from "@/app/Components/Headers/Header";
import ProtectedRoute from "@/app/Components/ProtectedRoute";
import Button from "@/app/Components/Fields/Buttons";
import Input from "@/app/Components/Fields/Input";
import Select from "@/app/Components/Fields/Select";
import Modal from "@/app/Components/Modals/Modal";
import ConfirmationModal from "@/app/Components/Modals/ConfirmationModal";
import { getUsers, updateUser, deleteUser, User, UpdateUserData } from "@/app/ApiClient/users/users";
import { register } from "@/app/ApiClient/authentication/login";
import { createStudent, updateStudent, deleteStudent, Student } from "@/app/ApiClient/students/students";
import { useAuth } from "@/app/Contexts/AuthContext";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";

function UsersPageContent() {
  const [activeMenu, setActiveMenu] = useState("users");
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("");
  const { user: currentUser } = useAuth();

  // Form state for User (teacher/admin)
  const [formData, setFormData] = useState<{
    firstName: string;
    email: string;
    password: string;
    role: "admin" | "teacher";
    department: string;
  }>({
    firstName: "",
    email: "",
    password: "",
    role: "teacher",
    department: "",
  });

  // Form state for Student (Attendee)
  const [studentFormData, setStudentFormData] = useState<{
    surname: string;
    firstName: string;
    middleName: string;
    studentNumber: string;
    sex: "male" | "female" | "other";
    course: string;
    yearLevel: string;
    section: string;
    noMiddleName: boolean;
  }>({
    surname: "",
    firstName: "",
    middleName: "",
    studentNumber: "",
    sex: "male",
    course: "",
    yearLevel: "",
    section: "",
    noMiddleName: false,
  });

  const [isStudentForm, setIsStudentForm] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    loadUsers();
  }, [roleFilter, searchTerm]);

  const loadUsers = async () => {
    try {
      setIsLoading(true);
      const response = await getUsers({
        role: roleFilter || undefined,
        search: searchTerm || undefined,
      });
      if (response.success) {
        setUsers(response.users);
      }
    } catch (error) {
      console.error("Error loading users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (user?: User) => {
    setIsStudentForm(false);
    if (user) {
      setEditingUser(user);
      setFormData({
        firstName: user.firstName,
        email: user.email,
        role: user.role as "admin" | "teacher",
        password: "",
        department: user.department || "",
      });
    } else {
      setEditingUser(null);
      setFormData({
        firstName: "",
        email: "",
        password: "",
        role: "teacher",
        department: "",
      });
    }
    setErrors({});
    setIsModalOpen(true);
  };

  const handleOpenStudentModal = () => {
    setIsStudentForm(true);
    setEditingUser(null);
    setStudentFormData({
      surname: "",
      firstName: "",
      middleName: "",
      studentNumber: "",
      sex: "male",
      course: "",
      yearLevel: "",
      section: "",
      noMiddleName: false,
    });
    setErrors({});
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsStudentForm(false);
    setEditingUser(null);
    setFormData({
      firstName: "",
      email: "",
      password: "",
      role: "teacher",
      department: "",
    });
    setStudentFormData({
      surname: "",
      firstName: "",
      middleName: "",
      studentNumber: "",
      sex: "male",
      course: "",
      yearLevel: "",
      section: "",
      noMiddleName: false,
    });
    setErrors({});
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (isStudentForm) {
      // Validate student form
      if (!studentFormData.surname.trim()) {
        newErrors.surname = "Surname is required";
      }
      if (!studentFormData.firstName.trim()) {
        newErrors.firstName = "First name is required";
      }
      if (!studentFormData.noMiddleName && !studentFormData.middleName.trim()) {
        newErrors.middleName = "Middle name is required";
      }
      if (!studentFormData.studentNumber.trim()) {
        newErrors.studentNumber = "Student number is required";
      }
      if (!studentFormData.course) {
        newErrors.course = "Course is required";
      }
      if (!studentFormData.yearLevel) {
        newErrors.yearLevel = "Year level is required";
      }
      if (!studentFormData.section) {
        newErrors.section = "Section is required";
      }
    } else {
      // Validate user form
      if (!formData.firstName.trim()) {
        newErrors.firstName = "First name is required";
      }

      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Invalid email format";
      }

      if (!editingUser && !formData.password) {
        newErrors.password = "Password is required";
      } else if (formData.password && formData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      if (isStudentForm) {
        // Create student in Student table
        await createStudent({
          surname: studentFormData.surname,
          firstName: studentFormData.firstName,
          middleName: studentFormData.noMiddleName ? undefined : studentFormData.middleName,
          studentNumber: studentFormData.studentNumber,
          sex: studentFormData.sex,
          course: studentFormData.course,
          yearLevel: Number(studentFormData.yearLevel),
          section: studentFormData.section,
          status: 'active',
        });
      } else {
        // Create/Update User (teacher/admin)
        if (editingUser) {
          const updateData: UpdateUserData = {
            firstName: formData.firstName,
            email: formData.email,
            role: formData.role,
          };
          if (formData.password) {
            updateData.password = formData.password;
          }
          await updateUser(editingUser.uuid, updateData);
        } else {
          // Use registration route for creating new users
          await register({
            firstName: formData.firstName,
            email: formData.email,
            password: formData.password,
            role: formData.role,
          });
        }
      }
      handleCloseModal();
      loadUsers();
    } catch (error: any) {
      setErrors({ submit: error.message || "Failed to save" });
    }
  };

  const handleDelete = async () => {
    if (!deletingUser) return;

    try {
      await deleteUser(deletingUser.uuid);
      setIsDeleteModalOpen(false);
      setDeletingUser(null);
      loadUsers();
    } catch (error: any) {
      console.error("Error deleting user:", error);
    }
  };

  const handleOpenDeleteModal = (user: User) => {
    setDeletingUser(user);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-black">
      <MainSidebar activeMenu={activeMenu} onMenuChange={setActiveMenu} />

      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <Header title="User Management" />

          {/* Filters and Actions */}
          <div className="bg-white dark:bg-zinc-900 rounded-lg p-4 border border-zinc-200 dark:border-zinc-800 mb-6">
            <div className="flex items-end justify-between gap-4">
              {/* Filter and Search Container - Left */}
              <div className="flex flex-col gap-4 w-[20%]">
                <Select
                  label="Filter by Role"
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  options={[
                    { value: "", label: "All Roles" },
                    { value: "admin", label: "Admin" },
                    { value: "teacher", label: "Teacher" },
                  ]}
                />
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Search by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Add Buttons - Right */}
              <div className="w-fit flex gap-2">
                <Button onClick={handleOpenStudentModal} variant="outline">
                  <AddIcon className="w-5 h-5 mr-2" />
                  Add Student
                </Button>
                <Button onClick={() => handleOpenModal()}>
                  <AddIcon className="w-5 h-5 mr-2" />
                  Add User
                </Button>
              </div>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden">
            {isLoading ? (
              <div className="p-8 text-center text-zinc-500 dark:text-zinc-400">
                Loading users...
              </div>
            ) : users.length === 0 ? (
              <div className="p-8 text-center text-zinc-500 dark:text-zinc-400">
                No users found
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-zinc-100 dark:bg-zinc-800">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-zinc-900 divide-y divide-zinc-200 dark:divide-zinc-800">
                    {users.map((user) => (
                      <tr key={user.uuid} className="hover:bg-zinc-50 dark:hover:bg-zinc-800">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                          {user.firstName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-600 dark:text-zinc-400">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            user.role === 'admin' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                            user.role === 'teacher' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                            user.role === 'staff' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' :
                            'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          }`}>
                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-600 dark:text-zinc-400">
                          {user.department ? (
                            user.department === 'cs' ? 'Computer Science' :
                            user.department === 'it' ? 'Information Technology' :
                            user.department === 'ce' ? 'Computer Engineering' :
                            user.department === 'ee' ? 'Electrical Engineering' :
                            user.department
                          ) : '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleOpenModal(user)}
                              className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                              title="Edit"
                            >
                              <EditIcon className="w-5 h-5" />
                            </button>
                            {user.uuid !== currentUser?.uuid && (
                              <button
                                onClick={() => handleOpenDeleteModal(user)}
                                className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                title="Delete"
                              >
                                <DeleteIcon className="w-5 h-5" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Create/Edit User/Student Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={isStudentForm ? "Add Student" : editingUser ? "Edit User" : "Add User"}
      >
        <div className="space-y-4">
          {isStudentForm ? (
            // Student Form (Attendee)
            <>
              <Input
                label="Surname"
                value={studentFormData.surname}
                onChange={(e) => {
                  setStudentFormData({ ...studentFormData, surname: e.target.value });
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

              <Input
                label="First Name"
                value={studentFormData.firstName}
                onChange={(e) => {
                  setStudentFormData({ ...studentFormData, firstName: e.target.value });
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

              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <Input
                    label="Middle Name"
                    value={studentFormData.middleName}
                    onChange={(e) => {
                      setStudentFormData({ ...studentFormData, middleName: e.target.value });
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
                    disabled={studentFormData.noMiddleName}
                    required={!studentFormData.noMiddleName}
                    className="flex-1"
                  />
                  <div className="flex items-center gap-2 pt-7">
                    <input
                      type="checkbox"
                      id="noMiddleName"
                      checked={studentFormData.noMiddleName}
                      onChange={(e) => {
                        setStudentFormData({ ...studentFormData, noMiddleName: e.target.checked });
                        if (e.target.checked) {
                          setErrors((prev) => {
                            const newErrors = { ...prev };
                            delete newErrors.middleName;
                            return newErrors;
                          });
                        }
                      }}
                      className="w-4 h-4 rounded border-zinc-300 dark:border-zinc-700 text-foreground focus:ring-2 focus:ring-foreground/20 cursor-pointer"
                    />
                    <label htmlFor="noMiddleName" className="text-sm text-foreground cursor-pointer whitespace-nowrap">
                      No middle name?
                    </label>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Student Number"
                  value={studentFormData.studentNumber}
                  onChange={(e) => {
                    setStudentFormData({ ...studentFormData, studentNumber: e.target.value });
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
                  value={studentFormData.sex}
                  onChange={(e) => setStudentFormData({ ...studentFormData, sex: e.target.value as "male" | "female" | "other" })}
                  options={[
                    { value: "male", label: "Male" },
                    { value: "female", label: "Female" },
                    { value: "other", label: "Other" },
                  ]}
                />
              </div>

              <Select
                label="Course"
                value={studentFormData.course}
                onChange={(e) => {
                  setStudentFormData({ ...studentFormData, course: e.target.value });
                  if (errors.course) {
                    setErrors((prev) => {
                      const newErrors = { ...prev };
                      delete newErrors.course;
                      return newErrors;
                    });
                  }
                }}
                error={errors.course}
                options={[
                  { value: "", label: "Select Course" },
                  { value: "bsit", label: "BS Information Technology" },
                  { value: "bscs", label: "BS Computer Science" },
                  { value: "bsce", label: "BS Computer Engineering" },
                  { value: "bsee", label: "BS Electrical Engineering" },
                ]}
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <Select
                  label="Year Level"
                  value={studentFormData.yearLevel}
                  onChange={(e) => {
                    setStudentFormData({ ...studentFormData, yearLevel: e.target.value });
                    if (errors.yearLevel) {
                      setErrors((prev) => {
                        const newErrors = { ...prev };
                        delete newErrors.yearLevel;
                        return newErrors;
                      });
                    }
                  }}
                  error={errors.yearLevel}
                  options={[
                    { value: "", label: "Select Year Level" },
                    { value: "1", label: "1st Year" },
                    { value: "2", label: "2nd Year" },
                    { value: "3", label: "3rd Year" },
                    { value: "4", label: "4th Year" },
                  ]}
                  required
                />

                <Select
                  label="Section"
                  value={studentFormData.section}
                  onChange={(e) => {
                    setStudentFormData({ ...studentFormData, section: e.target.value });
                    if (errors.section) {
                      setErrors((prev) => {
                        const newErrors = { ...prev };
                        delete newErrors.section;
                        return newErrors;
                      });
                    }
                  }}
                  error={errors.section}
                  options={[
                    { value: "", label: "Select Section" },
                    { value: "a", label: "Section A" },
                    { value: "b", label: "Section B" },
                    { value: "c", label: "Section C" },
                    { value: "d", label: "Section D" },
                  ]}
                  required
                />
              </div>
            </>
          ) : (
            // User Form (Teacher/Admin)
            <>
              <Input
                label="First Name"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                error={errors.firstName}
              />

              <Input
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                error={errors.email}
              />

              <Select
                label="Role"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value as "admin" | "teacher" })}
                options={[
                  { value: "admin", label: "Admin" },
                  { value: "teacher", label: "Teacher" },
                ]}
              />

              <Select
                label="Department"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                options={[
                  { value: "", label: "Select Department" },
                  { value: "cs", label: "Computer Science" },
                  { value: "it", label: "Information Technology" },
                  { value: "ce", label: "Computer Engineering" },
                  { value: "ee", label: "Electrical Engineering" },
                ]}
              />

              <Input
                label={editingUser ? "New Password (leave empty to keep current)" : "Password"}
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                error={errors.password}
              />
            </>
          )}

          {errors.submit && (
            <div className="text-red-600 dark:text-red-400 text-sm">
              {errors.submit}
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              {isStudentForm ? "Create" : editingUser ? "Update" : "Create"}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeletingUser(null);
        }}
        onConfirm={handleDelete}
        title="Delete User"
        message={`Are you sure you want to delete ${deletingUser?.firstName}? This action cannot be undone.`}
        icon={<DeleteIcon />}
        danger
        confirmLabel="Delete"
      />
    </div>
  );
}

const UsersPage = () => {
  return (
    <ProtectedRoute requiredRole="admin">
      <UsersPageContent />
    </ProtectedRoute>
  );
};

export default UsersPage;

