import { ComponentInfo } from "./types";

export const usersPageStructure: ComponentInfo = {
    id: "users-page",
    name: "UsersPage",
    type: "page",
    children: [
      {
        id: "protected-route-users",
        name: "ProtectedRoute",
        type: "component",
        importPath: "@/app/Components/ProtectedRoute",
        description: "requiredRole=admin",
        children: [
          {
            id: "users-content",
            name: "UsersPageContent",
            type: "component",
            importPath: "@/app/(Pages)/users/page.tsx",
            children: [
              {
                id: "users-root-div",
                name: "div",
                type: "container",
                description: "flex min-h-screen bg-zinc-50 dark:bg-black",
                children: [
                  {
                    id: "main-sidebar-users",
                    name: "MainSidebar",
                    type: "component",
                    importPath: "@/app/Components/Sidebars/MainSidebar",
                    description: "activeMenu=activeMenu onMenuChange=setActiveMenu",
                    children: [
                      {
                        id: "sidebar-aside-users",
                        name: "aside",
                        type: "container",
                        description: "w-64 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 flex flex-col",
                        children: [
                          {
                            id: "logo-section-users",
                            name: "LogoSection",
                            type: "section",
                            importPath: "@/app/Components/Sections/Main Sidebar/LogoSection",
                            children: [
                              {
                                id: "logo-container-sidebar-users",
                                name: "div",
                                type: "container",
                                description: "p-6 border-b border-zinc-200 dark:border-zinc-800",
                                children: [
                                  {
                                    id: "logo-content-sidebar-users",
                                    name: "div",
                                    type: "container",
                                    description: "flex items-center gap-3",
                                    children: [
                                      {
                                        id: "logo-icon-sidebar-users",
                                        name: "LogoIcon",
                                        type: "component",
                                        importPath: "@/app/Components/Icons/LogoIcon",
                                        description: "className=w-8 h-8 text-foreground",
                                      },
                                      {
                                        id: "logo-text-sidebar-users",
                                        name: "div",
                                        type: "container",
                                        children: [
                                          {
                                            id: "logo-title-sidebar-users",
                                            name: "h1",
                                            type: "element",
                                            description: "text-lg font-bold text-foreground",
                                          },
                                          {
                                            id: "logo-subtitle-sidebar-users",
                                            name: "p",
                                            type: "element",
                                            description: "text-xs text-zinc-500 dark:text-zinc-400",
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                ],
                              },
                            ],
                          },
                          {
                            id: "navigation-menu-users",
                            name: "NavigationMenu",
                            type: "component",
                            importPath: "@/app/Components/Menu/NavigationMenu",
                            description: "activeMenu=activeMenu onMenuChange=onMenuChange",
                            children: [
                              {
                                id: "nav-element-sidebar-users",
                                name: "nav",
                                type: "element",
                                description: "flex-1 p-4",
                                children: [
                                  {
                                    id: "menu-list-sidebar-users",
                                    name: "ul",
                                    type: "element",
                                    description: "space-y-2",
                                    children: [
                                      {
                                        id: "navigation-menu-items-users",
                                        name: "NavigationMenuItems",
                                        type: "component",
                                        importPath: "@/app/Components/Menu/Menu Items/NavigationMenuItems",
                                        description: "activeMenu=activeMenu onMenuClick=handleMenuClick",
                                        children: [
                                          {
                                            id: "menu-item-li-users",
                                            name: "li",
                                            type: "element",
                                            description: "(mapped menuItems)",
                                            children: [
                                              {
                                                id: "menu-item-button-users",
                                                name: "button",
                                                type: "element",
                                                description: "onClick=onMenuClick className=w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors (conditional active styling)",
                                                children: [
                                                  {
                                                    id: "menu-item-icon-users",
                                                    name: "IconComponent",
                                                    type: "element",
                                                    description: "className=w-5 h-5",
                                                  },
                                                  {
                                                    id: "menu-item-label-users",
                                                    name: "span",
                                                    type: "element",
                                                    description: "className=font-medium",
                                                  },
                                                ],
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                ],
                              },
                            ],
                          },
                          {
                            id: "logout-section-users",
                            name: "LogoutSection",
                            type: "section",
                            importPath: "@/app/Components/Sections/Main Sidebar/LogoutSection",
                            children: [
                              {
                                id: "logout-container-sidebar-users",
                                name: "div",
                                type: "container",
                                description: "p-4 border-t border-zinc-200 dark:border-zinc-800",
                                children: [
                                  {
                                    id: "user-info-sidebar-users",
                                    name: "div",
                                    type: "container",
                                    description: "mb-3 px-4",
                                    children: [
                                      {
                                        id: "user-name-sidebar-users",
                                        name: "p",
                                        type: "element",
                                        description: "text-sm font-medium text-foreground",
                                      },
                                      {
                                        id: "user-email-sidebar-users",
                                        name: "p",
                                        type: "element",
                                        description: "text-xs text-zinc-500 dark:text-zinc-400",
                                      },
                                    ],
                                  },
                                  {
                                    id: "logout-button-sidebar-users",
                                    name: "Button",
                                    type: "component",
                                    importPath: "@/app/Components/Fields/Buttons",
                                    description: "variant=outline onClick=handleLogout className=w-full",
                                    children: [
                                      {
                                        id: "logout-button-element-sidebar-users",
                                        name: "button",
                                        type: "element",
                                        description: "type=button className=px-6 py-3 rounded-lg font-medium border-2 border-foreground",
                                        children: [
                                          {
                                            id: "logout-button-text-sidebar-users",
                                            name: "span",
                                            type: "element",
                                            description: "Logout",
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
              {
                id: "main-content-users",
                name: "main",
                type: "container",
                description: "flex-1 overflow-y-auto",
                children: [
                  {
                    id: "content-wrapper-users",
                    name: "div",
                    type: "container",
                    description: "p-8",
                    children: [
                      {
                        id: "users-header",
                        name: "Header",
                        type: "component",
                        importPath: "@/app/Components/Headers/Header",
                        description: "title=User Management",
                        children: [
                          {
                            id: "header-container-users",
                            name: "div",
                            type: "container",
                            description: "mb-8 flex justify-between items-center h-fit w-full",
                            children: [
                              {
                                id: "header-left-users",
                                name: "div",
                                type: "container",
                                children: [
                                  {
                                    id: "header-title-users",
                                    name: "h2",
                                    type: "element",
                                    description: "text-3xl font-bold text-foreground mb-2",
                                  },
                                  {
                                    id: "header-subtitle-users",
                                    name: "p",
                                    type: "element",
                                    description: "text-zinc-600 dark:text-zinc-400 (conditional subtitle)",
                                  },
                                ],
                              },
                              {
                                id: "header-right-users",
                                name: "div",
                                type: "container",
                                description: "mb-3 px-4 gap-4 flex h-full justify-center items-center",
                                children: [
                                  {
                                    id: "user-info-header-users",
                                    name: "div",
                                    type: "container",
                                    description: "h-fit w-fit flex flex-col",
                                    children: [
                                      {
                                        id: "user-name-header-users",
                                        name: "p",
                                        type: "element",
                                        description: "text-sm font-medium text-foreground",
                                      },
                                      {
                                        id: "user-email-header-users",
                                        name: "p",
                                        type: "element",
                                        description: "text-xs text-zinc-500 dark:text-zinc-400",
                                      },
                                    ],
                                  },
                                  {
                                    id: "avatar-container-users",
                                    name: "div",
                                    type: "container",
                                    description: "w-[50px] h-[50px] rounded-full overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center",
                                    children: [
                                      {
                                        id: "person-icon-users",
                                        name: "PersonIcon",
                                        type: "element",
                                        description: "className=w-8 h-8 text-zinc-600 dark:text-zinc-400",
                                      },
                                    ],
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        id: "filters-actions",
                        name: "div",
                        type: "container",
                        description: "bg-white dark:bg-zinc-900 rounded-lg p-4 border border-zinc-200 dark:border-zinc-800 mb-6",
                        children: [
                          {
                            id: "filters-container",
                            name: "div",
                            type: "container",
                            description: "flex items-end justify-between gap-4",
                            children: [
                              {
                                id: "filter-search-left",
                                name: "div",
                                type: "container",
                                description: "flex flex-col gap-4 w-[20%]",
                                children: [
                                  {
                                    id: "role-filter",
                                    name: "Select",
                                    type: "component",
                                    importPath: "@/app/Components/Fields/Select",
                                    description: "label=Filter by Role value=roleFilter onChange=setRoleFilter options=[All Roles, Admin, Teacher, Student, Staff]",
                                  },
                                  {
                                    id: "search-container",
                                    name: "div",
                                    type: "container",
                                    description: "relative",
                                    children: [
                                      {
                                        id: "search-icon",
                                        name: "SearchIcon",
                                        type: "element",
                                        description: "className=absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 w-5 h-5",
                                      },
                                      {
                                        id: "search-input",
                                        name: "Input",
                                        type: "component",
                                        importPath: "@/app/Components/Fields/Input",
                                        description: "type=text placeholder=Search by name or email... value=searchTerm onChange=setSearchTerm className=pl-10",
                                      },
                                    ],
                                  },
                                ],
                              },
                              {
                                id: "add-user-button",
                                name: "Button",
                                type: "component",
                                importPath: "@/app/Components/Fields/Buttons",
                                description: "onClick=handleOpenModal className=w-fit",
                                children: [
                                  {
                                    id: "add-icon-button",
                                    name: "AddIcon",
                                    type: "element",
                                    description: "className=w-5 h-5 mr-2",
                                  },
                                  {
                                    id: "add-user-text",
                                    name: "span",
                                    type: "element",
                                    description: "Add User",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        id: "users-table-container",
                        name: "div",
                        type: "container",
                        description: "bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden",
                        children: [
                          {
                            id: "loading-state-users",
                            name: "div",
                            type: "container",
                            description: "p-8 text-center text-zinc-500 (conditional isLoading)",
                          },
                          {
                            id: "empty-state-users",
                            name: "div",
                            type: "container",
                            description: "p-8 text-center text-zinc-500 (conditional users.length===0)",
                          },
                          {
                            id: "table-wrapper",
                            name: "div",
                            type: "container",
                            description: "overflow-x-auto",
                            children: [
                              {
                                id: "users-table",
                                name: "table",
                                type: "element",
                                description: "w-full",
                                children: [
                                  {
                                    id: "table-head",
                                    name: "thead",
                                    type: "element",
                                    description: "bg-zinc-100 dark:bg-zinc-800",
                                    children: [
                                      {
                                        id: "table-row-head",
                                        name: "tr",
                                        type: "element",
                                        children: [
                                          {
                                            id: "th-name",
                                            name: "th",
                                            type: "element",
                                            description: "px-6 py-3 text-left text-xs font-medium text-zinc-700 uppercase tracking-wider",
                                          },
                                          {
                                            id: "th-email",
                                            name: "th",
                                            type: "element",
                                            description: "px-6 py-3 text-left text-xs font-medium text-zinc-700 uppercase tracking-wider",
                                          },
                                          {
                                            id: "th-role",
                                            name: "th",
                                            type: "element",
                                            description: "px-6 py-3 text-left text-xs font-medium text-zinc-700 uppercase tracking-wider",
                                          },
                                          {
                                            id: "th-actions",
                                            name: "th",
                                            type: "element",
                                            description: "px-6 py-3 text-left text-xs font-medium text-zinc-700 uppercase tracking-wider",
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                  {
                                    id: "table-body",
                                    name: "tbody",
                                    type: "element",
                                    description: "bg-white dark:bg-zinc-900 divide-y divide-zinc-200 dark:divide-zinc-800",
                                    children: [
                                      {
                                        id: "table-row",
                                        name: "tr",
                                        type: "element",
                                        description: "hover:bg-zinc-50 dark:hover:bg-zinc-800 (mapped)",
                                        children: [
                                          {
                                            id: "td-name",
                                            name: "td",
                                            type: "element",
                                            description: "px-6 py-4 whitespace-nowrap text-sm text-foreground",
                                          },
                                          {
                                            id: "td-email",
                                            name: "td",
                                            type: "element",
                                            description: "px-6 py-4 whitespace-nowrap text-sm text-zinc-600",
                                          },
                                          {
                                            id: "td-role",
                                            name: "td",
                                            type: "container",
                                            description: "px-6 py-4 whitespace-nowrap",
                                            children: [
                                              {
                                                id: "role-badge",
                                                name: "span",
                                                type: "element",
                                                description: "px-2 py-1 text-xs font-semibold rounded-full",
                                              },
                                            ],
                                          },
                                          {
                                            id: "td-actions",
                                            name: "td",
                                            type: "container",
                                            description: "px-6 py-4 whitespace-nowrap text-sm font-medium",
                                            children: [
                                              {
                                                id: "actions-container",
                                                name: "div",
                                                type: "container",
                                                description: "flex items-center gap-2",
                                                children: [
                                                  {
                                                    id: "edit-button",
                                                    name: "button",
                                                    type: "element",
                                                    description: "onClick=handleOpenModal className=text-blue-600 hover:text-blue-900 title=Edit",
                                                    children: [
                                                      {
                                                        id: "edit-icon",
                                                        name: "EditIcon",
                                                        type: "element",
                                                        description: "className=w-5 h-5",
                                                      },
                                                    ],
                                                  },
                                                  {
                                                    id: "delete-button",
                                                    name: "button",
                                                    type: "element",
                                                    description: "onClick=handleOpenDeleteModal className=text-red-600 hover:text-red-900 title=Delete (conditional user.uuid !== currentUser?.uuid)",
                                                    children: [
                                                      {
                                                        id: "delete-icon",
                                                        name: "DeleteIcon",
                                                        type: "element",
                                                        description: "className=w-5 h-5",
                                                      },
                                                    ],
                                                  },
                                                ],
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                id: "create-edit-modal",
                name: "Modal",
                type: "component",
                importPath: "@/app/Components/Modals/Modal",
                description: "isOpen=isModalOpen onClose=handleCloseModal title=editingUser ? Edit User : Add User",
                children: [
                  {
                    id: "modal-backdrop",
                    name: "div",
                    type: "container",
                    description: "fixed inset-0 z-50 flex items-center justify-center",
                    children: [
                      {
                        id: "backdrop-overlay",
                        name: "div",
                        type: "container",
                        description: "absolute inset-0 bg-black/50 backdrop-blur-sm onClick=onClose",
                      },
                      {
                        id: "modal-content",
                        name: "div",
                        type: "container",
                        description: "relative bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 w-full max-w-2xl max-h-[90vh] overflow-y-auto z-10 m-4",
                        children: [
                          {
                            id: "modal-header",
                            name: "div",
                            type: "container",
                            description: "flex items-center justify-between p-6 border-b border-zinc-200 dark:border-zinc-800",
                            children: [
                              {
                                id: "modal-title-container",
                                name: "div",
                                type: "container",
                                description: "flex items-center gap-3",
                                children: [
                                  {
                                    id: "modal-icon",
                                    name: "icon",
                                    type: "element",
                                    description: "(conditional)",
                                  },
                                  {
                                    id: "modal-title",
                                    name: "h2",
                                    type: "element",
                                    description: "text-2xl font-bold text-foreground",
                                  },
                                ],
                              },
                              {
                                id: "modal-close-button",
                                name: "button",
                                type: "element",
                                description: "onClick=onClose className=p-2 rounded-lg hover:bg-zinc-100",
                                children: [
                                  {
                                    id: "close-icon",
                                    name: "CloseIcon",
                                    type: "element",
                                    description: "className=w-5 h-5",
                                  },
                                ],
                              },
                            ],
                          },
                          {
                            id: "modal-body",
                            name: "div",
                            type: "container",
                            description: "p-6",
                            children: [
                              {
                                id: "form-fields",
                                name: "div",
                                type: "container",
                                description: "space-y-4",
                                children: [
                                  {
                                    id: "first-name-input",
                                    name: "Input",
                                    type: "component",
                                    importPath: "@/app/Components/Fields/Input",
                                    description: "label=First Name value=formData.firstName onChange=setFormData error=errors.firstName",
                                    children: [
                                      {
                                        id: "input-wrapper-firstname-modal",
                                        name: "div",
                                        type: "container",
                                        description: "w-full",
                                        children: [
                                          {
                                            id: "input-label-firstname-modal",
                                            name: "label",
                                            type: "element",
                                            description: "block text-sm font-medium mb-2 text-foreground",
                                          },
                                          {
                                            id: "input-element-firstname-modal",
                                            name: "input",
                                            type: "element",
                                            description: "w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 focus:border-foreground focus:ring-2 focus:ring-foreground/20 bg-white dark:bg-zinc-900 text-foreground placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none transition-colors",
                                          },
                                          {
                                            id: "input-error-firstname-modal",
                                            name: "p",
                                            type: "element",
                                            description: "mt-1 text-sm text-red-500 dark:text-red-400 (conditional error)",
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                  {
                                    id: "email-input-modal",
                                    name: "Input",
                                    type: "component",
                                    importPath: "@/app/Components/Fields/Input",
                                    description: "label=Email type=email value=formData.email onChange=setFormData error=errors.email",
                                    children: [
                                      {
                                        id: "input-wrapper-email-modal",
                                        name: "div",
                                        type: "container",
                                        description: "w-full",
                                        children: [
                                          {
                                            id: "input-label-email-modal",
                                            name: "label",
                                            type: "element",
                                            description: "block text-sm font-medium mb-2 text-foreground",
                                          },
                                          {
                                            id: "input-element-email-modal",
                                            name: "input",
                                            type: "element",
                                            description: "type=email w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 focus:border-foreground focus:ring-2 focus:ring-foreground/20 bg-white dark:bg-zinc-900 text-foreground placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none transition-colors",
                                          },
                                          {
                                            id: "input-error-email-modal",
                                            name: "p",
                                            type: "element",
                                            description: "mt-1 text-sm text-red-500 dark:text-red-400 (conditional error)",
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                  {
                                    id: "role-select",
                                    name: "Select",
                                    type: "component",
                                    importPath: "@/app/Components/Fields/Select",
                                    description: "label=Role value=formData.role onChange=setFormData options=[Admin, Teacher, Student, Staff]",
                                    children: [
                                      {
                                        id: "select-wrapper-role-modal",
                                        name: "div",
                                        type: "container",
                                        description: "w-full",
                                        children: [
                                          {
                                            id: "select-label-role-modal",
                                            name: "label",
                                            type: "element",
                                            description: "block text-sm font-medium mb-2 text-foreground",
                                          },
                                          {
                                            id: "select-element-role-modal",
                                            name: "select",
                                            type: "element",
                                            description: "w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 focus:border-foreground focus:ring-2 focus:ring-foreground/20 bg-white dark:bg-zinc-900 text-foreground focus:outline-none transition-colors",
                                            children: [
                                              {
                                                id: "select-option-role-modal",
                                                name: "option",
                                                type: "element",
                                                description: "(mapped options) key=value-index value=option.value",
                                              },
                                            ],
                                          },
                                          {
                                            id: "select-error-role-modal",
                                            name: "p",
                                            type: "element",
                                            description: "mt-1 text-sm text-red-500 dark:text-red-400 (conditional error)",
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                  {
                                    id: "password-input-modal",
                                    name: "Input",
                                    type: "component",
                                    importPath: "@/app/Components/Fields/Input",
                                    description: "label=New Password (leave empty to keep current) / Password type=password value=formData.password onChange=setFormData error=errors.password",
                                    children: [
                                      {
                                        id: "input-wrapper-password-modal",
                                        name: "div",
                                        type: "container",
                                        description: "w-full",
                                        children: [
                                          {
                                            id: "input-label-password-modal",
                                            name: "label",
                                            type: "element",
                                            description: "block text-sm font-medium mb-2 text-foreground",
                                          },
                                          {
                                            id: "input-element-password-modal",
                                            name: "input",
                                            type: "element",
                                            description: "type=password w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 focus:border-foreground focus:ring-2 focus:ring-foreground/20 bg-white dark:bg-zinc-900 text-foreground placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none transition-colors",
                                          },
                                          {
                                            id: "input-error-password-modal",
                                            name: "p",
                                            type: "element",
                                            description: "mt-1 text-sm text-red-500 dark:text-red-400 (conditional error)",
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                  {
                                    id: "submit-error",
                                    name: "div",
                                    type: "container",
                                    description: "text-red-600 dark:text-red-400 text-sm (conditional errors.submit)",
                                  },
                                  {
                                    id: "modal-actions",
                                    name: "div",
                                    type: "container",
                                    description: "flex justify-end gap-3 pt-4",
                                    children: [
                                      {
                                        id: "cancel-button",
                                        name: "Button",
                                        type: "component",
                                        importPath: "@/app/Components/Fields/Buttons",
                                        description: "variant=outline onClick=handleCloseModal",
                                        children: [
                                          {
                                            id: "cancel-text",
                                            name: "span",
                                            type: "element",
                                            description: "Cancel",
                                          },
                                        ],
                                      },
                                      {
                                        id: "submit-button-modal",
                                        name: "Button",
                                        type: "component",
                                        importPath: "@/app/Components/Fields/Buttons",
                                        description: "onClick=handleSubmit",
                                        children: [
                                          {
                                            id: "submit-text",
                                            name: "span",
                                            type: "element",
                                            description: "Update / Create",
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                id: "delete-confirmation-modal",
                name: "ConfirmationModal",
                type: "component",
                importPath: "@/app/Components/Modals/ConfirmationModal",
                description: "isOpen=isDeleteModalOpen onClose=handleCloseDeleteModal onConfirm=handleDelete title=Delete User message=Are you sure you want to delete... icon=DeleteIcon danger confirmLabel=Delete",
                children: [
                  {
                    id: "confirmation-modal-wrapper",
                    name: "Modal",
                    type: "component",
                    importPath: "@/app/Components/Modals/Modal",
                    description: "isOpen=isOpen onClose=onClose title=title icon=icon",
                    children: [
                      {
                        id: "confirmation-modal-backdrop",
                        name: "div",
                        type: "container",
                        description: "fixed inset-0 z-50 flex items-center justify-center",
                        children: [
                          {
                            id: "confirmation-backdrop-overlay",
                            name: "div",
                            type: "container",
                            description: "absolute inset-0 bg-black/50 backdrop-blur-sm onClick=onClose",
                          },
                          {
                            id: "confirmation-modal-content",
                            name: "div",
                            type: "container",
                            description: "relative bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 w-full max-w-2xl max-h-[90vh] overflow-y-auto z-10 m-4",
                            children: [
                              {
                                id: "confirmation-modal-header",
                                name: "div",
                                type: "container",
                                description: "flex items-center justify-between p-6 border-b border-zinc-200 dark:border-zinc-800",
                                children: [
                                  {
                                    id: "confirmation-modal-title-container",
                                    name: "div",
                                    type: "container",
                                    description: "flex items-center gap-3",
                                    children: [
                                      {
                                        id: "confirmation-modal-icon",
                                        name: "div",
                                        type: "container",
                                        description: "text-foreground (conditional icon)",
                                      },
                                      {
                                        id: "confirmation-modal-title",
                                        name: "h2",
                                        type: "element",
                                        description: "text-2xl font-bold text-foreground",
                                      },
                                    ],
                                  },
                                  {
                                    id: "confirmation-modal-close-button",
                                    name: "button",
                                    type: "element",
                                    description: "onClick=onClose className=p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-600 dark:text-zinc-400 hover:text-foreground",
                                    children: [
                                      {
                                        id: "confirmation-close-icon",
                                        name: "CloseIcon",
                                        type: "element",
                                        description: "className=w-5 h-5",
                                      },
                                    ],
                                  },
                                ],
                              },
                              {
                                id: "confirmation-modal-body",
                                name: "div",
                                type: "container",
                                description: "p-6",
                                children: [
                                  {
                                    id: "confirmation-content-wrapper",
                                    name: "div",
                                    type: "container",
                                    description: "space-y-6",
                                    children: [
                                      {
                                        id: "confirmation-message-container",
                                        name: "div",
                                        type: "container",
                                        description: "flex items-left space-y-4",
                                        children: [
                                          {
                                            id: "confirmation-message",
                                            name: "p",
                                            type: "element",
                                            description: "text-left text-base",
                                          },
                                        ],
                                      },
                                      {
                                        id: "confirmation-actions",
                                        name: "div",
                                        type: "container",
                                        description: "flex justify-end gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-800",
                                        children: [
                                          {
                                            id: "confirmation-cancel-button",
                                            name: "Button",
                                            type: "component",
                                            importPath: "@/app/Components/Fields/Buttons",
                                            description: "type=button variant=outline onClick=onClose (conditional cancelLabel)",
                                            children: [
                                              {
                                                id: "confirmation-cancel-button-element",
                                                name: "button",
                                                type: "element",
                                                description: "type=button className=px-6 py-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed border-2 border-foreground text-foreground hover:bg-foreground hover:text-background focus:ring-foreground",
                                                children: [
                                                  {
                                                    id: "confirmation-cancel-text",
                                                    name: "span",
                                                    type: "element",
                                                    description: "cancelLabel",
                                                  },
                                                ],
                                              },
                                            ],
                                          },
                                          {
                                            id: "confirmation-confirm-button",
                                            name: "Button",
                                            type: "component",
                                            importPath: "@/app/Components/Fields/Buttons",
                                            description: "type=button variant=(danger ? primary : confirmVariant) onClick=handleConfirm className=(danger ? bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700 : '')",
                                            children: [
                                              {
                                                id: "confirmation-confirm-button-element",
                                                name: "button",
                                                type: "element",
                                                description: "type=button className=px-6 py-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed bg-foreground text-background hover:bg-[#383838] dark:hover:bg-[#ccc] focus:ring-foreground (conditional danger styling)",
                                                children: [
                                                  {
                                                    id: "confirmation-confirm-text",
                                                    name: "span",
                                                    type: "element",
                                                    description: "confirmLabel",
                                                  },
                                                ],
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
;