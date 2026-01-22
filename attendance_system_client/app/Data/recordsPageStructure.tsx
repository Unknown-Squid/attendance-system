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
            id: "records-content",
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
                                                    description: "className=w-5 h-5",
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
                                id: "filter-records-container",
                                name: "div",
                                type: "container",
                                description: "bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6 mb-6",
                                children: [
                                  {
                                    id: "filter-records-title",
                                    name: "h2",
                                    type: "element",
                                    description: "text-lg font-semibold text-foreground mb-4",
                                  },
                                  {
                                    id: "filter-records-main",
                                    name: "div",
                                    type: "container",
                                    description: "flex justify-between items-end gap-4",
                                    children: [
                                      {
                                        id: "filter-records-grid",
                                        name: "div",
                                        type: "container",
                                        description: "flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4",
                                        children: [
                                          {
                                            id: "classification-select-records",
                                            name: "Select",
                                            type: "component",
                                            importPath: "@/app/Components/Fields/Select",
                                            description: "label=Classification value=classification onChange=setClassification options=classifications disabled=(activeTab===student-records)",
                                            children: [
                                              {
                                                id: "select-wrapper-classification",
                                                name: "div",
                                                type: "container",
                                                description: "w-full",
                                                children: [
                                                  {
                                                    id: "select-label-classification",
                                                    name: "label",
                                                    type: "element",
                                                    description: "block text-sm font-medium mb-2 text-foreground",
                                                  },
                                                  {
                                                    id: "select-element-classification",
                                                    name: "select",
                                                    type: "element",
                                                    description: "w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 focus:border-foreground focus:ring-2 focus:ring-foreground/20 bg-white dark:bg-zinc-900 text-foreground focus:outline-none transition-colors",
                                                    children: [
                                                      {
                                                        id: "select-option-classification",
                                                        name: "option",
                                                        type: "element",
                                                        description: "(mapped options) key=value-index value=option.value",
                                                      },
                                                    ],
                                                  },
                                                  {
                                                    id: "select-error-classification",
                                                    name: "p",
                                                    type: "element",
                                                    description: "mt-1 text-sm text-red-500 dark:text-red-400 (conditional error)",
                                                  },
                                                ],
                                              },
                                            ],
                                          },
                                          {
                                            id: "subject-select-records",
                                            name: "Select",
                                            type: "component",
                                            importPath: "@/app/Components/Fields/Select",
                                            description: "label=Subject value=subject onChange=setSubject options=subjects disabled=(activeTab===student-records)",
                                            children: [
                                              {
                                                id: "select-wrapper-subject",
                                                name: "div",
                                                type: "container",
                                                description: "w-full",
                                                children: [
                                                  {
                                                    id: "select-label-subject",
                                                    name: "label",
                                                    type: "element",
                                                    description: "block text-sm font-medium mb-2 text-foreground",
                                                  },
                                                  {
                                                    id: "select-element-subject",
                                                    name: "select",
                                                    type: "element",
                                                    description: "w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 focus:border-foreground focus:ring-2 focus:ring-foreground/20 bg-white dark:bg-zinc-900 text-foreground focus:outline-none transition-colors",
                                                    children: [
                                                      {
                                                        id: "select-option-subject",
                                                        name: "option",
                                                        type: "element",
                                                        description: "(mapped options) key=value-index value=option.value",
                                                      },
                                                    ],
                                                  },
                                                  {
                                                    id: "select-error-subject",
                                                    name: "p",
                                                    type: "element",
                                                    description: "mt-1 text-sm text-red-500 dark:text-red-400 (conditional error)",
                                                  },
                                                ],
                                              },
                                            ],
                                          },
                                          {
                                            id: "date-input-records",
                                            name: "Input",
                                            type: "component",
                                            importPath: "@/app/Components/Fields/Input",
                                            description: "label=Date type=date value=date onChange=setDate disabled=(activeTab===student-records)",
                                            children: [
                                              {
                                                id: "input-wrapper-date",
                                                name: "div",
                                                type: "container",
                                                description: "w-full",
                                                children: [
                                                  {
                                                    id: "input-label-date",
                                                    name: "label",
                                                    type: "element",
                                                    description: "block text-sm font-medium mb-2 text-foreground",
                                                  },
                                                  {
                                                    id: "input-element-date",
                                                    name: "input",
                                                    type: "element",
                                                    description: "type=date w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 focus:border-foreground focus:ring-2 focus:ring-foreground/20 bg-white dark:bg-zinc-900 text-foreground placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none transition-colors",
                                                  },
                                                  {
                                                    id: "input-error-date",
                                                    name: "p",
                                                    type: "element",
                                                    description: "mt-1 text-sm text-red-500 dark:text-red-400 (conditional error)",
                                                  },
                                                ],
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                      {
                                        id: "generate-button-wrapper-records",
                                        name: "div",
                                        type: "container",
                                        description: "w-fit",
                                        children: [
                                          {
                                            id: "generate-button-records",
                                            name: "Button",
                                            type: "component",
                                            importPath: "@/app/Components/Fields/Buttons",
                                            description: "variant=primary onClick=onGenerateList className=flex items-center gap-2 disabled=(activeTab===student-records || !classification || !subject || !date)",
                                            children: [
                                              {
                                                id: "generate-button-element-records",
                                                name: "button",
                                                type: "element",
                                                description: "type=button className=px-6 py-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed bg-foreground text-background hover:bg-[#383838] dark:hover:bg-[#ccc] focus:ring-foreground",
                                                children: [
                                                  {
                                                    id: "generate-loading-state-records",
                                                    name: "span",
                                                    type: "element",
                                                    description: "flex items-center justify-center gap-2 (conditional isLoading)",
                                                    children: [
                                                      {
                                                        id: "generate-loading-spinner-records",
                                                        name: "svg",
                                                        type: "element",
                                                        description: "animate-spin h-5 w-5 xmlns=http://www.w3.org/2000/svg fill=none viewBox=0 0 24 24",
                                                        children: [
                                                          {
                                                            id: "generate-spinner-circle-records",
                                                            name: "circle",
                                                            type: "element",
                                                            description: "opacity-25 cx=12 cy=12 r=10 stroke=currentColor strokeWidth=4",
                                                          },
                                                          {
                                                            id: "generate-spinner-path-records",
                                                            name: "path",
                                                            type: "element",
                                                            description: "opacity-75 fill=currentColor d=M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z",
                                                          },
                                                        ],
                                                      },
                                                      {
                                                        id: "generate-loading-text-records",
                                                        name: "span",
                                                        type: "element",
                                                        description: "Loading...",
                                                      },
                                                    ],
                                                  },
                                                  {
                                                    id: "generate-button-text-records",
                                                    name: "span",
                                                    type: "element",
                                                    description: "Generate List (conditional !isLoading)",
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
                                    id: "search-input-wrapper-records",
                                    name: "div",
                                    type: "container",
                                    description: "w-fit mt-5",
                                    children: [
                                      {
                                        id: "search-input-records",
                                        name: "Input",
                                        type: "component",
                                        importPath: "@/app/Components/Fields/Input",
                                        description: "label=Search Student type=text value=searchQuery onChange=setSearchQuery placeholder=Search by name or student number",
                                        children: [
                                          {
                                            id: "input-wrapper-search",
                                            name: "div",
                                            type: "container",
                                            description: "w-full",
                                            children: [
                                              {
                                                id: "input-label-search",
                                                name: "label",
                                                type: "element",
                                                description: "block text-sm font-medium mb-2 text-foreground",
                                              },
                                              {
                                                id: "input-element-search",
                                                name: "input",
                                                type: "element",
                                                description: "type=text w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 focus:border-foreground focus:ring-2 focus:ring-foreground/20 bg-white dark:bg-zinc-900 text-foreground placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none transition-colors",
                                              },
                                              {
                                                id: "input-error-search",
                                                name: "p",
                                                type: "element",
                                                description: "mt-1 text-sm text-red-500 dark:text-red-400 (conditional error)",
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
                                id: "tabs-wrapper-records",
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
                                        id: "tabs-container-records",
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
                                id: "attendance-records-content",
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
                                    id: "attendance-table-records",
                                    name: "AttendanceTable",
                                    type: "component",
                                    importPath: "@/app/Components/Tables/AttendanceTable",
                                    description: "records=filteredRecords onRemove=onRemove showQr=true showSignature=true showStatus=true showDate=true showTime=true",
                                    children: [
                                      {
                                        id: "table-wrapper-records",
                                        name: "div",
                                        type: "container",
                                        description: "overflow-x-auto",
                                        children: [
                                          {
                                            id: "table-empty-state-records",
                                            name: "div",
                                            type: "container",
                                            description: "text-center py-12 text-zinc-500 dark:text-zinc-400 (conditional records.length===0)",
                                            children: [
                                              {
                                                id: "empty-state-message-records",
                                                name: "p",
                                                type: "element",
                                                description: "No records found",
                                              },
                                              {
                                                id: "empty-state-hint-records",
                                                name: "p",
                                                type: "element",
                                                description: "text-sm mt-2",
                                              },
                                            ],
                                          },
                                          {
                                            id: "table-element-records",
                                            name: "table",
                                            type: "element",
                                            description: "w-full border-collapse (conditional records.length > 0)",
                                            children: [
                                              {
                                                id: "table-head-records",
                                                name: "thead",
                                                type: "element",
                                                children: [
                                                  {
                                                    id: "table-head-row-records",
                                                    name: "tr",
                                                    type: "element",
                                                    description: "border-b border-zinc-200 dark:border-zinc-800",
                                                    children: [
                                                      {
                                                        id: "table-head-name-records",
                                                        name: "th",
                                                        type: "element",
                                                        description: "px-4 py-3 text-left text-sm font-semibold text-foreground",
                                                      },
                                                      {
                                                        id: "table-head-sex-records",
                                                        name: "th",
                                                        type: "element",
                                                        description: "px-4 py-3 text-left text-sm font-semibold text-foreground",
                                                      },
                                                      {
                                                        id: "table-head-student-number-records",
                                                        name: "th",
                                                        type: "element",
                                                        description: "px-4 py-3 text-left text-sm font-semibold text-foreground",
                                                      },
                                                      {
                                                        id: "table-head-date-records",
                                                        name: "th",
                                                        type: "element",
                                                        description: "px-4 py-3 text-left text-sm font-semibold text-foreground (conditional showDate)",
                                                      },
                                                      {
                                                        id: "table-head-time-records",
                                                        name: "th",
                                                        type: "element",
                                                        description: "px-4 py-3 text-left text-sm font-semibold text-foreground (conditional showTime)",
                                                      },
                                                      {
                                                        id: "table-head-qr-records",
                                                        name: "th",
                                                        type: "element",
                                                        description: "px-4 py-3 text-left text-sm font-semibold text-foreground (conditional showQr)",
                                                      },
                                                      {
                                                        id: "table-head-signature-records",
                                                        name: "th",
                                                        type: "element",
                                                        description: "px-4 py-3 text-left text-sm font-semibold text-foreground (conditional showSignature)",
                                                      },
                                                      {
                                                        id: "table-head-status-records",
                                                        name: "th",
                                                        type: "element",
                                                        description: "px-4 py-3 text-left text-sm font-semibold text-foreground (conditional showStatus)",
                                                      },
                                                      {
                                                        id: "table-head-action-records",
                                                        name: "th",
                                                        type: "element",
                                                        description: "px-4 py-3 text-center text-sm font-semibold text-foreground",
                                                      },
                                                    ],
                                                  },
                                                ],
                                              },
                                              {
                                                id: "table-body-records",
                                                name: "tbody",
                                                type: "element",
                                                children: [
                                                  {
                                                    id: "table-row-mapped-records",
                                                    name: "tr",
                                                    type: "element",
                                                    description: "(mapped records) key=record.id className=border-b border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors",
                                                    children: [
                                                      {
                                                        id: "table-cell-name-records",
                                                        name: "td",
                                                        type: "element",
                                                        description: "px-4 py-3 text-sm text-foreground",
                                                      },
                                                      {
                                                        id: "table-cell-sex-records",
                                                        name: "td",
                                                        type: "element",
                                                        description: "px-4 py-3 text-sm text-foreground capitalize",
                                                      },
                                                      {
                                                        id: "table-cell-student-number-records",
                                                        name: "td",
                                                        type: "element",
                                                        description: "px-4 py-3 text-sm text-foreground",
                                                      },
                                                      {
                                                        id: "table-cell-date-records",
                                                        name: "td",
                                                        type: "element",
                                                        description: "px-4 py-3 text-sm text-foreground (conditional showDate)",
                                                      },
                                                      {
                                                        id: "table-cell-time-records",
                                                        name: "td",
                                                        type: "element",
                                                        description: "px-4 py-3 text-sm text-foreground (conditional showTime)",
                                                      },
                                                      {
                                                        id: "table-cell-qr-records",
                                                        name: "td",
                                                        type: "element",
                                                        description: "px-4 py-3 text-sm text-foreground font-mono text-xs (conditional showQr)",
                                                      },
                                                      {
                                                        id: "table-cell-signature-records",
                                                        name: "td",
                                                        type: "element",
                                                        description: "px-4 py-3 (conditional showSignature)",
                                                        children: [
                                                          {
                                                            id: "signature-image-records",
                                                            name: "img",
                                                            type: "element",
                                                            description: "w-16 h-10 object-contain border border-zinc-200 dark:border-zinc-700 rounded (conditional record.signature)",
                                                          },
                                                          {
                                                            id: "signature-empty-records",
                                                            name: "span",
                                                            type: "element",
                                                            description: "text-sm text-zinc-400 dark:text-zinc-600 (conditional !record.signature)",
                                                          },
                                                        ],
                                                      },
                                                      {
                                                        id: "table-cell-status-records",
                                                        name: "td",
                                                        type: "element",
                                                        description: "px-4 py-3 (conditional showStatus)",
                                                        children: [
                                                          {
                                                            id: "status-badge-records",
                                                            name: "span",
                                                            type: "element",
                                                            description: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize (conditional status color classes)",
                                                          },
                                                        ],
                                                      },
                                                      {
                                                        id: "table-cell-action-records",
                                                        name: "td",
                                                        type: "element",
                                                        description: "px-4 py-3 text-center",
                                                        children: [
                                                          {
                                                            id: "delete-button-table-records",
                                                            name: "button",
                                                            type: "element",
                                                            description: "onClick=onRemove(record.id) className=p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors title=Remove Entry",
                                                            children: [
                                                              {
                                                                id: "delete-icon-table-records",
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
                                id: "student-records-content",
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
                                        id: "student-records-message",
                                        name: "p",
                                        type: "element",
                                        description: "Student Records content will be displayed here",
                                      },
                                      {
                                        id: "student-records-hint",
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
                ],
              },
            ],
          },
        ],
      },
    ],
;