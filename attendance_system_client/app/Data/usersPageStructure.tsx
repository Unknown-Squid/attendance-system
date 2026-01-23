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
            id: "users-page-content",
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
                                                    description: "className=w-5 h-5 (DashboardIcon/EventAvailableIcon/PeopleIcon/DescriptionIcon/AdminPanelSettingsIcon)",
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
                            id: "filters-actions-section",
                            name: "div",
                            type: "container",
                            description: "bg-white dark:bg-zinc-900 rounded-lg p-4 border border-zinc-200 dark:border-zinc-800 mb-6",
                            children: [
                              {
                                id: "filters-actions-row",
                                name: "div",
                                type: "container",
                                description: "flex items-end justify-between gap-4",
                                children: [
                                  {
                                    id: "filters-container",
                                    name: "div",
                                    type: "container",
                                    description: "flex flex-col gap-4 w-[20%]",
                                    children: [
                                      {
                                        id: "role-filter-select",
                                        name: "Select",
                                        type: "component",
                                        importPath: "@/app/Components/Fields/Select",
                                        description: "label=Filter by Role value=roleFilter onChange=setRoleFilter options=[All Roles, Admin, Teacher]",
                                        children: [
                                          {
                                            id: "role-filter-wrapper",
                                            name: "div",
                                            type: "container",
                                            description: "w-full",
                                            children: [
                                              {
                                                id: "role-filter-label",
                                                name: "label",
                                                type: "element",
                                                description: "block text-sm font-medium mb-2 text-foreground",
                                              },
                                              {
                                                id: "role-filter-select-element",
                                                name: "select",
                                                type: "element",
                                                description: "name=roleFilter className=w-full px-4 py-3 rounded-lg border",
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                      {
                                        id: "search-input-container",
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
                                            children: [
                                              {
                                                id: "search-input-wrapper",
                                                name: "div",
                                                type: "container",
                                                description: "w-full",
                                                children: [
                                                  {
                                                    id: "search-input-element",
                                                    name: "input",
                                                    type: "element",
                                                    description: "type=text name=searchTerm className=w-full px-4 py-3 rounded-lg border pl-10",
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
                                    id: "action-buttons-container",
                                    name: "div",
                                    type: "container",
                                    description: "w-fit flex gap-2",
                                    children: [
                                      {
                                        id: "add-student-button",
                                        name: "Button",
                                        type: "component",
                                        importPath: "@/app/Components/Fields/Buttons",
                                        description: "onClick=handleOpenStudentModal variant=outline",
                                        children: [
                                          {
                                            id: "add-student-button-element",
                                            name: "button",
                                            type: "element",
                                            description: "type=button className=px-6 py-3 rounded-lg font-medium border-2 border-foreground text-foreground hover:bg-foreground hover:text-background",
                                            children: [
                                              {
                                                id: "add-student-icon",
                                                name: "AddIcon",
                                                type: "element",
                                                description: "className=w-5 h-5 mr-2",
                                              },
                                              {
                                                id: "add-student-text",
                                                name: "span",
                                                type: "element",
                                                description: "Add Student",
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
                                        description: "onClick=handleOpenModal variant=primary",
                                        children: [
                                          {
                                            id: "add-user-button-element",
                                            name: "button",
                                            type: "element",
                                            description: "type=button className=px-6 py-3 rounded-lg font-medium bg-foreground text-background hover:opacity-90",
                                            children: [
                                              {
                                                id: "add-user-icon",
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
                                ],
                              },
                            ],
                          },
                          {
                            id: "users-table-section",
                            name: "div",
                            type: "container",
                            description: "bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden",
                            children: [
                              {
                                id: "loading-state-users",
                                name: "div",
                                type: "container",
                                description: "p-8 text-center text-zinc-500 dark:text-zinc-400 (conditional isLoading)",
                                children: [
                                  {
                                    id: "loading-text",
                                    name: "p",
                                    type: "element",
                                    description: "Loading users...",
                                  },
                                ],
                              },
                              {
                                id: "empty-state-users",
                                name: "div",
                                type: "container",
                                description: "p-8 text-center text-zinc-500 dark:text-zinc-400 (conditional !isLoading && users.length===0)",
                                children: [
                                  {
                                    id: "empty-text",
                                    name: "p",
                                    type: "element",
                                    description: "No users found",
                                  },
                                ],
                              },
                              {
                                id: "table-container-users",
                                name: "div",
                                type: "container",
                                description: "overflow-x-auto (conditional !isLoading && users.length>0)",
                                children: [
                                  {
                                    id: "users-table",
                                    name: "table",
                                    type: "element",
                                    description: "w-full",
                                    children: [
                                      {
                                        id: "table-head-users",
                                        name: "thead",
                                        type: "element",
                                        description: "bg-zinc-100 dark:bg-zinc-800",
                                        children: [
                                          {
                                            id: "table-header-row-users",
                                            name: "tr",
                                            type: "element",
                                            children: [
                                              {
                                                id: "header-name-users",
                                                name: "th",
                                                type: "element",
                                                description: "px-6 py-3 text-left text-xs font-medium text-zinc-700 dark:text-zinc-300 uppercase tracking-wider",
                                              },
                                              {
                                                id: "header-email-users",
                                                name: "th",
                                                type: "element",
                                                description: "px-6 py-3 text-left text-xs font-medium text-zinc-700 dark:text-zinc-300 uppercase tracking-wider",
                                              },
                                              {
                                                id: "header-role-users",
                                                name: "th",
                                                type: "element",
                                                description: "px-6 py-3 text-left text-xs font-medium text-zinc-700 dark:text-zinc-300 uppercase tracking-wider",
                                              },
                                              {
                                                id: "header-department-users",
                                                name: "th",
                                                type: "element",
                                                description: "px-6 py-3 text-left text-xs font-medium text-zinc-700 dark:text-zinc-300 uppercase tracking-wider",
                                              },
                                              {
                                                id: "header-actions-users",
                                                name: "th",
                                                type: "element",
                                                description: "px-6 py-3 text-left text-xs font-medium text-zinc-700 dark:text-zinc-300 uppercase tracking-wider",
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                      {
                                        id: "table-body-users",
                                        name: "tbody",
                                        type: "element",
                                        description: "bg-white dark:bg-zinc-900 divide-y divide-zinc-200 dark:divide-zinc-800",
                                        children: [
                                          {
                                            id: "table-row-mapped-users",
                                            name: "tr",
                                            type: "element",
                                            description: "(mapped users) key=user.uuid hover:bg-zinc-50 dark:hover:bg-zinc-800",
                                            children: [
                                              {
                                                id: "cell-name-users",
                                                name: "td",
                                                type: "element",
                                                description: "px-6 py-4 whitespace-nowrap text-sm text-foreground",
                                              },
                                              {
                                                id: "cell-email-users",
                                                name: "td",
                                                type: "element",
                                                description: "px-6 py-4 whitespace-nowrap text-sm text-zinc-600 dark:text-zinc-400",
                                              },
                                              {
                                                id: "cell-role-users",
                                                name: "td",
                                                type: "element",
                                                description: "px-6 py-4 whitespace-nowrap",
                                                children: [
                                                  {
                                                    id: "role-badge",
                                                    name: "span",
                                                    type: "element",
                                                    description: "px-2 py-1 text-xs font-semibold rounded-full (conditional role colors)",
                                                  },
                                                ],
                                              },
                                              {
                                                id: "cell-department-users",
                                                name: "td",
                                                type: "element",
                                                description: "px-6 py-4 whitespace-nowrap text-sm text-zinc-600 dark:text-zinc-400",
                                              },
                                              {
                                                id: "cell-actions-users",
                                                name: "td",
                                                type: "element",
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
                                                        description: "onClick=handleOpenModal(user) className=text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 title=Edit",
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
                                                        id: "delete-button-users",
                                                        name: "button",
                                                        type: "element",
                                                        description: "onClick=handleOpenDeleteModal(user) className=text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 title=Delete (conditional user.uuid!==currentUser?.uuid)",
                                                        children: [
                                                          {
                                                            id: "delete-icon-users",
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
                    id: "create-edit-modal-users",
                    name: "Modal",
                    type: "component",
                    importPath: "@/app/Components/Modals/Modal",
                    description: "isOpen=isModalOpen onClose=handleCloseModal title=(conditional isStudentForm ? Add Student : editingUser ? Edit User : Add User)",
                    children: [
                      {
                        id: "modal-backdrop-users",
                        name: "div",
                        type: "container",
                        description: "fixed inset-0 z-50 flex items-center justify-center",
                        children: [
                          {
                            id: "backdrop-overlay-users",
                            name: "div",
                            type: "container",
                            description: "absolute inset-0 bg-black/50 backdrop-blur-sm onClick=onClose",
                          },
                          {
                            id: "modal-content-users",
                            name: "div",
                            type: "container",
                            description: "relative bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 w-full max-w-2xl max-h-[90vh] overflow-y-auto z-10 m-4",
                            children: [
                              {
                                id: "modal-header-users",
                                name: "div",
                                type: "container",
                                description: "flex items-center justify-between p-6 border-b border-zinc-200 dark:border-zinc-800",
                                children: [
                                  {
                                    id: "modal-title-container-users",
                                    name: "div",
                                    type: "container",
                                    description: "flex items-center gap-3",
                                    children: [
                                      {
                                        id: "modal-title-users",
                                        name: "h2",
                                        type: "element",
                                        description: "text-2xl font-bold text-foreground",
                                      },
                                    ],
                                  },
                                  {
                                    id: "modal-close-button-users",
                                    name: "button",
                                    type: "element",
                                    description: "onClick=onClose className=p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-600 dark:text-zinc-400 hover:text-foreground",
                                    children: [
                                      {
                                        id: "close-icon-users",
                                        name: "CloseIcon",
                                        type: "element",
                                        description: "className=w-5 h-5",
                                      },
                                    ],
                                  },
                                ],
                              },
                              {
                                id: "modal-body-users",
                                name: "div",
                                type: "container",
                                description: "p-6",
                                children: [
                                  {
                                    id: "modal-form-container",
                                    name: "div",
                                    type: "container",
                                    description: "space-y-4",
                                    children: [
                                      {
                                        id: "student-form-fields",
                                        name: "div",
                                        type: "container",
                                        description: "(conditional isStudentForm)",
                                        children: [
                                          {
                                            id: "surname-input-student",
                                            name: "Input",
                                            type: "component",
                                            importPath: "@/app/Components/Fields/Input",
                                            description: "label=Surname value=studentFormData.surname onChange=setStudentFormData error=errors.surname placeholder=Enter surname required",
                                          },
                                          {
                                            id: "first-name-input-student",
                                            name: "Input",
                                            type: "component",
                                            importPath: "@/app/Components/Fields/Input",
                                            description: "label=First Name value=studentFormData.firstName onChange=setStudentFormData error=errors.firstName placeholder=Enter first name required",
                                          },
                                          {
                                            id: "middle-name-section-student",
                                            name: "div",
                                            type: "container",
                                            description: "space-y-2",
                                            children: [
                                              {
                                                id: "middle-name-row",
                                                name: "div",
                                                type: "container",
                                                description: "flex items-center gap-3",
                                                children: [
                                                  {
                                                    id: "middle-name-input-student",
                                                    name: "Input",
                                                    type: "component",
                                                    importPath: "@/app/Components/Fields/Input",
                                                    description: "label=Middle Name value=studentFormData.middleName onChange=setStudentFormData error=errors.middleName placeholder=Enter middle name disabled=studentFormData.noMiddleName required=!studentFormData.noMiddleName className=flex-1",
                                                  },
                                                  {
                                                    id: "no-middle-name-checkbox",
                                                    name: "div",
                                                    type: "container",
                                                    description: "flex items-center gap-2 pt-7",
                                                    children: [
                                                      {
                                                        id: "checkbox-input",
                                                        name: "input",
                                                        type: "element",
                                                        description: "type=checkbox id=noMiddleName checked=studentFormData.noMiddleName onChange=handleNoMiddleNameChange className=w-4 h-4 rounded border-zinc-300",
                                                      },
                                                      {
                                                        id: "checkbox-label",
                                                        name: "label",
                                                        type: "element",
                                                        description: "htmlFor=noMiddleName className=text-sm text-foreground cursor-pointer whitespace-nowrap",
                                                      },
                                                    ],
                                                  },
                                                ],
                                              },
                                            ],
                                          },
                                          {
                                            id: "student-number-sex-grid",
                                            name: "div",
                                            type: "container",
                                            description: "grid grid-cols-2 gap-4",
                                            children: [
                                              {
                                                id: "student-number-input",
                                                name: "Input",
                                                type: "component",
                                                importPath: "@/app/Components/Fields/Input",
                                                description: "label=Student Number value=studentFormData.studentNumber onChange=setStudentFormData error=errors.studentNumber placeholder=Enter student number required",
                                              },
                                              {
                                                id: "sex-select-student",
                                                name: "Select",
                                                type: "component",
                                                importPath: "@/app/Components/Fields/Select",
                                                description: "label=Sex value=studentFormData.sex onChange=setStudentFormData options=[Male, Female, Other]",
                                              },
                                            ],
                                          },
                                          {
                                            id: "course-select-student",
                                            name: "Select",
                                            type: "component",
                                            importPath: "@/app/Components/Fields/Select",
                                            description: "label=Course value=studentFormData.course onChange=setStudentFormData error=errors.course options=[BSIT, BSCS, BSCE, BSEE] required",
                                          },
                                          {
                                            id: "year-level-section-grid",
                                            name: "div",
                                            type: "container",
                                            description: "grid grid-cols-2 gap-4",
                                            children: [
                                              {
                                                id: "year-level-select",
                                                name: "Select",
                                                type: "component",
                                                importPath: "@/app/Components/Fields/Select",
                                                description: "label=Year Level value=studentFormData.yearLevel onChange=setStudentFormData error=errors.yearLevel options=[1st Year, 2nd Year, 3rd Year, 4th Year] required",
                                              },
                                              {
                                                id: "section-select",
                                                name: "Select",
                                                type: "component",
                                                importPath: "@/app/Components/Fields/Select",
                                                description: "label=Section value=studentFormData.section onChange=setStudentFormData error=errors.section options=[Section A, Section B, Section C, Section D] required",
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                      {
                                        id: "user-form-fields",
                                        name: "div",
                                        type: "container",
                                        description: "(conditional !isStudentForm)",
                                        children: [
                                          {
                                            id: "first-name-input-user",
                                            name: "Input",
                                            type: "component",
                                            importPath: "@/app/Components/Fields/Input",
                                            description: "label=First Name value=formData.firstName onChange=setFormData error=errors.firstName",
                                          },
                                          {
                                            id: "email-input-user",
                                            name: "Input",
                                            type: "component",
                                            importPath: "@/app/Components/Fields/Input",
                                            description: "label=Email type=email value=formData.email onChange=setFormData error=errors.email",
                                          },
                                          {
                                            id: "role-select-user",
                                            name: "Select",
                                            type: "component",
                                            importPath: "@/app/Components/Fields/Select",
                                            description: "label=Role value=formData.role onChange=setFormData options=[Admin, Teacher]",
                                          },
                                          {
                                            id: "department-select-user",
                                            name: "Select",
                                            type: "component",
                                            importPath: "@/app/Components/Fields/Select",
                                            description: "label=Department value=formData.department onChange=setFormData options=[CS, IT, CE, EE]",
                                          },
                                          {
                                            id: "password-input-user",
                                            name: "Input",
                                            type: "component",
                                            importPath: "@/app/Components/Fields/Input",
                                            description: "label=(conditional editingUser ? New Password (leave empty to keep current) : Password) type=password value=formData.password onChange=setFormData error=errors.password",
                                          },
                                        ],
                                      },
                                      {
                                        id: "submit-error",
                                        name: "div",
                                        type: "container",
                                        description: "text-red-600 dark:text-red-400 text-sm (conditional errors.submit)",
                                        children: [
                                          {
                                            id: "submit-error-text",
                                            name: "p",
                                            type: "element",
                                            description: "errors.submit",
                                          },
                                        ],
                                      },
                                      {
                                        id: "modal-actions",
                                        name: "div",
                                        type: "container",
                                        description: "flex justify-end gap-3 pt-4",
                                        children: [
                                          {
                                            id: "cancel-button-modal",
                                            name: "Button",
                                            type: "component",
                                            importPath: "@/app/Components/Fields/Buttons",
                                            description: "variant=outline onClick=handleCloseModal",
                                            children: [
                                              {
                                                id: "cancel-button-element-modal",
                                                name: "button",
                                                type: "element",
                                                description: "type=button className=px-6 py-3 rounded-lg font-medium border-2 border-foreground text-foreground hover:bg-foreground hover:text-background",
                                                children: [
                                                  {
                                                    id: "cancel-text-modal",
                                                    name: "span",
                                                    type: "element",
                                                    description: "Cancel",
                                                  },
                                                ],
                                              },
                                            ],
                                          },
                                          {
                                            id: "submit-button-modal",
                                            name: "Button",
                                            type: "component",
                                            importPath: "@/app/Components/Fields/Buttons",
                                            description: "onClick=handleSubmit variant=primary",
                                            children: [
                                              {
                                                id: "submit-button-element-modal",
                                                name: "button",
                                                type: "element",
                                                description: "type=button className=px-6 py-3 rounded-lg font-medium bg-foreground text-background hover:opacity-90",
                                                children: [
                                                  {
                                                    id: "submit-text-modal",
                                                    name: "span",
                                                    type: "element",
                                                    description: "(conditional isStudentForm ? Create : editingUser ? Update : Create)",
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
                    id: "delete-confirmation-modal-users",
                    name: "ConfirmationModal",
                    type: "component",
                    importPath: "@/app/Components/Modals/ConfirmationModal",
                    description: "isOpen=isDeleteModalOpen onClose=setIsDeleteModalOpen(false) onConfirm=handleDelete title=Delete User message=(conditional deletingUser?.firstName) icon=DeleteIcon danger confirmLabel=Delete",
                    children: [
                      {
                        id: "confirmation-modal-base-users",
                        name: "Modal",
                        type: "component",
                        importPath: "@/app/Components/Modals/Modal",
                        description: "isOpen=isOpen onClose=onClose title=title icon=icon",
                        children: [
                          {
                            id: "confirmation-modal-backdrop-users",
                            name: "div",
                            type: "container",
                            description: "fixed inset-0 z-50 flex items-center justify-center",
                            children: [
                              {
                                id: "confirmation-backdrop-overlay-users",
                                name: "div",
                                type: "container",
                                description: "absolute inset-0 bg-black/50 backdrop-blur-sm onClick=onClose",
                              },
                              {
                                id: "confirmation-modal-content-users",
                                name: "div",
                                type: "container",
                                description: "relative bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 w-full max-w-2xl max-h-[90vh] overflow-y-auto z-10 m-4",
                                children: [
                                  {
                                    id: "confirmation-modal-header-users",
                                    name: "div",
                                    type: "container",
                                    description: "flex items-center justify-between p-6 border-b border-zinc-200 dark:border-zinc-800",
                                    children: [
                                      {
                                        id: "confirmation-modal-title-container-users",
                                        name: "div",
                                        type: "container",
                                        description: "flex items-center gap-3",
                                        children: [
                                          {
                                            id: "confirmation-modal-icon-users",
                                            name: "DeleteIcon",
                                            type: "element",
                                            description: "className=w-6 h-6 text-red-600 dark:text-red-400",
                                          },
                                          {
                                            id: "confirmation-modal-title-users",
                                            name: "h2",
                                            type: "element",
                                            description: "text-2xl font-bold text-foreground",
                                          },
                                        ],
                                      },
                                      {
                                        id: "confirmation-modal-close-button-users",
                                        name: "button",
                                        type: "element",
                                        description: "onClick=onClose className=p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-600 dark:text-zinc-400 hover:text-foreground",
                                        children: [
                                          {
                                            id: "confirmation-close-icon-users",
                                            name: "CloseIcon",
                                            type: "element",
                                            description: "className=w-5 h-5",
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                  {
                                    id: "confirmation-modal-body-users",
                                    name: "div",
                                    type: "container",
                                    description: "p-6",
                                    children: [
                                      {
                                        id: "confirmation-content",
                                        name: "div",
                                        type: "container",
                                        description: "space-y-6",
                                        children: [
                                          {
                                            id: "confirmation-message",
                                            name: "div",
                                            type: "container",
                                            description: "flex items-left space-y-4",
                                            children: [
                                              {
                                                id: "confirmation-message-text",
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
                                                description: "type=button variant=outline onClick=onClose",
                                                children: [
                                                  {
                                                    id: "confirmation-cancel-button-element",
                                                    name: "button",
                                                    type: "element",
                                                    description: "type=button className=px-6 py-3 rounded-lg font-medium border-2 border-foreground text-foreground hover:bg-foreground hover:text-background",
                                                    children: [
                                                      {
                                                        id: "confirmation-cancel-text",
                                                        name: "span",
                                                        type: "element",
                                                        description: "Cancel",
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
                                                description: "type=button variant=danger onClick=handleConfirm className=bg-red-600 hover:bg-red-700",
                                                children: [
                                                  {
                                                    id: "confirmation-confirm-button-element",
                                                    name: "button",
                                                    type: "element",
                                                    description: "type=button className=px-6 py-3 rounded-lg font-medium bg-red-600 text-white hover:bg-red-700",
                                                    children: [
                                                      {
                                                        id: "confirmation-confirm-text",
                                                        name: "span",
                                                        type: "element",
                                                        description: "Delete",
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
};
