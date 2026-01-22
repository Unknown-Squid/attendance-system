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
                                                  {
                                                    id: "attendance-details-modal-card",
                                                    name: "AttendanceDetailsModal",
                                                    type: "component",
                                                    importPath: "@/app/Components/Modals/AttendanceDetailsModal",
                                                    description: "isOpen=isDetailsOpen onClose=setIsDetailsOpen(false) data=data type=type",
                                                    children: [
                                                      {
                                                        id: "modal-attendance-details",
                                                        name: "Modal",
                                                        type: "component",
                                                        importPath: "@/app/Components/Modals/Modal",
                                                        description: "isOpen=isOpen onClose=onClose title=(conditional isRegular ? Regular Attendance Details : Event Attendance Details)",
                                                        children: [
                                                          {
                                                            id: "modal-backdrop-attendance-details",
                                                            name: "div",
                                                            type: "container",
                                                            description: "fixed inset-0 z-50 flex items-center justify-center",
                                                            children: [
                                                              {
                                                                id: "backdrop-attendance-details",
                                                                name: "div",
                                                                type: "container",
                                                                description: "absolute inset-0 bg-black/50 backdrop-blur-sm onClick=onClose",
                                                              },
                                                              {
                                                                id: "modal-content-attendance-details",
                                                                name: "div",
                                                                type: "container",
                                                                description: "relative bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 w-full max-w-2xl max-h-[90vh] overflow-y-auto z-10 m-4",
                                                                children: [
                                                                  {
                                                                    id: "modal-header-attendance-details",
                                                                    name: "div",
                                                                    type: "container",
                                                                    description: "flex items-center justify-between p-6 border-b border-zinc-200 dark:border-zinc-800",
                                                                    children: [
                                                                      {
                                                                        id: "modal-header-left-attendance-details",
                                                                        name: "div",
                                                                        type: "container",
                                                                        description: "flex items-center gap-3",
                                                                        children: [
                                                                          {
                                                                            id: "modal-icon-attendance-details",
                                                                            name: "div",
                                                                            type: "container",
                                                                            description: "text-foreground (conditional icon)",
                                                                          },
                                                                          {
                                                                            id: "modal-title-attendance-details",
                                                                            name: "h2",
                                                                            type: "element",
                                                                            description: "text-2xl font-bold text-foreground",
                                                                          },
                                                                        ],
                                                                      },
                                                                      {
                                                                        id: "modal-close-button-attendance-details",
                                                                        name: "button",
                                                                        type: "element",
                                                                        description: "onClick=onClose className=p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-600 dark:text-zinc-400 hover:text-foreground",
                                                                        children: [
                                                                          {
                                                                            id: "close-icon-attendance-details",
                                                                            name: "CloseIcon",
                                                                            type: "element",
                                                                            description: "className=w-5 h-5",
                                                                          },
                                                                        ],
                                                                      },
                                                                    ],
                                                                  },
                                                                  {
                                                                    id: "modal-body-attendance-details",
                                                                    name: "div",
                                                                    type: "container",
                                                                    description: "p-6",
                                                                    children: [
                                                                      {
                                                                        id: "modal-content-wrapper-attendance-details",
                                                                        name: "div",
                                                                        type: "container",
                                                                        description: "space-y-6",
                                                                        children: [
                                                                          {
                                                                            id: "subject-title-section-attendance-details",
                                                                            name: "div",
                                                                            type: "container",
                                                                            children: [
                                                                              {
                                                                                id: "subject-title-attendance-details",
                                                                                name: "h3",
                                                                                type: "element",
                                                                                description: "text-xl font-bold text-foreground mb-1",
                                                                              },
                                                                              {
                                                                                id: "subject-subtitle-attendance-details",
                                                                                name: "p",
                                                                                type: "element",
                                                                                description: "text-sm text-zinc-500 dark:text-zinc-400",
                                                                              },
                                                                            ],
                                                                          },
                                                                          {
                                                                            id: "regular-details-grid-attendance-details",
                                                                            name: "div",
                                                                            type: "container",
                                                                            description: "grid grid-cols-1 md:grid-cols-2 gap-4 (conditional isRegular && regularData)",
                                                                            children: [
                                                                              {
                                                                                id: "year-level-detail-attendance-details",
                                                                                name: "div",
                                                                                type: "container",
                                                                                description: "flex items-start gap-3",
                                                                                children: [
                                                                                  {
                                                                                    id: "year-level-icon-attendance-details",
                                                                                    name: "ClassIcon",
                                                                                    type: "element",
                                                                                    description: "className=w-5 h-5 text-zinc-500 dark:text-zinc-400 mt-0.5",
                                                                                  },
                                                                                  {
                                                                                    id: "year-level-content-attendance-details",
                                                                                    name: "div",
                                                                                    type: "container",
                                                                                    children: [
                                                                                      {
                                                                                        id: "year-level-label-attendance-details",
                                                                                        name: "p",
                                                                                        type: "element",
                                                                                        description: "text-sm text-zinc-600 dark:text-zinc-400 mb-1",
                                                                                      },
                                                                                      {
                                                                                        id: "year-level-value-attendance-details",
                                                                                        name: "p",
                                                                                        type: "element",
                                                                                        description: "text-foreground font-medium",
                                                                                      },
                                                                                    ],
                                                                                  },
                                                                                ],
                                                                              },
                                                                              {
                                                                                id: "section-detail-attendance-details",
                                                                                name: "div",
                                                                                type: "container",
                                                                                description: "flex items-start gap-3",
                                                                                children: [
                                                                                  {
                                                                                    id: "section-icon-attendance-details",
                                                                                    name: "ClassIcon",
                                                                                    type: "element",
                                                                                    description: "className=w-5 h-5 text-zinc-500 dark:text-zinc-400 mt-0.5",
                                                                                  },
                                                                                  {
                                                                                    id: "section-content-attendance-details",
                                                                                    name: "div",
                                                                                    type: "container",
                                                                                    children: [
                                                                                      {
                                                                                        id: "section-label-attendance-details",
                                                                                        name: "p",
                                                                                        type: "element",
                                                                                        description: "text-sm text-zinc-600 dark:text-zinc-400 mb-1",
                                                                                      },
                                                                                      {
                                                                                        id: "section-value-attendance-details",
                                                                                        name: "p",
                                                                                        type: "element",
                                                                                        description: "text-foreground font-medium",
                                                                                      },
                                                                                    ],
                                                                                  },
                                                                                ],
                                                                              },
                                                                              {
                                                                                id: "semester-detail-attendance-details",
                                                                                name: "div",
                                                                                type: "container",
                                                                                description: "flex items-start gap-3",
                                                                                children: [
                                                                                  {
                                                                                    id: "semester-icon-attendance-details",
                                                                                    name: "CalendarTodayIcon",
                                                                                    type: "element",
                                                                                    description: "className=w-5 h-5 text-zinc-500 dark:text-zinc-400 mt-0.5",
                                                                                  },
                                                                                  {
                                                                                    id: "semester-content-attendance-details",
                                                                                    name: "div",
                                                                                    type: "container",
                                                                                    children: [
                                                                                      {
                                                                                        id: "semester-label-attendance-details",
                                                                                        name: "p",
                                                                                        type: "element",
                                                                                        description: "text-sm text-zinc-600 dark:text-zinc-400 mb-1",
                                                                                      },
                                                                                      {
                                                                                        id: "semester-value-attendance-details",
                                                                                        name: "p",
                                                                                        type: "element",
                                                                                        description: "text-foreground font-medium",
                                                                                      },
                                                                                    ],
                                                                                  },
                                                                                ],
                                                                              },
                                                                              {
                                                                                id: "semester-year-detail-attendance-details",
                                                                                name: "div",
                                                                                type: "container",
                                                                                description: "flex items-start gap-3",
                                                                                children: [
                                                                                  {
                                                                                    id: "semester-year-icon-attendance-details",
                                                                                    name: "CalendarTodayIcon",
                                                                                    type: "element",
                                                                                    description: "className=w-5 h-5 text-zinc-500 dark:text-zinc-400 mt-0.5",
                                                                                  },
                                                                                  {
                                                                                    id: "semester-year-content-attendance-details",
                                                                                    name: "div",
                                                                                    type: "container",
                                                                                    children: [
                                                                                      {
                                                                                        id: "semester-year-label-attendance-details",
                                                                                        name: "p",
                                                                                        type: "element",
                                                                                        description: "text-sm text-zinc-600 dark:text-zinc-400 mb-1",
                                                                                      },
                                                                                      {
                                                                                        id: "semester-year-value-attendance-details",
                                                                                        name: "p",
                                                                                        type: "element",
                                                                                        description: "text-foreground font-medium",
                                                                                      },
                                                                                    ],
                                                                                  },
                                                                                ],
                                                                              },
                                                                              {
                                                                                id: "subject-detail-attendance-details",
                                                                                name: "div",
                                                                                type: "container",
                                                                                description: "flex items-start gap-3",
                                                                                children: [
                                                                                  {
                                                                                    id: "subject-icon-attendance-details",
                                                                                    name: "SchoolIcon",
                                                                                    type: "element",
                                                                                    description: "className=w-5 h-5 text-zinc-500 dark:text-zinc-400 mt-0.5",
                                                                                  },
                                                                                  {
                                                                                    id: "subject-content-attendance-details",
                                                                                    name: "div",
                                                                                    type: "container",
                                                                                    children: [
                                                                                      {
                                                                                        id: "subject-label-attendance-details",
                                                                                        name: "p",
                                                                                        type: "element",
                                                                                        description: "text-sm text-zinc-600 dark:text-zinc-400 mb-1",
                                                                                      },
                                                                                      {
                                                                                        id: "subject-value-attendance-details",
                                                                                        name: "p",
                                                                                        type: "element",
                                                                                        description: "text-foreground font-medium",
                                                                                      },
                                                                                    ],
                                                                                  },
                                                                                ],
                                                                              },
                                                                              {
                                                                                id: "room-detail-attendance-details",
                                                                                name: "div",
                                                                                type: "container",
                                                                                description: "flex items-start gap-3",
                                                                                children: [
                                                                                  {
                                                                                    id: "room-icon-attendance-details",
                                                                                    name: "LocationOnIcon",
                                                                                    type: "element",
                                                                                    description: "className=w-5 h-5 text-zinc-500 dark:text-zinc-400 mt-0.5",
                                                                                  },
                                                                                  {
                                                                                    id: "room-content-attendance-details",
                                                                                    name: "div",
                                                                                    type: "container",
                                                                                    children: [
                                                                                      {
                                                                                        id: "room-label-attendance-details",
                                                                                        name: "p",
                                                                                        type: "element",
                                                                                        description: "text-sm text-zinc-600 dark:text-zinc-400 mb-1",
                                                                                      },
                                                                                      {
                                                                                        id: "room-value-attendance-details",
                                                                                        name: "p",
                                                                                        type: "element",
                                                                                        description: "text-foreground font-medium",
                                                                                      },
                                                                                    ],
                                                                                  },
                                                                                ],
                                                                              },
                                                                              {
                                                                                id: "classification-detail-attendance-details",
                                                                                name: "div",
                                                                                type: "container",
                                                                                description: "flex items-start gap-3",
                                                                                children: [
                                                                                  {
                                                                                    id: "classification-icon-attendance-details",
                                                                                    name: "CategoryIcon",
                                                                                    type: "element",
                                                                                    description: "className=w-5 h-5 text-zinc-500 dark:text-zinc-400 mt-0.5",
                                                                                  },
                                                                                  {
                                                                                    id: "classification-content-attendance-details",
                                                                                    name: "div",
                                                                                    type: "container",
                                                                                    children: [
                                                                                      {
                                                                                        id: "classification-label-attendance-details",
                                                                                        name: "p",
                                                                                        type: "element",
                                                                                        description: "text-sm text-zinc-600 dark:text-zinc-400 mb-1",
                                                                                      },
                                                                                      {
                                                                                        id: "classification-value-attendance-details",
                                                                                        name: "p",
                                                                                        type: "element",
                                                                                        description: "text-foreground font-medium",
                                                                                      },
                                                                                    ],
                                                                                  },
                                                                                ],
                                                                              },
                                                                              {
                                                                                id: "schedule-detail-attendance-details",
                                                                                name: "div",
                                                                                type: "container",
                                                                                description: "flex items-start gap-3 (conditional selectedWeekdays.length > 0)",
                                                                                children: [
                                                                                  {
                                                                                    id: "schedule-icon-attendance-details",
                                                                                    name: "AccessTimeIcon",
                                                                                    type: "element",
                                                                                    description: "className=w-5 h-5 text-zinc-500 dark:text-zinc-400 mt-0.5",
                                                                                  },
                                                                                  {
                                                                                    id: "schedule-content-attendance-details",
                                                                                    name: "div",
                                                                                    type: "container",
                                                                                    children: [
                                                                                      {
                                                                                        id: "schedule-label-attendance-details",
                                                                                        name: "p",
                                                                                        type: "element",
                                                                                        description: "text-sm text-zinc-600 dark:text-zinc-400 mb-1",
                                                                                      },
                                                                                      {
                                                                                        id: "schedule-value-attendance-details",
                                                                                        name: "p",
                                                                                        type: "element",
                                                                                        description: "text-foreground font-medium mb-2",
                                                                                      },
                                                                                      {
                                                                                        id: "schedule-time-attendance-details",
                                                                                        name: "p",
                                                                                        type: "element",
                                                                                        description: "text-foreground text-sm (conditional startTime && endTime)",
                                                                                      },
                                                                                    ],
                                                                                  },
                                                                                ],
                                                                              },
                                                                            ],
                                                                          },
                                                                          {
                                                                            id: "event-details-grid-attendance-details",
                                                                            name: "div",
                                                                            type: "container",
                                                                            description: "grid grid-cols-1 md:grid-cols-2 gap-4 (conditional !isRegular && eventData)",
                                                                            children: [
                                                                              {
                                                                                id: "agenda-detail-attendance-details",
                                                                                name: "div",
                                                                                type: "container",
                                                                                description: "flex items-start gap-3",
                                                                                children: [
                                                                                  {
                                                                                    id: "agenda-icon-attendance-details",
                                                                                    name: "SchoolIcon",
                                                                                    type: "element",
                                                                                    description: "className=w-5 h-5 text-zinc-500 dark:text-zinc-400 mt-0.5",
                                                                                  },
                                                                                  {
                                                                                    id: "agenda-content-attendance-details",
                                                                                    name: "div",
                                                                                    type: "container",
                                                                                    children: [
                                                                                      {
                                                                                        id: "agenda-label-attendance-details",
                                                                                        name: "p",
                                                                                        type: "element",
                                                                                        description: "text-sm text-zinc-600 dark:text-zinc-400 mb-1",
                                                                                      },
                                                                                      {
                                                                                        id: "agenda-value-attendance-details",
                                                                                        name: "p",
                                                                                        type: "element",
                                                                                        description: "text-foreground font-medium",
                                                                                      },
                                                                                    ],
                                                                                  },
                                                                                ],
                                                                              },
                                                                              {
                                                                                id: "event-semester-detail-attendance-details",
                                                                                name: "div",
                                                                                type: "container",
                                                                                description: "flex items-start gap-3",
                                                                                children: [
                                                                                  {
                                                                                    id: "event-semester-icon-attendance-details",
                                                                                    name: "CalendarTodayIcon",
                                                                                    type: "element",
                                                                                    description: "className=w-5 h-5 text-zinc-500 dark:text-zinc-400 mt-0.5",
                                                                                  },
                                                                                  {
                                                                                    id: "event-semester-content-attendance-details",
                                                                                    name: "div",
                                                                                    type: "container",
                                                                                    children: [
                                                                                      {
                                                                                        id: "event-semester-label-attendance-details",
                                                                                        name: "p",
                                                                                        type: "element",
                                                                                        description: "text-sm text-zinc-600 dark:text-zinc-400 mb-1",
                                                                                      },
                                                                                      {
                                                                                        id: "event-semester-value-attendance-details",
                                                                                        name: "p",
                                                                                        type: "element",
                                                                                        description: "text-foreground font-medium",
                                                                                      },
                                                                                    ],
                                                                                  },
                                                                                ],
                                                                              },
                                                                              {
                                                                                id: "event-semester-year-detail-attendance-details",
                                                                                name: "div",
                                                                                type: "container",
                                                                                description: "flex items-start gap-3",
                                                                                children: [
                                                                                  {
                                                                                    id: "event-semester-year-icon-attendance-details",
                                                                                    name: "CalendarTodayIcon",
                                                                                    type: "element",
                                                                                    description: "className=w-5 h-5 text-zinc-500 dark:text-zinc-400 mt-0.5",
                                                                                  },
                                                                                  {
                                                                                    id: "event-semester-year-content-attendance-details",
                                                                                    name: "div",
                                                                                    type: "container",
                                                                                    children: [
                                                                                      {
                                                                                        id: "event-semester-year-label-attendance-details",
                                                                                        name: "p",
                                                                                        type: "element",
                                                                                        description: "text-sm text-zinc-600 dark:text-zinc-400 mb-1",
                                                                                      },
                                                                                      {
                                                                                        id: "event-semester-year-value-attendance-details",
                                                                                        name: "p",
                                                                                        type: "element",
                                                                                        description: "text-foreground font-medium",
                                                                                      },
                                                                                    ],
                                                                                  },
                                                                                ],
                                                                              },
                                                                              {
                                                                                id: "event-time-detail-attendance-details",
                                                                                name: "div",
                                                                                type: "container",
                                                                                description: "flex items-start gap-3",
                                                                                children: [
                                                                                  {
                                                                                    id: "event-time-icon-attendance-details",
                                                                                    name: "AccessTimeIcon",
                                                                                    type: "element",
                                                                                    description: "className=w-5 h-5 text-zinc-500 dark:text-zinc-400 mt-0.5",
                                                                                  },
                                                                                  {
                                                                                    id: "event-time-content-attendance-details",
                                                                                    name: "div",
                                                                                    type: "container",
                                                                                    children: [
                                                                                      {
                                                                                        id: "event-time-label-attendance-details",
                                                                                        name: "p",
                                                                                        type: "element",
                                                                                        description: "text-sm text-zinc-600 dark:text-zinc-400 mb-1",
                                                                                      },
                                                                                      {
                                                                                        id: "event-time-value-attendance-details",
                                                                                        name: "p",
                                                                                        type: "element",
                                                                                        description: "text-foreground font-medium",
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
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                  {
                    id: "add-regular-modal",
                    name: "AddRegularAttendanceModal",
                    type: "component",
                    importPath: "@/app/Components/Modals/AddRegularAttendanceModal",
                description: "isOpen=isRegularModalOpen onClose=handleRegularModalClose onSubmit=handleRegularAttendanceSubmit",
                children: [
                  {
                    id: "regular-modal-base",
                    name: "Modal",
                    type: "component",
                    importPath: "@/app/Components/Modals/Modal",
                    description: "isOpen=isOpen onClose=handleClose title=Add Regular Attendance",
                    children: [
                      {
                        id: "regular-modal-backdrop",
                        name: "div",
                        type: "container",
                        description: "fixed inset-0 z-50 flex items-center justify-center",
                        children: [
                          {
                            id: "regular-backdrop-overlay",
                            name: "div",
                            type: "container",
                            description: "absolute inset-0 bg-black/50 backdrop-blur-sm onClick=onClose",
                          },
                          {
                            id: "regular-modal-content",
                            name: "div",
                            type: "container",
                            description: "relative bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 w-full max-w-2xl max-h-[90vh] overflow-y-auto z-10 m-4",
                            children: [
                              {
                                id: "regular-modal-header",
                                name: "div",
                                type: "container",
                                description: "flex items-center justify-between p-6 border-b border-zinc-200 dark:border-zinc-800",
                                children: [
                                  {
                                    id: "regular-modal-title-container",
                                    name: "div",
                                    type: "container",
                                    description: "flex items-center gap-3",
                                    children: [
                                      {
                                        id: "regular-modal-title",
                                        name: "h2",
                                        type: "element",
                                        description: "text-2xl font-bold text-foreground",
                                      },
                                    ],
                                  },
                                  {
                                    id: "regular-modal-close-button",
                                    name: "button",
                                    type: "element",
                                    description: "onClick=onClose className=p-2 rounded-lg hover:bg-zinc-100",
                                    children: [
                                      {
                                        id: "regular-close-icon",
                                        name: "CloseIcon",
                                        type: "element",
                                        description: "className=w-5 h-5",
                                      },
                                    ],
                                  },
                                ],
                              },
                              {
                                id: "regular-modal-body",
                                name: "div",
                                type: "container",
                                description: "p-6",
                                children: [
                                  {
                                    id: "regular-modal-form",
                                    name: "form",
                                    type: "element",
                                    description: "onSubmit=handleSubmit className=space-y-6",
                                    children: [
                                      {
                                        id: "regular-basic-info-section",
                                        name: "div",
                                        type: "container",
                                        description: "space-y-4",
                                        children: [
                                          {
                                            id: "regular-class-info-title",
                                            name: "h3",
                                            type: "element",
                                            description: "text-lg font-semibold text-foreground border-b border-zinc-200 dark:border-zinc-800 pb-2",
                                          },
                                          {
                                            id: "regular-grid-1",
                                            name: "div",
                                            type: "container",
                                            description: "grid grid-cols-2 gap-4",
                                            children: [
                                              {
                                                id: "regular-course-select",
                                                name: "Select",
                                                type: "component",
                                                importPath: "@/app/Components/Fields/Select",
                                                description: "label=Course name=course value=formData.course onChange=handleChange options=courses error=errors.course",
                                                children: [
                                                  {
                                                    id: "regular-course-wrapper",
                                                    name: "div",
                                                    type: "container",
                                                    description: "w-full",
                                                    children: [
                                                      {
                                                        id: "regular-course-label",
                                                        name: "label",
                                                        type: "element",
                                                        description: "block text-sm font-medium mb-2 text-foreground (conditional)",
                                                      },
                                                      {
                                                        id: "regular-course-select-element",
                                                        name: "select",
                                                        type: "element",
                                                        description: "name=course className=w-full px-4 py-3 rounded-lg border",
                                                      },
                                                      {
                                                        id: "regular-course-error",
                                                        name: "p",
                                                        type: "element",
                                                        description: "mt-1 text-sm text-red-500 (conditional errors.course)",
                                                      },
                                                    ],
                                                  },
                                                ],
                                              },
                                              {
                                                id: "regular-major-select",
                                                name: "Select",
                                                type: "component",
                                                importPath: "@/app/Components/Fields/Select",
                                                description: "label=Major name=major value=formData.major onChange=handleChange options=majors error=errors.major",
                                              },
                                              {
                                                id: "regular-year-select",
                                                name: "Select",
                                                type: "component",
                                                importPath: "@/app/Components/Fields/Select",
                                                description: "label=Year Level name=yearLevel value=formData.yearLevel onChange=handleChange options=yearLevels error=errors.yearLevel",
                                              },
                                              {
                                                id: "regular-section-select",
                                                name: "Select",
                                                type: "component",
                                                importPath: "@/app/Components/Fields/Select",
                                                description: "label=Section name=section value=formData.section onChange=handleChange options=sections error=errors.section",
                                              },
                                            ],
                                          },
                                          {
                                            id: "regular-grid-2",
                                            name: "div",
                                            type: "container",
                                            description: "grid grid-cols-2 gap-4",
                                            children: [
                                              {
                                                id: "regular-semester-select",
                                                name: "Select",
                                                type: "component",
                                                importPath: "@/app/Components/Fields/Select",
                                                description: "label=Semester name=semester value=formData.semester onChange=handleChange options=semesters error=errors.semester",
                                              },
                                              {
                                                id: "regular-semester-year-select",
                                                name: "Select",
                                                type: "component",
                                                importPath: "@/app/Components/Fields/Select",
                                                description: "label=Semester Year name=semesterYear value=formData.semesterYear onChange=handleChange options=semesterYears error=errors.semesterYear",
                                              },
                                            ],
                                          },
                                          {
                                            id: "regular-subject-select",
                                            name: "Select",
                                            type: "component",
                                            importPath: "@/app/Components/Fields/Select",
                                            description: "label=Subject name=subject value=formData.subject onChange=handleChange options=subjects error=errors.subject",
                                          },
                                          {
                                            id: "regular-grid-3",
                                            name: "div",
                                            type: "container",
                                            description: "grid grid-cols-2 gap-4",
                                            children: [
                                              {
                                                id: "regular-classification-select",
                                                name: "Select",
                                                type: "component",
                                                importPath: "@/app/Components/Fields/Select",
                                                description: "label=Classification name=classification value=formData.classification onChange=handleChange options=classifications error=errors.classification",
                                              },
                                              {
                                                id: "regular-room-select",
                                                name: "Select",
                                                type: "component",
                                                importPath: "@/app/Components/Fields/Select",
                                                description: "label=Room name=room value=formData.room onChange=handleChange options=rooms error=errors.room",
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                      {
                                        id: "regular-schedule-section",
                                        name: "div",
                                        type: "container",
                                        description: "space-y-4",
                                        children: [
                                          {
                                            id: "regular-schedule-title",
                                            name: "h3",
                                            type: "element",
                                            description: "text-lg font-semibold text-foreground border-b border-zinc-200 dark:border-zinc-800 pb-2",
                                          },
                                          {
                                            id: "regular-weekdays-container",
                                            name: "div",
                                            type: "container",
                                            children: [
                                              {
                                                id: "regular-weekdays-label",
                                                name: "label",
                                                type: "element",
                                                description: "block text-sm font-medium mb-3 text-foreground",
                                              },
                                              {
                                                id: "regular-weekdays-grid",
                                                name: "div",
                                                type: "container",
                                                description: "flex flex-wrap gap-4",
                                                children: [
                                                  {
                                                    id: "regular-weekday-checkbox",
                                                    name: "label",
                                                    type: "element",
                                                    description: "flex items-center gap-2 cursor-pointer (mapped weekdays)",
                                                    children: [
                                                      {
                                                        id: "regular-checkbox-input",
                                                        name: "input",
                                                        type: "element",
                                                        description: "type=checkbox className=w-4 h-4 rounded border-zinc-300",
                                                      },
                                                      {
                                                        id: "regular-checkbox-label",
                                                        name: "span",
                                                        type: "element",
                                                        description: "text-sm text-foreground",
                                                      },
                                                    ],
                                                  },
                                                ],
                                              },
                                              {
                                                id: "regular-weekdays-error",
                                                name: "p",
                                                type: "element",
                                                description: "mt-1 text-sm text-red-500 (conditional errors.selectedWeekdays)",
                                              },
                                            ],
                                          },
                                          {
                                            id: "regular-time-grid",
                                            name: "div",
                                            type: "container",
                                            description: "grid grid-cols-2 gap-4",
                                            children: [
                                              {
                                                id: "regular-start-time-input",
                                                name: "Input",
                                                type: "component",
                                                importPath: "@/app/Components/Fields/Input",
                                                description: "label=Start Time type=time name=startTime value=formData.startTime onChange=handleChange error=errors.startTime",
                                                children: [
                                                  {
                                                    id: "regular-start-time-wrapper",
                                                    name: "div",
                                                    type: "container",
                                                    description: "w-full",
                                                    children: [
                                                      {
                                                        id: "regular-start-time-label",
                                                        name: "label",
                                                        type: "element",
                                                        description: "block text-sm font-medium mb-2 text-foreground (conditional)",
                                                      },
                                                      {
                                                        id: "regular-start-time-input-element",
                                                        name: "input",
                                                        type: "element",
                                                        description: "type=time name=startTime className=w-full px-4 py-3 rounded-lg border",
                                                      },
                                                      {
                                                        id: "regular-start-time-error",
                                                        name: "p",
                                                        type: "element",
                                                        description: "mt-1 text-sm text-red-500 (conditional errors.startTime)",
                                                      },
                                                    ],
                                                  },
                                                ],
                                              },
                                              {
                                                id: "regular-end-time-input",
                                                name: "Input",
                                                type: "component",
                                                importPath: "@/app/Components/Fields/Input",
                                                description: "label=End Time type=time name=endTime value=formData.endTime onChange=handleChange error=errors.endTime disabled=!formData.startTime",
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                      {
                                        id: "regular-modal-actions",
                                        name: "div",
                                        type: "container",
                                        description: "flex justify-end gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-800",
                                        children: [
                                          {
                                            id: "regular-cancel-button",
                                            name: "Button",
                                            type: "component",
                                            importPath: "@/app/Components/Fields/Buttons",
                                            description: "type=button variant=outline onClick=handleClose",
                                            children: [
                                              {
                                                id: "regular-cancel-button-element",
                                                name: "button",
                                                type: "element",
                                                description: "type=button className=px-6 py-3 rounded-lg font-medium border-2",
                                                children: [
                                                  {
                                                    id: "regular-cancel-text",
                                                    name: "span",
                                                    type: "element",
                                                    description: "Cancel",
                                                  },
                                                ],
                                              },
                                            ],
                                          },
                                          {
                                            id: "regular-submit-button",
                                            name: "Button",
                                            type: "component",
                                            importPath: "@/app/Components/Fields/Buttons",
                                            description: "type=submit variant=primary",
                                            children: [
                                              {
                                                id: "regular-submit-button-element",
                                                name: "button",
                                                type: "element",
                                                description: "type=submit className=px-6 py-3 rounded-lg font-medium",
                                                children: [
                                                  {
                                                    id: "regular-submit-text",
                                                    name: "span",
                                                    type: "element",
                                                    description: "Add Regular Attendance",
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
                id: "add-event-modal",
                name: "AddEventAttendanceModal",
                type: "component",
                importPath: "@/app/Components/Modals/AddEventAttendanceModal",
                description: "isOpen=isEventModalOpen onClose=handleEventModalClose onSubmit=handleEventAttendanceSubmit",
                children: [
                  {
                    id: "event-modal-base",
                    name: "Modal",
                    type: "component",
                    importPath: "@/app/Components/Modals/Modal",
                    description: "isOpen=isOpen onClose=handleClose title=Add Event Attendance",
                    children: [
                      {
                        id: "event-modal-backdrop",
                        name: "div",
                        type: "container",
                        description: "fixed inset-0 z-50 flex items-center justify-center",
                        children: [
                          {
                            id: "event-backdrop-overlay",
                            name: "div",
                            type: "container",
                            description: "absolute inset-0 bg-black/50 backdrop-blur-sm onClick=onClose",
                          },
                          {
                            id: "event-modal-content",
                            name: "div",
                            type: "container",
                            description: "relative bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 w-full max-w-2xl max-h-[90vh] overflow-y-auto z-10 m-4",
                            children: [
                              {
                                id: "event-modal-header",
                                name: "div",
                                type: "container",
                                description: "flex items-center justify-between p-6 border-b border-zinc-200 dark:border-zinc-800",
                                children: [
                                  {
                                    id: "event-modal-title-container",
                                    name: "div",
                                    type: "container",
                                    description: "flex items-center gap-3",
                                    children: [
                                      {
                                        id: "event-modal-title",
                                        name: "h2",
                                        type: "element",
                                        description: "text-2xl font-bold text-foreground",
                                      },
                                    ],
                                  },
                                  {
                                    id: "event-modal-close-button",
                                    name: "button",
                                    type: "element",
                                    description: "onClick=onClose className=p-2 rounded-lg hover:bg-zinc-100",
                                    children: [
                                      {
                                        id: "event-close-icon",
                                        name: "CloseIcon",
                                        type: "element",
                                        description: "className=w-5 h-5",
                                      },
                                    ],
                                  },
                                ],
                              },
                              {
                                id: "event-modal-body",
                                name: "div",
                                type: "container",
                                description: "p-6",
                                children: [
                                  {
                                    id: "event-modal-form",
                                    name: "form",
                                    type: "element",
                                    description: "onSubmit=handleSubmit className=space-y-4",
                                    children: [
                                      {
                                        id: "event-agenda-input",
                                        name: "Input",
                                        type: "component",
                                        importPath: "@/app/Components/Fields/Input",
                                        description: "label=Agenda name=agenda type=text value=formData.agenda onChange=handleChange error=errors.agenda placeholder=Enter meeting agenda",
                                        children: [
                                          {
                                            id: "event-agenda-wrapper",
                                            name: "div",
                                            type: "container",
                                            description: "w-full",
                                            children: [
                                              {
                                                id: "event-agenda-label",
                                                name: "label",
                                                type: "element",
                                                description: "block text-sm font-medium mb-2 text-foreground (conditional)",
                                              },
                                              {
                                                id: "event-agenda-input-element",
                                                name: "input",
                                                type: "element",
                                                description: "type=text name=agenda className=w-full px-4 py-3 rounded-lg border",
                                              },
                                              {
                                                id: "event-agenda-error",
                                                name: "p",
                                                type: "element",
                                                description: "mt-1 text-sm text-red-500 (conditional errors.agenda)",
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                      {
                                        id: "event-time-grid",
                                        name: "div",
                                        type: "container",
                                        description: "grid grid-cols-2 gap-4",
                                        children: [
                                          {
                                            id: "event-start-time-input",
                                            name: "Input",
                                            type: "component",
                                            importPath: "@/app/Components/Fields/Input",
                                            description: "label=Start Time name=startTime type=time value=formData.startTime onChange=handleChange error=errors.startTime",
                                          },
                                          {
                                            id: "event-end-time-input",
                                            name: "Input",
                                            type: "component",
                                            importPath: "@/app/Components/Fields/Input",
                                            description: "label=End Time name=endTime type=time value=formData.endTime onChange=handleChange error=errors.endTime disabled=!formData.startTime",
                                          },
                                        ],
                                      },
                                      {
                                        id: "event-department-select",
                                        name: "Select",
                                        type: "component",
                                        importPath: "@/app/Components/Fields/Select",
                                        description: "label=Department name=department value=formData.department onChange=handleChange options=departments error=errors.department",
                                      },
                                      {
                                        id: "event-semester-grid",
                                        name: "div",
                                        type: "container",
                                        description: "grid grid-cols-2 gap-4",
                                        children: [
                                          {
                                            id: "event-semester-select",
                                            name: "Select",
                                            type: "component",
                                            importPath: "@/app/Components/Fields/Select",
                                            description: "label=Semester name=semester value=formData.semester onChange=handleChange options=semesters error=errors.semester",
                                          },
                                          {
                                            id: "event-semester-year-select",
                                            name: "Select",
                                            type: "component",
                                            importPath: "@/app/Components/Fields/Select",
                                            description: "label=Semester Year name=semesterYear value=formData.semesterYear onChange=handleChange options=semesterYears error=errors.semesterYear",
                                          },
                                        ],
                                      },
                                      {
                                        id: "event-modal-actions",
                                        name: "div",
                                        type: "container",
                                        description: "flex justify-end gap-3 pt-4",
                                        children: [
                                          {
                                            id: "event-cancel-button",
                                            name: "Button",
                                            type: "component",
                                            importPath: "@/app/Components/Fields/Buttons",
                                            description: "type=button variant=outline onClick=handleClose",
                                            children: [
                                              {
                                                id: "event-cancel-button-element",
                                                name: "button",
                                                type: "element",
                                                description: "type=button className=px-6 py-3 rounded-lg font-medium border-2",
                                                children: [
                                                  {
                                                    id: "event-cancel-text",
                                                    name: "span",
                                                    type: "element",
                                                    description: "Cancel",
                                                  },
                                                ],
                                              },
                                            ],
                                          },
                                          {
                                            id: "event-submit-button",
                                            name: "Button",
                                            type: "component",
                                            importPath: "@/app/Components/Fields/Buttons",
                                            description: "type=submit variant=primary",
                                            children: [
                                              {
                                                id: "event-submit-button-element",
                                                name: "button",
                                                type: "element",
                                                description: "type=submit className=px-6 py-3 rounded-lg font-medium",
                                                children: [
                                                  {
                                                    id: "event-submit-text",
                                                    name: "span",
                                                    type: "element",
                                                    description: "Add Event",
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
                id: "confirmation-modal",
                name: "ConfirmationModal",
                type: "component",
                importPath: "@/app/Components/Modals/ConfirmationModal",
                description: "isOpen=confirmationModal.isOpen onClose=handleConfirmationModalClose onConfirm=confirmationModal.onConfirm title=confirmationModal.title message=confirmationModal.message icon=confirmationModal.icon danger=confirmationModal.danger confirmLabel=confirmationModal.confirmLabel",
                children: [
                  {
                    id: "confirmation-modal-base",
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
                                    description: "onClick=onClose className=p-2 rounded-lg hover:bg-zinc-100",
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
                                            description: "type=button variant=outline onClick=onClose (conditional cancelLabel)",
                                            children: [
                                              {
                                                id: "confirmation-cancel-button-element",
                                                name: "button",
                                                type: "element",
                                                description: "type=button className=px-6 py-3 rounded-lg font-medium border-2",
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
                                            description: "type=button variant=danger ? primary : confirmVariant onClick=handleConfirm className=danger ? bg-red-600 hover:bg-red-700",
                                            children: [
                                              {
                                                id: "confirmation-confirm-button-element",
                                                name: "button",
                                                type: "element",
                                                description: "type=button className=px-6 py-3 rounded-lg font-medium",
                                                children: [
                                                  {
                                                    id: "confirmation-confirm-text",
                                                    name: "span",
                                                    type: "element",
                                                    description: "Confirm",
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
;