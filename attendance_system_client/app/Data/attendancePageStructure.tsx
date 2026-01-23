import { ComponentInfo } from "./types";

export const attendancePageStructure: ComponentInfo = {
    id: "attendance-page",
    name: "AttendancePage",
    type: "page",
    children: [
      {
        id: "protected-route-attendance",
        name: "ProtectedRoute",
        type: "component",
        importPath: "@/app/Components/ProtectedRoute",
        children: [
          {
            id: "attendance-content",
            name: "AttendancePageContent",
            type: "component",
            importPath: "@/app/(Pages)/attendance/page.tsx",
            children: [
              {
                id: "attendance-root-div",
                name: "div",
                type: "container",
                description: "flex min-h-screen bg-zinc-50 dark:bg-black",
                children: [
                  {
                    id: "main-sidebar-attendance",
                    name: "MainSidebar",
                    type: "component",
                    importPath: "@/app/Components/Sidebars/MainSidebar",
                    description: "activeMenu=activeMenu onMenuChange=setActiveMenu",
                    children: [
                      {
                        id: "sidebar-aside",
                        name: "aside",
                        type: "container",
                        description: "w-64 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 flex flex-col",
                        children: [
                          {
                            id: "logo-section-attendance",
                            name: "LogoSection",
                            type: "section",
                            importPath: "@/app/Components/Sections/Main Sidebar/LogoSection",
                            children: [
                              {
                                id: "logo-container-sidebar",
                                name: "div",
                                type: "container",
                                description: "p-6 border-b border-zinc-200 dark:border-zinc-800",
                                children: [
                                  {
                                    id: "logo-content-sidebar",
                                    name: "div",
                                    type: "container",
                                    description: "flex items-center gap-3",
                                    children: [
                                      {
                                        id: "logo-icon-sidebar",
                                        name: "LogoIcon",
                                        type: "component",
                                        importPath: "@/app/Components/Icons/LogoIcon",
                                        description: "className=w-8 h-8 text-foreground",
                                      },
                                      {
                                        id: "logo-text-sidebar",
                                        name: "div",
                                        type: "container",
                                        children: [
                                          {
                                            id: "logo-title-sidebar",
                                            name: "h1",
                                            type: "element",
                                            description: "text-lg font-bold text-foreground",
                                          },
                                          {
                                            id: "logo-subtitle-sidebar",
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
                            id: "navigation-menu-attendance",
                            name: "NavigationMenu",
                            type: "component",
                            importPath: "@/app/Components/Menu/NavigationMenu",
                            description: "activeMenu=activeMenu onMenuChange=onMenuChange",
                            children: [
                              {
                                id: "nav-element-sidebar",
                                name: "nav",
                                type: "element",
                                description: "flex-1 p-4",
                                children: [
                                  {
                                    id: "menu-list-sidebar",
                                    name: "ul",
                                    type: "element",
                                    description: "space-y-2",
                                    children: [
                                      {
                                        id: "navigation-menu-items-attendance",
                                        name: "NavigationMenuItems",
                                        type: "component",
                                        importPath: "@/app/Components/Menu/Menu Items/NavigationMenuItems",
                                        description: "activeMenu=activeMenu onMenuClick=handleMenuClick",
                                        children: [
                                          {
                                            id: "menu-item-li",
                                            name: "li",
                                            type: "element",
                                            description: "(mapped menuItems)",
                                            children: [
                                              {
                                                id: "menu-item-button",
                                                name: "button",
                                                type: "element",
                                                description: "onClick=onMenuClick className=w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors (conditional active styling)",
                                                children: [
                                                  {
                                                    id: "menu-item-icon",
                                                    name: "IconComponent",
                                                    type: "element",
                                                    description: "className=w-5 h-5 (DashboardIcon/EventAvailableIcon/PeopleIcon/DescriptionIcon/AdminPanelSettingsIcon)",
                                                  },
                                                  {
                                                    id: "menu-item-label",
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
                            id: "logout-section-attendance",
                            name: "LogoutSection",
                            type: "section",
                            importPath: "@/app/Components/Sections/Main Sidebar/LogoutSection",
                            children: [
                              {
                                id: "logout-container-sidebar",
                                name: "div",
                                type: "container",
                                description: "p-4 border-t border-zinc-200 dark:border-zinc-800",
                                children: [
                                  {
                                    id: "user-info-sidebar",
                                    name: "div",
                                    type: "container",
                                    description: "mb-3 px-4",
                                    children: [
                                      {
                                        id: "user-name-sidebar",
                                        name: "p",
                                        type: "element",
                                        description: "text-sm font-medium text-foreground",
                                      },
                                      {
                                        id: "user-email-sidebar",
                                        name: "p",
                                        type: "element",
                                        description: "text-xs text-zinc-500 dark:text-zinc-400",
                                      },
                                    ],
                                  },
                                  {
                                    id: "logout-button-sidebar",
                                    name: "Button",
                                    type: "component",
                                    importPath: "@/app/Components/Fields/Buttons",
                                    description: "variant=outline onClick=handleLogout className=w-full",
                                    children: [
                                      {
                                        id: "logout-button-element-sidebar",
                                        name: "button",
                                        type: "element",
                                        description: "type=button className=px-6 py-3 rounded-lg font-medium border-2 border-foreground",
                                        children: [
                                          {
                                            id: "logout-button-text-sidebar",
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
                    id: "main-content-attendance",
                    name: "main",
                    type: "container",
                    description: "flex-1 overflow-y-auto",
                    children: [
                      {
                        id: "content-wrapper-attendance",
                        name: "div",
                        type: "container",
                        description: "p-8",
                        children: [
                          {
                            id: "attendance-header",
                            name: "Header",
                            type: "component",
                            importPath: "@/app/Components/Headers/Header",
                            description: "title=Attendance",
                            children: [
                              {
                                id: "header-container-attendance",
                                name: "div",
                                type: "container",
                                description: "mb-8 flex justify-between items-center h-fit w-full",
                                children: [
                                  {
                                    id: "header-left-attendance",
                                    name: "div",
                                    type: "container",
                                    children: [
                                      {
                                        id: "header-title-attendance",
                                        name: "h2",
                                        type: "element",
                                        description: "text-3xl font-bold text-foreground mb-2",
                                      },
                                      {
                                        id: "header-subtitle-attendance",
                                        name: "p",
                                        type: "element",
                                        description: "text-zinc-600 dark:text-zinc-400 (conditional subtitle)",
                                      },
                                    ],
                                  },
                                  {
                                    id: "header-right-attendance",
                                    name: "div",
                                    type: "container",
                                    description: "mb-3 px-4 gap-4 flex h-full justify-center items-center",
                                    children: [
                                      {
                                        id: "user-info-header-attendance",
                                        name: "div",
                                        type: "container",
                                        description: "h-fit w-fit flex flex-col",
                                        children: [
                                          {
                                            id: "user-name-header-attendance",
                                            name: "p",
                                            type: "element",
                                            description: "text-sm font-medium text-foreground",
                                          },
                                          {
                                            id: "user-email-header-attendance",
                                            name: "p",
                                            type: "element",
                                            description: "text-xs text-zinc-500 dark:text-zinc-400",
                                          },
                                        ],
                                      },
                                      {
                                        id: "avatar-container-attendance",
                                        name: "div",
                                        type: "container",
                                        description: "w-[50px] h-[50px] rounded-full overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center",
                                        children: [
                                          {
                                            id: "person-icon-attendance",
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
                            id: "attendance-button-section",
                            name: "AttendanceButtonSection",
                            type: "section",
                            importPath: "@/app/Components/Sections/Attendance/AttendanceButtonSection",
                            description: "isAdmin=isAdmin setIsRegularModalOpen=setIsRegularModalOpen setIsEventModalOpen=setIsEventModalOpen",
                            children: [
                              {
                                id: "button-container",
                                name: "div",
                                type: "container",
                                description: "mb-6 flex gap-4",
                                children: [
                                  {
                                    id: "add-meeting-button",
                                    name: "Button",
                                    type: "component",
                                    importPath: "@/app/Components/Fields/Buttons",
                                    description: "variant=primary className=flex items-center gap-2 onClick=setIsEventModalOpen (conditional admin)",
                                    children: [
                                      {
                                        id: "event-icon",
                                        name: "EventIcon",
                                        type: "element",
                                        description: "className=w-5 h-5",
                                      },
                                      {
                                        id: "button-text-meeting",
                                        name: "span",
                                        type: "element",
                                        description: "Add Meeting",
                                      },
                                    ],
                                  },
                                  {
                                    id: "add-regular-button",
                                    name: "Button",
                                    type: "component",
                                    importPath: "@/app/Components/Fields/Buttons",
                                    description: "variant=primary className=flex items-center gap-2 onClick=setIsRegularModalOpen (conditional non-admin)",
                                    children: [
                                      {
                                        id: "add-icon",
                                        name: "AddIcon",
                                        type: "element",
                                        description: "className=w-5 h-5",
                                      },
                                      {
                                        id: "button-text-regular",
                                        name: "span",
                                        type: "element",
                                        description: "Add Regular Attendance",
                                      },
                                    ],
                                  },
                                  {
                                    id: "add-event-button",
                                    name: "Button",
                                    type: "component",
                                    importPath: "@/app/Components/Fields/Buttons",
                                    description: "variant=outline className=flex items-center gap-2 onClick=setIsEventModalOpen (conditional non-admin)",
                                    children: [
                                      {
                                        id: "event-icon-2",
                                        name: "EventIcon",
                                        type: "element",
                                        description: "className=w-5 h-5",
                                      },
                                      {
                                        id: "button-text-event",
                                        name: "span",
                                        type: "element",
                                        description: "Add Event Attendance",
                                      },
                                    ],
                                  },
                                ],
                              },
                            ],
                          },
                          {
                            id: "attendance-tabs-section",
                            name: "AttendanceTabsSection",
                            type: "section",
                            importPath: "@/app/Components/Sections/Attendance/AttendanceTabsSection",
                            description: "activeTab=activeTab onTabChange=setActiveTab isLoading=isLoading attendanceRecords=attendanceRecords isAdmin=isAdmin onSetConfirmationModal=setConfirmationModal onLoadAttendanceRooms=loadAttendanceRooms",
                            children: [
                              {
                                id: "tabs-container",
                                name: "div",
                                type: "container",
                                description: "bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 mb-6",
                                children: [
                                  {
                                    id: "tabs-component",
                                    name: "Tabs",
                                    type: "component",
                                    importPath: "@/app/Components/Tabs/Tabs",
                                    description: "tabs=attendanceTabs activeTab=activeTab onTabChange=onTabChange",
                                    children: [
                                      {
                                        id: "tabs-container",
                                        name: "div",
                                        type: "container",
                                        description: "flex border-b border-zinc-200 dark:border-zinc-800",
                                        children: [
                                          {
                                            id: "tab-button-mapped",
                                            name: "button",
                                            type: "element",
                                            description: "(mapped tabs) key=tab.id onClick=onTabChange(tab.id) className=px-6 py-4 font-medium transition-colors border-b-2 (conditional activeTab===tab.id ? border-foreground text-foreground : border-transparent text-zinc-600 dark:text-zinc-400 hover:text-foreground)",
                                            children: [
                                              {
                                                id: "tab-label",
                                                name: "span",
                                                type: "element",
                                                description: "tab.label",
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                  {
                                    id: "tab-content-wrapper",
                                    name: "div",
                                    type: "container",
                                    description: "p-6",
                                    children: [
                                      {
                                        id: "archive-filter",
                                        name: "ArchiveFilterSection",
                                        type: "section",
                                        importPath: "@/app/Components/Sections/Attendance/ArchiveFilterSection",
                                        description: "(conditional activeTab===archive)",
                                        children: [
                                          {
                                            id: "archive-filter-container",
                                            name: "div",
                                            type: "container",
                                            description: "flex justify-end mb-4",
                                            children: [
                                              {
                                                id: "archive-filter-buttons",
                                                name: "div",
                                                type: "container",
                                                description: "flex gap-2",
                                                children: [
                                                  {
                                                    id: "export-button-filter",
                                                    name: "Button",
                                                    type: "component",
                                                    importPath: "@/app/Components/Fields/Buttons",
                                                    description: "variant=outline onClick=onExport",
                                                    children: [
                                                      {
                                                        id: "export-button-element-filter",
                                                        name: "button",
                                                        type: "element",
                                                        description: "type=button className=px-6 py-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed border-2 border-foreground text-foreground hover:bg-foreground hover:text-background focus:ring-foreground",
                                                        children: [
                                                          {
                                                            id: "export-loading-state-filter",
                                                            name: "span",
                                                            type: "element",
                                                            description: "flex items-center justify-center gap-2 (conditional isLoading)",
                                                            children: [
                                                              {
                                                                id: "export-loading-spinner-filter",
                                                                name: "svg",
                                                                type: "element",
                                                                description: "animate-spin h-5 w-5 xmlns=http://www.w3.org/2000/svg fill=none viewBox=0 0 24 24",
                                                                children: [
                                                                  {
                                                                    id: "export-spinner-circle-filter",
                                                                    name: "circle",
                                                                    type: "element",
                                                                    description: "opacity-25 cx=12 cy=12 r=10 stroke=currentColor strokeWidth=4",
                                                                  },
                                                                  {
                                                                    id: "export-spinner-path-filter",
                                                                    name: "path",
                                                                    type: "element",
                                                                    description: "opacity-75 fill=currentColor d=M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z",
                                                                  },
                                                                ],
                                                              },
                                                              {
                                                                id: "export-loading-text-filter",
                                                                name: "span",
                                                                type: "element",
                                                                description: "Loading...",
                                                              },
                                                            ],
                                                          },
                                                          {
                                                            id: "export-button-text-filter",
                                                            name: "span",
                                                            type: "element",
                                                            description: "Export (conditional !isLoading)",
                                                          },
                                                        ],
                                                      },
                                                    ],
                                                  },
                                                  {
                                                    id: "filter-button-filter",
                                                    name: "Button",
                                                    type: "component",
                                                    importPath: "@/app/Components/Fields/Buttons",
                                                    description: "variant=outline onClick=onFilter",
                                                    children: [
                                                      {
                                                        id: "filter-button-element-filter",
                                                        name: "button",
                                                        type: "element",
                                                        description: "type=button className=px-6 py-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed border-2 border-foreground text-foreground hover:bg-foreground hover:text-background focus:ring-foreground",
                                                        children: [
                                                          {
                                                            id: "filter-loading-state-filter",
                                                            name: "span",
                                                            type: "element",
                                                            description: "flex items-center justify-center gap-2 (conditional isLoading)",
                                                            children: [
                                                              {
                                                                id: "filter-loading-spinner-filter",
                                                                name: "svg",
                                                                type: "element",
                                                                description: "animate-spin h-5 w-5 xmlns=http://www.w3.org/2000/svg fill=none viewBox=0 0 24 24",
                                                                children: [
                                                                  {
                                                                    id: "filter-spinner-circle-filter",
                                                                    name: "circle",
                                                                    type: "element",
                                                                    description: "opacity-25 cx=12 cy=12 r=10 stroke=currentColor strokeWidth=4",
                                                                  },
                                                                  {
                                                                    id: "filter-spinner-path-filter",
                                                                    name: "path",
                                                                    type: "element",
                                                                    description: "opacity-75 fill=currentColor d=M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z",
                                                                  },
                                                                ],
                                                              },
                                                              {
                                                                id: "filter-loading-text-filter",
                                                                name: "span",
                                                                type: "element",
                                                                description: "Loading...",
                                                              },
                                                            ],
                                                          },
                                                          {
                                                            id: "filter-button-text-filter",
                                                            name: "span",
                                                            type: "element",
                                                            description: "Filter (conditional !isLoading)",
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
                                        id: "loading-state",
                                        name: "div",
                                        type: "container",
                                        description: "text-center py-12 text-zinc-500 (conditional isLoading)",
                                      },
                                      {
                                        id: "empty-state",
                                        name: "div",
                                        type: "container",
                                        description: "text-center py-12 text-zinc-500 (conditional filteredRecords.length===0)",
                                      },
                                      {
                                        id: "attendance-content-component",
                                        name: "AttendanceContent",
                                        type: "component",
                                        importPath: "@/app/Components/Tabs/Tabs Content/AttendanceContent",
                                        description: "activeTab=activeTab attendanceRecords=filteredRecords onTakeAttendance=handleTakeAttendance onDelete=handleDelete onArchive=handleArchive",
                                        children: [
                                          {
                                            id: "attendance-grid-container",
                                            name: "div",
                                            type: "container",
                                            description: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4",
                                            children: [
                                              {
                                                id: "attendance-card-mapped",
                                                name: "AttendanceCard",
                                                type: "component",
                                                importPath: "@/app/Components/Cards/AttendanceCard",
                                                description: "(mapped attendanceRecords) key=record.uuid data=record.data type=record.type category=record.category onTakeAttendance=onTakeAttendance onDelete=onDelete onArchive=onArchive",
                                                children: [
                                                  {
                                                    id: "attendance-card-wrapper",
                                                    name: "div",
                                                    type: "container",
                                                    description: "aspect-square bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4 flex flex-col hover:shadow-lg transition-shadow",
                                                    children: [
                                                      {
                                                        id: "attendance-card-header",
                                                        name: "div",
                                                        type: "container",
                                                        description: "border-b border-zinc-200 dark:border-zinc-800",
                                                        children: [
                                                          {
                                                            id: "attendance-card-header-content",
                                                            name: "div",
                                                            type: "container",
                                                            description: "flex items-start justify-between gap-2",
                                                            children: [
                                                              {
                                                                id: "attendance-card-title-section",
                                                                name: "div",
                                                                type: "container",
                                                                description: "flex-1 min-w-0",
                                                                children: [
                                                                  {
                                                                    id: "attendance-card-title",
                                                                    name: "h3",
                                                                    type: "element",
                                                                    description: "text-lg font-bold text-foreground truncate",
                                                                  },
                                                                  {
                                                                    id: "attendance-card-subtitle",
                                                                    name: "p",
                                                                    type: "element",
                                                                    description: "text-xs text-zinc-500 dark:text-zinc-400 mt-1",
                                                                  },
                                                                ],
                                                              },
                                                              {
                                                                id: "attendance-card-actions",
                                                                name: "div",
                                                                type: "container",
                                                                description: "flex gap-1 flex-shrink-0",
                                                                children: [
                                                                  {
                                                                    id: "archive-button-card",
                                                                    name: "button",
                                                                    type: "element",
                                                                    description: "onClick=onArchive className=p-1.5 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-foreground transition-colors title=Archive (conditional category!==archive)",
                                                                    children: [
                                                                      {
                                                                        id: "archive-icon-card",
                                                                        name: "ArchiveIcon",
                                                                        type: "element",
                                                                        description: "className=w-4 h-4",
                                                                      },
                                                                    ],
                                                                  },
                                                                  {
                                                                    id: "delete-button-card",
                                                                    name: "button",
                                                                    type: "element",
                                                                    description: "onClick=onDelete className=p-1.5 rounded hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors title=Delete",
                                                                    children: [
                                                                      {
                                                                        id: "delete-icon-card",
                                                                        name: "DeleteIcon",
                                                                        type: "element",
                                                                        description: "className=w-4 h-4",
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
                                                        id: "attendance-card-content",
                                                        name: "div",
                                                        type: "container",
                                                        description: "flex-1 flex flex-col justify-center",
                                                        children: [
                                                          {
                                                            id: "regular-attendance-content",
                                                            name: "div",
                                                            type: "container",
                                                            description: "space-y-2 (conditional isRegular && regularData)",
                                                            children: [
                                                              {
                                                                id: "schedule-info-regular",
                                                                name: "div",
                                                                type: "container",
                                                                description: "flex items-center gap-2",
                                                                children: [
                                                                  {
                                                                    id: "time-icon-regular",
                                                                    name: "AccessTimeIcon",
                                                                    type: "element",
                                                                    description: "className=w-4 h-4 text-zinc-500 dark:text-zinc-400",
                                                                  },
                                                                  {
                                                                    id: "schedule-text-regular",
                                                                    name: "p",
                                                                    type: "element",
                                                                    description: "text-sm text-foreground",
                                                                  },
                                                                ],
                                                              },
                                                              {
                                                                id: "time-range-regular",
                                                                name: "p",
                                                                type: "element",
                                                                description: "text-xs text-zinc-600 dark:text-zinc-400 ml-6 (conditional startTime && endTime)",
                                                              },
                                                            ],
                                                          },
                                                          {
                                                            id: "event-attendance-content",
                                                            name: "div",
                                                            type: "container",
                                                            description: "flex items-center gap-2 (conditional !isRegular && eventData)",
                                                            children: [
                                                              {
                                                                id: "time-icon-event",
                                                                name: "AccessTimeIcon",
                                                                type: "element",
                                                                description: "className=w-4 h-4 text-zinc-500 dark:text-zinc-400",
                                                              },
                                                              {
                                                                id: "time-text-event",
                                                                name: "p",
                                                                type: "element",
                                                                description: "text-sm text-foreground",
                                                              },
                                                            ],
                                                          },
                                                        ],
                                                      },
                                                      {
                                                        id: "attendance-card-footer",
                                                        name: "div",
                                                        type: "container",
                                                        description: "border-t border-zinc-200 dark:border-zinc-800 space-y-2",
                                                        children: [
                                                          {
                                                            id: "view-more-button",
                                                            name: "button",
                                                            type: "element",
                                                            description: "onClick=setIsDetailsOpen(true) className=w-full py-2 px-4 border border-zinc-300 dark:border-zinc-700 text-foreground rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-sm font-medium",
                                                          },
                                                          {
                                                            id: "take-attendance-button",
                                                            name: "button",
                                                            type: "element",
                                                            description: "onClick=onTakeAttendance className=w-full py-2 px-4 bg-foreground text-background rounded-lg hover:bg-[#383838] dark:hover:bg-[#ccc] transition-colors text-sm font-medium (conditional category!==archive)",
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
    ],
};
