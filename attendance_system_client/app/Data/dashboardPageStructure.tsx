import { ComponentInfo } from "./types";

export const dashboardPageStructure: ComponentInfo = {
    id: "dashboard-page",
    name: "DashboardPage",
    type: "page",
    children: [
      {
        id: "protected-route",
        name: "ProtectedRoute",
        type: "component",
        importPath: "@/app/Components/ProtectedRoute",
        children: [
          {
            id: "dashboard-content",
            name: "DashboardContent",
            type: "container",
            description: "flex min-h-screen bg-zinc-50 dark:bg-black",
            children: [
              {
                id: "main-sidebar",
                name: "MainSidebar",
                type: "component",
                importPath: "@/app/Components/Sidebars/MainSidebar",
                children: [
                  {
                    id: "sidebar-container",
                    name: "aside",
                    type: "container",
                    description: "w-64 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 flex flex-col",
                    children: [
                      {
                        id: "logo-section",
                        name: "LogoSection",
                        type: "section",
                        importPath: "@/app/Components/Sections/Main Sidebar/LogoSection",
                        children: [
                          {
                            id: "logo-container",
                            name: "div",
                            type: "container",
                            description: "p-6 border-b border-zinc-200 dark:border-zinc-800",
                            children: [
                              {
                                id: "logo-content",
                                name: "div",
                                type: "container",
                                description: "flex items-center gap-3",
                                children: [
                                  {
                                    id: "logo-icon",
                                    name: "LogoIcon",
                                    type: "component",
                                    importPath: "@/app/Components/Icons/LogoIcon",
                                    description: "className=w-8 h-8 text-foreground",
                                  },
                                  {
                                    id: "logo-text",
                                    name: "div",
                                    type: "container",
                                    children: [
                                      {
                                        id: "logo-title",
                                        name: "h1",
                                        type: "element",
                                        description: "text-lg font-bold text-foreground",
                                      },
                                      {
                                        id: "logo-subtitle",
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
                        id: "navigation-menu",
                        name: "NavigationMenu",
                        type: "component",
                        importPath: "@/app/Components/Menu/NavigationMenu",
                        children: [
                          {
                            id: "menu-nav",
                            name: "nav",
                            type: "element",
                            description: "flex-1 p-4",
                            children: [
                              {
                                id: "menu-list",
                                name: "ul",
                                type: "element",
                                description: "space-y-2",
                                children: [
                                  {
                                    id: "menu-items",
                                    name: "NavigationMenuItems",
                                    type: "component",
                                    importPath: "@/app/Components/Menu/Menu Items/NavigationMenuItems",
                                    children: [
                                      {
                                        id: "menu-item",
                                        name: "li",
                                        type: "element",
                                        description: "mapped items",
                                        children: [
                                          {
                                            id: "menu-button",
                                            name: "button",
                                            type: "element",
                                            description: "onClick=handleMenuClick className=w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                                            children: [
                                              {
                                                id: "menu-icon",
                                                name: "IconComponent",
                                                type: "element",
                                                description: "className=w-5 h-5 (DashboardIcon / EventAvailableIcon / PeopleIcon / DescriptionIcon / AdminPanelSettingsIcon)",
                                              },
                                              {
                                                id: "menu-label",
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
                        id: "logout-section",
                        name: "LogoutSection",
                        type: "section",
                        importPath: "@/app/Components/Sections/Main Sidebar/LogoutSection",
                        children: [
                          {
                            id: "logout-container",
                            name: "div",
                            type: "container",
                            description: "p-4 border-t border-zinc-200 dark:border-zinc-800",
                            children: [
                              {
                                id: "user-info",
                                name: "div",
                                type: "container",
                                description: "mb-3 px-4",
                                children: [
                                  {
                                    id: "user-name",
                                    name: "p",
                                    type: "element",
                                    description: "text-sm font-medium text-foreground",
                                  },
                                  {
                                    id: "user-email",
                                    name: "p",
                                    type: "element",
                                    description: "text-xs text-zinc-500 dark:text-zinc-400",
                                  },
                                ],
                              },
                              {
                                id: "logout-button",
                                name: "Button",
                                type: "component",
                                importPath: "@/app/Components/Fields/Buttons",
                                description: "variant=outline onClick=handleLogout className=w-full",
                                children: [
                                  {
                                    id: "button-element",
                                    name: "button",
                                    type: "element",
                                    description: "type=button className=px-6 py-3 rounded-lg font-medium border-2 border-foreground",
                                    children: [
                                      {
                                        id: "button-text",
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
                id: "main-content",
                name: "main",
                type: "container",
                description: "flex-1 overflow-y-auto",
                children: [
                  {
                    id: "content-wrapper",
                    name: "div",
                    type: "container",
                    description: "p-8",
                    children: [
                      {
                        id: "header",
                        name: "Header",
                        type: "component",
                        importPath: "@/app/Components/Headers/Header",
                        children: [
                          {
                            id: "header-container",
                            name: "div",
                            type: "container",
                            description: "mb-8 flex justify-between items-center h-fit w-full",
                            children: [
                              {
                                id: "header-left",
                                name: "div",
                                type: "container",
                                children: [
                                  {
                                    id: "header-title",
                                    name: "h2",
                                    type: "element",
                                    description: "text-3xl font-bold text-foreground mb-2",
                                  },
                                  {
                                    id: "header-subtitle",
                                    name: "p",
                                    type: "element",
                                    description: "text-zinc-600 dark:text-zinc-400 (conditional)",
                                  },
                                ],
                              },
                              {
                                id: "header-right",
                                name: "div",
                                type: "container",
                                description: "mb-3 px-4 gap-4 flex h-full justify-center items-center",
                                children: [
                                  {
                                    id: "user-info-header",
                                    name: "div",
                                    type: "container",
                                    description: "h-fit w-fit flex flex-col",
                                    children: [
                                      {
                                        id: "user-name-header",
                                        name: "p",
                                        type: "element",
                                        description: "text-sm font-medium text-foreground",
                                      },
                                      {
                                        id: "user-email-header",
                                        name: "p",
                                        type: "element",
                                        description: "text-xs text-zinc-500 dark:text-zinc-400",
                                      },
                                    ],
                                  },
                                  {
                                    id: "avatar-container",
                                    name: "div",
                                    type: "container",
                                    description: "w-[50px] h-[50px] rounded-full overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center",
                                    children: [
                                      {
                                        id: "person-icon",
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
                        id: "stats-card-section",
                        name: "StatsCardSection",
                        type: "section",
                        importPath: "@/app/Components/Sections/Dashboard/StatsCardSection",
                        children: [
                          {
                            id: "stats-grid",
                            name: "div",
                            type: "container",
                            description: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8",
                            children: [
                              {
                                id: "overview-card",
                                name: "OverviewCard",
                                type: "component",
                                importPath: "@/app/Components/Cards/OverviewCard",
                                description: "mapped cards (Total Students, Total Sections, Attendance)",
                                children: [
                                  {
                                    id: "card-container",
                                    name: "div",
                                    type: "container",
                                    description: "bg-white dark:bg-zinc-900 rounded-lg p-6 border border-zinc-200 dark:border-zinc-800",
                                    children: [
                                      {
                                        id: "card-header",
                                        name: "div",
                                        type: "container",
                                        description: "flex items-start justify-between mb-4",
                                        children: [
                                          {
                                            id: "card-content",
                                            name: "div",
                                            type: "container",
                                            description: "flex-1",
                                            children: [
                                              {
                                                id: "card-title",
                                                name: "p",
                                                type: "element",
                                                description: "text-sm text-zinc-600 dark:text-zinc-400 mb-1",
                                              },
                                              {
                                                id: "card-total",
                                                name: "p",
                                                type: "element",
                                                description: "text-3xl font-bold text-foreground",
                                              },
                                            ],
                                          },
                                          {
                                            id: "card-icon",
                                            name: "div",
                                            type: "container",
                                            description: "w-12 h-12 rounded-full flex items-center justify-center (conditional)",
                                            children: [
                                              {
                                                id: "icon-component",
                                                name: "icon",
                                                type: "element",
                                                description: "PeopleIcon / ClassIcon / EventAvailableIcon",
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                      {
                                        id: "card-breakdown",
                                        name: "div",
                                        type: "container",
                                        description: "pt-4 border-t border-zinc-200 dark:border-zinc-800 (conditional)",
                                        children: [
                                          {
                                            id: "breakdown-grid",
                                            name: "div",
                                            type: "container",
                                            description: "flex flex-wrap gap-4",
                                            children: [
                                              {
                                                id: "breakdown-item",
                                                name: "div",
                                                type: "container",
                                                description: "flex-1 min-w-[100px] (mapped)",
                                                children: [
                                                  {
                                                    id: "breakdown-label",
                                                    name: "p",
                                                    type: "element",
                                                    description: "text-xs text-zinc-500 dark:text-zinc-400 mb-1",
                                                  },
                                                  {
                                                    id: "breakdown-value",
                                                    name: "p",
                                                    type: "element",
                                                    description: "text-lg font-semibold text-foreground",
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
                        id: "gender-today-grid",
                        name: "div",
                        type: "container",
                        description: "grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8",
                        children: [
                          {
                            id: "gender-comparison-section",
                            name: "GenderComparisonSection",
                            type: "section",
                            importPath: "@/app/Components/Sections/Dashboard/GenderComparisonSection",
                            children: [
                              {
                                id: "gender-container",
                                name: "div",
                                type: "container",
                                description: "bg-white dark:bg-zinc-900 rounded-lg p-6 border border-zinc-200 dark:border-zinc-800",
                                children: [
                                  {
                                    id: "gender-title",
                                    name: "h3",
                                    type: "element",
                                    description: "text-xl font-semibold text-foreground mb-4",
                                  },
                                  {
                                    id: "gender-chart",
                                    name: "ResponsiveBarChart",
                                    type: "component",
                                    importPath: "@/app/Components/Charts/ResponsiveBarChart",
                                    description: "data=data keys=[male, female] indexBy=category height=400px",
                                  },
                                ],
                              },
                            ],
                          },
                          {
                            id: "today-attendance-section",
                            name: "TodayAttendanceSection",
                            type: "section",
                            importPath: "@/app/Components/Sections/Dashboard/TodayAttendanceSection",
                            children: [
                              {
                                id: "today-container",
                                name: "div",
                                type: "container",
                                description: "bg-white dark:bg-zinc-900 rounded-lg p-6 border border-zinc-200 dark:border-zinc-800",
                                children: [
                                  {
                                    id: "today-title",
                                    name: "h3",
                                    type: "element",
                                    description: "text-xl font-semibold text-foreground mb-2",
                                  },
                                  {
                                    id: "today-subtitle",
                                    name: "p",
                                    type: "element",
                                    description: "text-sm text-zinc-500 dark:text-zinc-400 mb-4",
                                  },
                                  {
                                    id: "today-pie-chart",
                                    name: "ResponsivePieChart",
                                    type: "component",
                                    importPath: "@/app/Components/Charts/ResponsivePieChart",
                                    description: "data=data height=350px innerRadius=0.6 padAngle=2 cornerRadius=4",
                                  },
                                  {
                                    id: "today-stats-grid",
                                    name: "div",
                                    type: "container",
                                    description: "mt-4 grid grid-cols-3 gap-4 text-center",
                                    children: [
                                      {
                                        id: "present-stat",
                                        name: "div",
                                        type: "container",
                                        children: [
                                          {
                                            id: "present-count",
                                            name: "p",
                                            type: "element",
                                            description: "text-2xl font-bold text-green-600 dark:text-green-400",
                                          },
                                          {
                                            id: "present-label",
                                            name: "p",
                                            type: "element",
                                            description: "text-xs text-zinc-500 dark:text-zinc-400",
                                          },
                                        ],
                                      },
                                      {
                                        id: "absent-stat",
                                        name: "div",
                                        type: "container",
                                        children: [
                                          {
                                            id: "absent-count",
                                            name: "p",
                                            type: "element",
                                            description: "text-2xl font-bold text-red-600 dark:text-red-400",
                                          },
                                          {
                                            id: "absent-label",
                                            name: "p",
                                            type: "element",
                                            description: "text-xs text-zinc-500 dark:text-zinc-400",
                                          },
                                        ],
                                      },
                                      {
                                        id: "not-recorded-stat",
                                        name: "div",
                                        type: "container",
                                        children: [
                                          {
                                            id: "not-recorded-count",
                                            name: "p",
                                            type: "element",
                                            description: "text-2xl font-bold text-zinc-500 dark:text-zinc-400",
                                          },
                                          {
                                            id: "not-recorded-label",
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
                        ],
                      },
                      {
                        id: "attendance-chart-section",
                        name: "AttendanceChartSection",
                        type: "section",
                        importPath: "@/app/Components/Sections/Dashboard/AttendanceChartSection",
                        children: [
                          {
                            id: "chart-container",
                            name: "div",
                            type: "container",
                            description: "bg-white dark:bg-zinc-900 rounded-lg p-6 border border-zinc-200 dark:border-zinc-800 mb-8",
                            children: [
                              {
                                id: "chart-title",
                                name: "h3",
                                type: "element",
                                description: "text-xl font-semibold text-foreground mb-4",
                              },
                              {
                                id: "monthly-chart",
                                name: "ResponsiveBarChart",
                                type: "component",
                                importPath: "@/app/Components/Charts/ResponsiveBarChart",
                                description: "data=chartData keys=[present, absent] indexBy=month height=400px",
                              },
                            ],
                          },
                        ],
                      },
                      {
                        id: "recent-activity-section",
                        name: "RecentActivitySection",
                        type: "section",
                        importPath: "@/app/Components/Sections/Dashboard/RecentActivitySection",
                        children: [
                          {
                            id: "activity-container",
                            name: "div",
                            type: "container",
                            description: "bg-white dark:bg-zinc-900 rounded-lg p-6 border border-zinc-200 dark:border-zinc-800",
                            children: [
                              {
                                id: "activity-title",
                                name: "h3",
                                type: "element",
                                description: "text-xl font-semibold text-foreground mb-4",
                              },
                              {
                                id: "activity-empty",
                                name: "div",
                                type: "container",
                                description: "text-center py-12 text-zinc-500 dark:text-zinc-400",
                                children: [
                                  {
                                    id: "empty-message",
                                    name: "p",
                                    type: "element",
                                    description: "No recent activity",
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