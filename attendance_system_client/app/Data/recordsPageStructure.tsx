import { ComponentInfo } from "./types";

export const recordsPageStructure: ComponentInfo = {
    id: "records-page",
    name: "RecordsPage",
    type: "page",
    children: [
      {
        id: "protected-route-records",
        name: "ProtectedRoute",
        type: "component",
        importPath: "@/app/Components/ProtectedRoute",
        children: [
          {
            id: "records-page-content",
            name: "RecordsPageContent",
            type: "component",
            importPath: "@/app/(Pages)/records/page.tsx",
            children: [
              {
                id: "records-root-div",
                name: "div",
                type: "container",
                description: "flex min-h-screen bg-zinc-50 dark:bg-black",
                children: [
                  {
                    id: "main-sidebar-records",
                    name: "MainSidebar",
                    type: "component",
                    importPath: "@/app/Components/Sidebars/MainSidebar",
                    description: "activeMenu=activeMenu onMenuChange=setActiveMenu",
                    children: [
                      {
                        id: "sidebar-aside-records",
                        name: "aside",
                        type: "container",
                        description: "w-64 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 flex flex-col",
                        children: [
                          {
                            id: "logo-section-records",
                            name: "LogoSection",
                            type: "section",
                            importPath: "@/app/Components/Sections/Main Sidebar/LogoSection",
                            children: [
                              {
                                id: "logo-container-sidebar-records",
                                name: "div",
                                type: "container",
                                description: "p-6 border-b border-zinc-200 dark:border-zinc-800",
                                children: [
                                  {
                                    id: "logo-content-sidebar-records",
                                    name: "div",
                                    type: "container",
                                    description: "flex items-center gap-3",
                                    children: [
                                      {
                                        id: "logo-icon-sidebar-records",
                                        name: "LogoIcon",
                                        type: "component",
                                        importPath: "@/app/Components/Icons/LogoIcon",
                                        description: "className=w-8 h-8 text-foreground",
                                      },
                                      {
                                        id: "logo-text-sidebar-records",
                                        name: "div",
                                        type: "container",
                                        children: [
                                          {
                                            id: "logo-title-sidebar-records",
                                            name: "h1",
                                            type: "element",
                                            description: "text-lg font-bold text-foreground",
                                          },
                                          {
                                            id: "logo-subtitle-sidebar-records",
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
                            id: "navigation-menu-records",
                            name: "NavigationMenu",
                            type: "component",
                            importPath: "@/app/Components/Menu/NavigationMenu",
                            description: "activeMenu=activeMenu onMenuChange=onMenuChange",
                            children: [
                              {
                                id: "nav-element-sidebar-records",
                                name: "nav",
                                type: "element",
                                description: "flex-1 p-4",
                                children: [
                                  {
                                    id: "menu-list-sidebar-records",
                                    name: "ul",
                                    type: "element",
                                    description: "space-y-2",
                                    children: [
                                      {
                                        id: "navigation-menu-items-records",
                                        name: "NavigationMenuItems",
                                        type: "component",
                                        importPath: "@/app/Components/Menu/Menu Items/NavigationMenuItems",
                                        description: "activeMenu=activeMenu onMenuClick=handleMenuClick",
                                        children: [
                                          {
                                            id: "menu-item-li-records",
                                            name: "li",
                                            type: "element",
                                            description: "(mapped menuItems)",
                                            children: [
                                              {
                                                id: "menu-item-button-records",
                                                name: "button",
                                                type: "element",
                                                description: "onClick=onMenuClick className=w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors (conditional active styling)",
                                                children: [
                                                  {
                                                    id: "menu-item-icon-records",
                                                    name: "IconComponent",
                                                    type: "element",
                                                    description: "className=w-5 h-5 (DashboardIcon/EventAvailableIcon/PeopleIcon/DescriptionIcon/AdminPanelSettingsIcon)",
                                                  },
                                                  {
                                                    id: "menu-item-label-records",
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
                            id: "logout-section-records",
                            name: "LogoutSection",
                            type: "section",
                            importPath: "@/app/Components/Sections/Main Sidebar/LogoutSection",
                            children: [
                              {
                                id: "logout-container-sidebar-records",
                                name: "div",
                                type: "container",
                                description: "p-4 border-t border-zinc-200 dark:border-zinc-800",
                                children: [
                                  {
                                    id: "user-info-sidebar-records",
                                    name: "div",
                                    type: "container",
                                    description: "mb-3 px-4",
                                    children: [
                                      {
                                        id: "user-name-sidebar-records",
                                        name: "p",
                                        type: "element",
                                        description: "text-sm font-medium text-foreground",
                                      },
                                      {
                                        id: "user-email-sidebar-records",
                                        name: "p",
                                        type: "element",
                                        description: "text-xs text-zinc-500 dark:text-zinc-400",
                                      },
                                    ],
                                  },
                                  {
                                    id: "logout-button-sidebar-records",
                                    name: "Button",
                                    type: "component",
                                    importPath: "@/app/Components/Fields/Buttons",
                                    description: "variant=outline onClick=handleLogout className=w-full",
                                    children: [
                                      {
                                        id: "logout-button-element-sidebar-records",
                                        name: "button",
                                        type: "element",
                                        description: "type=button className=px-6 py-3 rounded-lg font-medium border-2 border-foreground",
                                        children: [
                                          {
                                            id: "logout-button-text-sidebar-records",
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
                    id: "main-content-records",
                    name: "main",
                    type: "container",
                    description: "flex-1 overflow-y-auto",
                    children: [
                      {
                        id: "content-wrapper-records",
                        name: "div",
                        type: "container",
                        description: "p-8",
                        children: [
                          {
                            id: "records-header",
                            name: "Header",
                            type: "component",
                            importPath: "@/app/Components/Headers/Header",
                            description: "title=Records",
                            children: [
                              {
                                id: "header-container-records",
                                name: "div",
                                type: "container",
                                description: "mb-8 flex justify-between items-center h-fit w-full",
                                children: [
                                  {
                                    id: "header-left-records",
                                    name: "div",
                                    type: "container",
                                    children: [
                                      {
                                        id: "header-title-records",
                                        name: "h2",
                                        type: "element",
                                        description: "text-3xl font-bold text-foreground mb-2",
                                      },
                                      {
                                        id: "header-subtitle-records",
                                        name: "p",
                                        type: "element",
                                        description: "text-zinc-600 dark:text-zinc-400 (conditional subtitle)",
                                      },
                                    ],
                                  },
                                  {
                                    id: "header-right-records",
                                    name: "div",
                                    type: "container",
                                    description: "mb-3 px-4 gap-4 flex h-full justify-center items-center",
                                    children: [
                                      {
                                        id: "user-info-header-records",
                                        name: "div",
                                        type: "container",
                                        description: "h-fit w-fit flex flex-col",
                                        children: [
                                          {
                                            id: "user-name-header-records",
                                            name: "p",
                                            type: "element",
                                            description: "text-sm font-medium text-foreground",
                                          },
                                          {
                                            id: "user-email-header-records",
                                            name: "p",
                                            type: "element",
                                            description: "text-xs text-zinc-500 dark:text-zinc-400",
                                          },
                                        ],
                                      },
                                      {
                                        id: "avatar-container-records",
                                        name: "div",
                                        type: "container",
                                        description: "w-[50px] h-[50px] rounded-full overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center",
                                        children: [
                                          {
                                            id: "person-icon-records",
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
                            id: "filter-records-section",
                            name: "FilterRecordsSection",
                            type: "section",
                            importPath: "@/app/Components/Sections/Records/FilterRecordsSection",
                            description: "classification=classification subject=subject date=date searchQuery=searchQuery activeTab=activeTab setClassification=setClassification setSubject=setSubject setDate=setDate setSearchQuery=setSearchQuery onGenerateList=handleShow",
                            children: [
                              {
                                id: "filter-container",
                                name: "div",
                                type: "container",
                                description: "bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6 mb-6",
                                children: [
                                  {
                                    id: "filter-title",
                                    name: "h2",
                                    type: "element",
                                    description: "text-lg font-semibold text-foreground mb-4",
                                  },
                                  {
                                    id: "filter-controls-row",
                                    name: "div",
                                    type: "container",
                                    description: "flex justify-between items-end gap-4",
                                    children: [
                                      {
                                        id: "filter-inputs-grid",
                                        name: "div",
                                        type: "container",
                                        description: "flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4",
                                        children: [
                                          {
                                            id: "classification-select-filter",
                                            name: "Select",
                                            type: "component",
                                            importPath: "@/app/Components/Fields/Select",
                                            description: "label=Classification value=classification onChange=setClassification options=classifications disabled=activeTab===student-records",
                                            children: [
                                              {
                                                id: "classification-select-wrapper",
                                                name: "div",
                                                type: "container",
                                                description: "w-full",
                                                children: [
                                                  {
                                                    id: "classification-select-label",
                                                    name: "label",
                                                    type: "element",
                                                    description: "block text-sm font-medium mb-2 text-foreground",
                                                  },
                                                  {
                                                    id: "classification-select-element",
                                                    name: "select",
                                                    type: "element",
                                                    description: "name=classification className=w-full px-4 py-3 rounded-lg border",
                                                  },
                                                ],
                                              },
                                            ],
                                          },
                                          {
                                            id: "subject-select-filter",
                                            name: "Select",
                                            type: "component",
                                            importPath: "@/app/Components/Fields/Select",
                                            description: "label=Subject value=subject onChange=setSubject options=subjects disabled=activeTab===student-records",
                                            children: [
                                              {
                                                id: "subject-select-wrapper",
                                                name: "div",
                                                type: "container",
                                                description: "w-full",
                                                children: [
                                                  {
                                                    id: "subject-select-label",
                                                    name: "label",
                                                    type: "element",
                                                    description: "block text-sm font-medium mb-2 text-foreground",
                                                  },
                                                  {
                                                    id: "subject-select-element",
                                                    name: "select",
                                                    type: "element",
                                                    description: "name=subject className=w-full px-4 py-3 rounded-lg border",
                                                  },
                                                ],
                                              },
                                            ],
                                          },
                                          {
                                            id: "date-input-filter",
                                            name: "Input",
                                            type: "component",
                                            importPath: "@/app/Components/Fields/Input",
                                            description: "label=Date type=date value=date onChange=setDate disabled=activeTab===student-records",
                                            children: [
                                              {
                                                id: "date-input-wrapper",
                                                name: "div",
                                                type: "container",
                                                description: "w-full",
                                                children: [
                                                  {
                                                    id: "date-input-label",
                                                    name: "label",
                                                    type: "element",
                                                    description: "block text-sm font-medium mb-2 text-foreground",
                                                  },
                                                  {
                                                    id: "date-input-element",
                                                    name: "input",
                                                    type: "element",
                                                    description: "type=date name=date className=w-full px-4 py-3 rounded-lg border",
                                                  },
                                                ],
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                      {
                                        id: "generate-button-container",
                                        name: "div",
                                        type: "container",
                                        description: "w-fit",
                                        children: [
                                          {
                                            id: "generate-button",
                                            name: "Button",
                                            type: "component",
                                            importPath: "@/app/Components/Fields/Buttons",
                                            description: "variant=primary onClick=onGenerateList className=flex items-center gap-2 disabled=activeTab===student-records || !classification || !subject || !date",
                                            children: [
                                              {
                                                id: "generate-button-element",
                                                name: "button",
                                                type: "element",
                                                description: "type=button className=px-6 py-3 rounded-lg font-medium",
                                                children: [
                                                  {
                                                    id: "generate-button-text",
                                                    name: "span",
                                                    type: "element",
                                                    description: "Generate List",
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
                                    id: "search-input-container",
                                    name: "div",
                                    type: "container",
                                    description: "w-fit mt-5",
                                    children: [
                                      {
                                        id: "search-input",
                                        name: "Input",
                                        type: "component",
                                        importPath: "@/app/Components/Fields/Input",
                                        description: "label=Search Student type=text value=searchQuery onChange=setSearchQuery placeholder=Search by name or student number",
                                        children: [
                                          {
                                            id: "search-input-wrapper",
                                            name: "div",
                                            type: "container",
                                            description: "w-full",
                                            children: [
                                              {
                                                id: "search-input-label",
                                                name: "label",
                                                type: "element",
                                                description: "block text-sm font-medium mb-2 text-foreground",
                                              },
                                              {
                                                id: "search-input-element",
                                                name: "input",
                                                type: "element",
                                                description: "type=text name=searchQuery className=w-full px-4 py-3 rounded-lg border",
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
                            id: "records-tabs-section",
                            name: "RecordsTabsSection",
                            type: "section",
                            importPath: "@/app/Components/Sections/Records/RecordsTabsSection",
                            description: "tabs=tabs activeTab=activeTab onTabChange=setActiveTab filteredRecords=filteredRecords onRemove=handleRemove userRole=user?.role",
                            children: [
                              {
                                id: "tabs-container-records",
                                name: "div",
                                type: "container",
                                description: "bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 mb-6",
                                children: [
                                  {
                                    id: "tabs-component-records",
                                    name: "Tabs",
                                    type: "component",
                                    importPath: "@/app/Components/Tabs/Tabs",
                                    description: "tabs=tabs activeTab=activeTab onTabChange=onTabChange",
                                    children: [
                                      {
                                        id: "tabs-container-inner",
                                        name: "div",
                                        type: "container",
                                        description: "flex border-b border-zinc-200 dark:border-zinc-800",
                                        children: [
                                          {
                                            id: "tab-button-mapped-records",
                                            name: "button",
                                            type: "element",
                                            description: "(mapped tabs) key=tab.id onClick=onTabChange(tab.id) className=px-6 py-4 font-medium transition-colors border-b-2 (conditional activeTab===tab.id ? border-foreground text-foreground : border-transparent text-zinc-600 dark:text-zinc-400 hover:text-foreground)",
                                            children: [
                                              {
                                                id: "tab-label-records",
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
                                ],
                              },
                              {
                                id: "attendance-records-tab-content",
                                name: "div",
                                type: "container",
                                description: "bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6 (conditional activeTab===attendance-records)",
                                children: [
                                  {
                                    id: "attendance-records-title",
                                    name: "h2",
                                    type: "element",
                                    description: "text-lg font-semibold text-foreground mb-4",
                                  },
                                  {
                                    id: "attendance-table",
                                    name: "AttendanceTable",
                                    type: "component",
                                    importPath: "@/app/Components/Tables/AttendanceTable",
                                    description: "records=filteredRecords onRemove=onRemove showQr=true showSignature=true showStatus=true showDate=true showTime=true",
                                    children: [
                                      {
                                        id: "table-container",
                                        name: "div",
                                        type: "container",
                                        description: "overflow-x-auto",
                                        children: [
                                          {
                                            id: "table-empty-state",
                                            name: "div",
                                            type: "container",
                                            description: "text-center py-12 text-zinc-500 dark:text-zinc-400 (conditional records.length===0)",
                                            children: [
                                              {
                                                id: "empty-state-message",
                                                name: "p",
                                                type: "element",
                                                description: "No records found",
                                              },
                                              {
                                                id: "empty-state-hint",
                                                name: "p",
                                                type: "element",
                                                description: "text-sm mt-2",
                                              },
                                            ],
                                          },
                                          {
                                            id: "table-element",
                                            name: "table",
                                            type: "element",
                                            description: "w-full border-collapse (conditional records.length>0)",
                                            children: [
                                              {
                                                id: "table-head",
                                                name: "thead",
                                                type: "element",
                                                children: [
                                                  {
                                                    id: "table-header-row",
                                                    name: "tr",
                                                    type: "element",
                                                    description: "border-b border-zinc-200 dark:border-zinc-800",
                                                    children: [
                                                      {
                                                        id: "header-name",
                                                        name: "th",
                                                        type: "element",
                                                        description: "px-4 py-3 text-left text-sm font-semibold text-foreground",
                                                      },
                                                      {
                                                        id: "header-sex",
                                                        name: "th",
                                                        type: "element",
                                                        description: "px-4 py-3 text-left text-sm font-semibold text-foreground",
                                                      },
                                                      {
                                                        id: "header-student-number",
                                                        name: "th",
                                                        type: "element",
                                                        description: "px-4 py-3 text-left text-sm font-semibold text-foreground",
                                                      },
                                                      {
                                                        id: "header-date",
                                                        name: "th",
                                                        type: "element",
                                                        description: "px-4 py-3 text-left text-sm font-semibold text-foreground (conditional showDate)",
                                                      },
                                                      {
                                                        id: "header-time",
                                                        name: "th",
                                                        type: "element",
                                                        description: "px-4 py-3 text-left text-sm font-semibold text-foreground (conditional showTime)",
                                                      },
                                                      {
                                                        id: "header-qr",
                                                        name: "th",
                                                        type: "element",
                                                        description: "px-4 py-3 text-left text-sm font-semibold text-foreground (conditional showQr)",
                                                      },
                                                      {
                                                        id: "header-signature",
                                                        name: "th",
                                                        type: "element",
                                                        description: "px-4 py-3 text-left text-sm font-semibold text-foreground (conditional showSignature)",
                                                      },
                                                      {
                                                        id: "header-status",
                                                        name: "th",
                                                        type: "element",
                                                        description: "px-4 py-3 text-left text-sm font-semibold text-foreground (conditional showStatus)",
                                                      },
                                                      {
                                                        id: "header-action",
                                                        name: "th",
                                                        type: "element",
                                                        description: "px-4 py-3 text-center text-sm font-semibold text-foreground",
                                                      },
                                                    ],
                                                  },
                                                ],
                                              },
                                              {
                                                id: "table-body",
                                                name: "tbody",
                                                type: "element",
                                                children: [
                                                  {
                                                    id: "table-row-mapped",
                                                    name: "tr",
                                                    type: "element",
                                                    description: "(mapped records) key=record.id border-b border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors",
                                                    children: [
                                                      {
                                                        id: "cell-name",
                                                        name: "td",
                                                        type: "element",
                                                        description: "px-4 py-3 text-sm text-foreground",
                                                      },
                                                      {
                                                        id: "cell-sex",
                                                        name: "td",
                                                        type: "element",
                                                        description: "px-4 py-3 text-sm text-foreground capitalize",
                                                      },
                                                      {
                                                        id: "cell-student-number",
                                                        name: "td",
                                                        type: "element",
                                                        description: "px-4 py-3 text-sm text-foreground",
                                                      },
                                                      {
                                                        id: "cell-date",
                                                        name: "td",
                                                        type: "element",
                                                        description: "px-4 py-3 text-sm text-foreground (conditional showDate)",
                                                      },
                                                      {
                                                        id: "cell-time",
                                                        name: "td",
                                                        type: "element",
                                                        description: "px-4 py-3 text-sm text-foreground (conditional showTime)",
                                                      },
                                                      {
                                                        id: "cell-qr",
                                                        name: "td",
                                                        type: "element",
                                                        description: "px-4 py-3 text-sm text-foreground font-mono text-xs (conditional showQr)",
                                                      },
                                                      {
                                                        id: "cell-signature",
                                                        name: "td",
                                                        type: "element",
                                                        description: "px-4 py-3 (conditional showSignature)",
                                                        children: [
                                                          {
                                                            id: "signature-image",
                                                            name: "img",
                                                            type: "element",
                                                            description: "w-16 h-10 object-contain border border-zinc-200 dark:border-zinc-700 rounded (conditional record.signature)",
                                                          },
                                                          {
                                                            id: "no-signature-text",
                                                            name: "span",
                                                            type: "element",
                                                            description: "text-sm text-zinc-400 dark:text-zinc-600 (conditional !record.signature)",
                                                          },
                                                        ],
                                                      },
                                                      {
                                                        id: "cell-status",
                                                        name: "td",
                                                        type: "element",
                                                        description: "px-4 py-3 (conditional showStatus)",
                                                        children: [
                                                          {
                                                            id: "status-badge",
                                                            name: "span",
                                                            type: "element",
                                                            description: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize (conditional status colors)",
                                                          },
                                                        ],
                                                      },
                                                      {
                                                        id: "cell-action",
                                                        name: "td",
                                                        type: "element",
                                                        description: "px-4 py-3 text-center",
                                                        children: [
                                                          {
                                                            id: "delete-button",
                                                            name: "button",
                                                            type: "element",
                                                            description: "onClick=onRemove(record.id) className=p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors title=Remove Entry",
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
                              {
                                id: "student-records-tab-content",
                                name: "div",
                                type: "container",
                                description: "bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6 (conditional activeTab===student-records && userRole===admin)",
                                children: [
                                  {
                                    id: "student-records-title",
                                    name: "h2",
                                    type: "element",
                                    description: "text-lg font-semibold text-foreground mb-4",
                                  },
                                  {
                                    id: "student-records-placeholder",
                                    name: "div",
                                    type: "container",
                                    description: "text-center py-12 text-zinc-500 dark:text-zinc-400",
                                    children: [
                                      {
                                        id: "placeholder-message",
                                        name: "p",
                                        type: "element",
                                        description: "Student Records content will be displayed here",
                                      },
                                      {
                                        id: "placeholder-hint",
                                        name: "p",
                                        type: "element",
                                        description: "text-sm mt-2",
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
                    id: "success-modal-records",
                    name: "SuccessModal",
                    type: "component",
                    importPath: "@/app/Components/Modals/SuccessModal",
                    description: "isOpen=successModal.isOpen onClose=setSuccessModal({ isOpen: false, message: '' }) message=successModal.message duration=3000",
                    children: [
                      {
                        id: "success-modal-base",
                        name: "Modal",
                        type: "component",
                        importPath: "@/app/Components/Modals/Modal",
                        description: "isOpen=isOpen onClose=onClose title=Success",
                        children: [
                          {
                            id: "success-modal-backdrop",
                            name: "div",
                            type: "container",
                            description: "fixed inset-0 z-50 flex items-center justify-center",
                            children: [
                              {
                                id: "success-backdrop-overlay",
                                name: "div",
                                type: "container",
                                description: "absolute inset-0 bg-black/50 backdrop-blur-sm onClick=onClose",
                              },
                              {
                                id: "success-modal-content",
                                name: "div",
                                type: "container",
                                description: "relative bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 w-full max-w-md max-h-[90vh] overflow-y-auto z-10 m-4",
                                children: [
                                  {
                                    id: "success-modal-header",
                                    name: "div",
                                    type: "container",
                                    description: "flex items-center justify-between p-6 border-b border-zinc-200 dark:border-zinc-800",
                                    children: [
                                      {
                                        id: "success-modal-title-container",
                                        name: "div",
                                        type: "container",
                                        description: "flex items-center gap-3",
                                        children: [
                                          {
                                            id: "success-modal-icon",
                                            name: "CheckCircleIcon",
                                            type: "element",
                                            description: "className=w-6 h-6 text-green-600 dark:text-green-400",
                                          },
                                          {
                                            id: "success-modal-title",
                                            name: "h2",
                                            type: "element",
                                            description: "text-2xl font-bold text-foreground",
                                          },
                                        ],
                                      },
                                      {
                                        id: "success-modal-close-button",
                                        name: "button",
                                        type: "element",
                                        description: "onClick=onClose className=p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-600 dark:text-zinc-400 hover:text-foreground",
                                        children: [
                                          {
                                            id: "success-close-icon",
                                            name: "CloseIcon",
                                            type: "element",
                                            description: "className=w-5 h-5",
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                  {
                                    id: "success-modal-body",
                                    name: "div",
                                    type: "container",
                                    description: "p-6",
                                    children: [
                                      {
                                        id: "success-message",
                                        name: "p",
                                        type: "element",
                                        description: "text-base text-foreground",
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
                    id: "error-modal-records",
                    name: "ErrorModal",
                    type: "component",
                    importPath: "@/app/Components/Modals/ErrorModal",
                    description: "isOpen=errorModal.isOpen onClose=setErrorModal({ isOpen: false, message: '' }) message=errorModal.message",
                    children: [
                      {
                        id: "error-modal-base",
                        name: "Modal",
                        type: "component",
                        importPath: "@/app/Components/Modals/Modal",
                        description: "isOpen=isOpen onClose=onClose title=Error",
                        children: [
                          {
                            id: "error-modal-backdrop",
                            name: "div",
                            type: "container",
                            description: "fixed inset-0 z-50 flex items-center justify-center",
                            children: [
                              {
                                id: "error-backdrop-overlay",
                                name: "div",
                                type: "container",
                                description: "absolute inset-0 bg-black/50 backdrop-blur-sm onClick=onClose",
                              },
                              {
                                id: "error-modal-content",
                                name: "div",
                                type: "container",
                                description: "relative bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 w-full max-w-md max-h-[90vh] overflow-y-auto z-10 m-4",
                                children: [
                                  {
                                    id: "error-modal-header",
                                    name: "div",
                                    type: "container",
                                    description: "flex items-center justify-between p-6 border-b border-zinc-200 dark:border-zinc-800",
                                    children: [
                                      {
                                        id: "error-modal-title-container",
                                        name: "div",
                                        type: "container",
                                        description: "flex items-center gap-3",
                                        children: [
                                          {
                                            id: "error-modal-icon",
                                            name: "ErrorIcon",
                                            type: "element",
                                            description: "className=w-6 h-6 text-red-600 dark:text-red-400",
                                          },
                                          {
                                            id: "error-modal-title",
                                            name: "h2",
                                            type: "element",
                                            description: "text-2xl font-bold text-foreground",
                                          },
                                        ],
                                      },
                                      {
                                        id: "error-modal-close-button",
                                        name: "button",
                                        type: "element",
                                        description: "onClick=onClose className=p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-600 dark:text-zinc-400 hover:text-foreground",
                                        children: [
                                          {
                                            id: "error-close-icon",
                                            name: "CloseIcon",
                                            type: "element",
                                            description: "className=w-5 h-5",
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                  {
                                    id: "error-modal-body",
                                    name: "div",
                                    type: "container",
                                    description: "p-6",
                                    children: [
                                      {
                                        id: "error-message",
                                        name: "p",
                                        type: "element",
                                        description: "text-base text-foreground",
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
