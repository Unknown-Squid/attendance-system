import { ComponentInfo } from "./types";

export const dashboardPageStructure: ComponentInfo = {
    id: "dashboard-page",
    name: "DashboardPage",
    type: "page",
    children: [
      {
        id: "protected-route-dashboard",
        name: "ProtectedRoute",
        type: "component",
        importPath: "@/app/Components/ProtectedRoute",
        children: [
          {
            id: "dashboard-content",
            name: "DashboardContent",
            type: "component",
            importPath: "@/app/(Pages)/dashboard/page.tsx",
            children: [
              {
                id: "dashboard-root-div",
                name: "div",
                type: "container",
                description: "flex min-h-screen bg-zinc-50 dark:bg-black",
                children: [
                  {
                    id: "main-sidebar-dashboard",
                    name: "MainSidebar",
                    type: "component",
                    importPath: "@/app/Components/Sidebars/MainSidebar",
                    description: "activeMenu=activeMenu onMenuChange=setActiveMenu",
                    children: [
                      {
                        id: "sidebar-aside-dashboard",
                        name: "aside",
                        type: "container",
                        description: "w-64 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 flex flex-col",
                        children: [
                          {
                            id: "logo-section-dashboard",
                            name: "LogoSection",
                            type: "section",
                            importPath: "@/app/Components/Sections/Main Sidebar/LogoSection",
                            children: [
                              {
                                id: "logo-container-sidebar-dashboard",
                                name: "div",
                                type: "container",
                                description: "p-6 border-b border-zinc-200 dark:border-zinc-800",
                                children: [
                                  {
                                    id: "logo-content-sidebar-dashboard",
                                    name: "div",
                                    type: "container",
                                    description: "flex items-center gap-3",
                                    children: [
                                      {
                                        id: "logo-icon-sidebar-dashboard",
                                        name: "LogoIcon",
                                        type: "component",
                                        importPath: "@/app/Components/Icons/LogoIcon",
                                        description: "className=w-8 h-8 text-foreground",
                                      },
                                      {
                                        id: "logo-text-sidebar-dashboard",
                                        name: "div",
                                        type: "container",
                                        children: [
                                          {
                                            id: "logo-title-sidebar-dashboard",
                                            name: "h1",
                                            type: "element",
                                            description: "text-lg font-bold text-foreground",
                                          },
                                          {
                                            id: "logo-subtitle-sidebar-dashboard",
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
                            id: "navigation-menu-dashboard",
                            name: "NavigationMenu",
                            type: "component",
                            importPath: "@/app/Components/Menu/NavigationMenu",
                            description: "activeMenu=activeMenu onMenuChange=onMenuChange",
                            children: [
                              {
                                id: "nav-element-sidebar-dashboard",
                                name: "nav",
                                type: "element",
                                description: "flex-1 p-4",
                                children: [
                                  {
                                    id: "menu-list-sidebar-dashboard",
                                    name: "ul",
                                    type: "element",
                                    description: "space-y-2",
                                    children: [
                                      {
                                        id: "navigation-menu-items-dashboard",
                                        name: "NavigationMenuItems",
                                        type: "component",
                                        importPath: "@/app/Components/Menu/Menu Items/NavigationMenuItems",
                                        description: "activeMenu=activeMenu onMenuClick=handleMenuClick",
                                        children: [
                                          {
                                            id: "menu-item-li-dashboard",
                                            name: "li",
                                            type: "element",
                                            description: "(mapped menuItems)",
                                            children: [
                                              {
                                                id: "menu-item-button-dashboard",
                                                name: "button",
                                                type: "element",
                                                description: "onClick=onMenuClick className=w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors (conditional active styling)",
                                                children: [
                                                  {
                                                    id: "menu-item-icon-dashboard",
                                                    name: "IconComponent",
                                                    type: "element",
                                                    description: "className=w-5 h-5 (DashboardIcon/EventAvailableIcon/PeopleIcon/DescriptionIcon/AdminPanelSettingsIcon)",
                                                  },
                                                  {
                                                    id: "menu-item-label-dashboard",
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
                            id: "logout-section-dashboard",
                            name: "LogoutSection",
                            type: "section",
                            importPath: "@/app/Components/Sections/Main Sidebar/LogoutSection",
                            children: [
                              {
                                id: "logout-container-sidebar-dashboard",
                                name: "div",
                                type: "container",
                                description: "p-4 border-t border-zinc-200 dark:border-zinc-800",
                                children: [
                                  {
                                    id: "user-info-sidebar-dashboard",
                                    name: "div",
                                    type: "container",
                                    description: "mb-3 px-4",
                                    children: [
                                      {
                                        id: "user-name-sidebar-dashboard",
                                        name: "p",
                                        type: "element",
                                        description: "text-sm font-medium text-foreground",
                                      },
                                      {
                                        id: "user-email-sidebar-dashboard",
                                        name: "p",
                                        type: "element",
                                        description: "text-xs text-zinc-500 dark:text-zinc-400",
                                      },
                                    ],
                                  },
                                  {
                                    id: "logout-button-sidebar-dashboard",
                                    name: "Button",
                                    type: "component",
                                    importPath: "@/app/Components/Fields/Buttons",
                                    description: "variant=outline onClick=handleLogout className=w-full",
                                    children: [
                                      {
                                        id: "logout-button-element-sidebar-dashboard",
                                        name: "button",
                                        type: "element",
                                        description: "type=button className=px-6 py-3 rounded-lg font-medium border-2 border-foreground",
                                        children: [
                                          {
                                            id: "logout-button-text-sidebar-dashboard",
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
                    id: "main-content-dashboard",
                    name: "main",
                    type: "container",
                    description: "flex-1 overflow-y-auto",
                    children: [
                      {
                        id: "content-wrapper-dashboard",
                        name: "div",
                        type: "container",
                        description: "p-8",
                        children: [
                          {
                            id: "dashboard-header",
                            name: "Header",
                            type: "component",
                            importPath: "@/app/Components/Headers/Header",
                            description: "title=Dashboard",
                            children: [
                              {
                                id: "header-container-dashboard",
                                name: "div",
                                type: "container",
                                description: "mb-8 flex justify-between items-center h-fit w-full",
                                children: [
                                  {
                                    id: "header-left-dashboard",
                                    name: "div",
                                    type: "container",
                                    children: [
                                      {
                                        id: "header-title-dashboard",
                                        name: "h2",
                                        type: "element",
                                        description: "text-3xl font-bold text-foreground mb-2",
                                      },
                                      {
                                        id: "header-subtitle-dashboard",
                                        name: "p",
                                        type: "element",
                                        description: "text-zinc-600 dark:text-zinc-400 (conditional subtitle)",
                                      },
                                    ],
                                  },
                                  {
                                    id: "header-right-dashboard",
                                    name: "div",
                                    type: "container",
                                    description: "mb-3 px-4 gap-4 flex h-full justify-center items-center",
                                    children: [
                                      {
                                        id: "user-info-header-dashboard",
                                        name: "div",
                                        type: "container",
                                        description: "h-fit w-fit flex flex-col",
                                        children: [
                                          {
                                            id: "user-name-header-dashboard",
                                            name: "p",
                                            type: "element",
                                            description: "text-sm font-medium text-foreground",
                                          },
                                          {
                                            id: "user-email-header-dashboard",
                                            name: "p",
                                            type: "element",
                                            description: "text-xs text-zinc-500 dark:text-zinc-400",
                                          },
                                        ],
                                      },
                                      {
                                        id: "avatar-container-dashboard",
                                        name: "div",
                                        type: "container",
                                        description: "w-[50px] h-[50px] rounded-full overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center",
                                        children: [
                                          {
                                            id: "person-icon-dashboard",
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
                            id: "stats-card-section-dashboard",
                            name: "StatsCardSection",
                            type: "section",
                            importPath: "@/app/Components/Sections/Dashboard/StatsCardSection",
                            description: "stats=stats",
                            children: [
                              {
                                id: "stats-cards-container",
                                name: "div",
                                type: "container",
                                description: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8",
                                children: [
                                  {
                                    id: "stats-card-mapped",
                                    name: "OverviewCard",
                                    type: "component",
                                    importPath: "@/app/Components/Cards/OverviewCard",
                                    description: "(mapped stats) key=card.id title=card.title value=card.value icon=card.icon trend=card.trend",
                                    children: [
                                      {
                                        id: "overview-card-wrapper",
                                        name: "div",
                                        type: "container",
                                        description: "bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6",
                                        children: [
                                          {
                                            id: "overview-card-header",
                                            name: "div",
                                            type: "container",
                                            description: "flex items-center justify-between mb-4",
                                            children: [
                                              {
                                                id: "overview-card-icon",
                                                name: "IconComponent",
                                                type: "element",
                                                description: "className=w-8 h-8 text-foreground",
                                              },
                                              {
                                                id: "overview-card-trend",
                                                name: "div",
                                                type: "container",
                                                description: "flex items-center gap-1 text-sm (conditional trend)",
                                                children: [
                                                  {
                                                    id: "trend-icon",
                                                    name: "TrendIcon",
                                                    type: "element",
                                                    description: "className=w-4 h-4",
                                                  },
                                                  {
                                                    id: "trend-value",
                                                    name: "span",
                                                    type: "element",
                                                    description: "text-foreground",
                                                  },
                                                ],
                                              },
                                            ],
                                          },
                                          {
                                            id: "overview-card-content",
                                            name: "div",
                                            type: "container",
                                            children: [
                                              {
                                                id: "overview-card-value",
                                                name: "h3",
                                                type: "element",
                                                description: "text-3xl font-bold text-foreground mb-1",
                                              },
                                              {
                                                id: "overview-card-title",
                                                name: "p",
                                                type: "element",
                                                description: "text-sm text-zinc-600 dark:text-zinc-400",
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
                            id: "gender-today-grid-container",
                            name: "div",
                            type: "container",
                            description: "grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8",
                            children: [
                              {
                                id: "gender-comparison-section-dashboard",
                                name: "GenderComparisonSection",
                                type: "section",
                                importPath: "@/app/Components/Sections/Dashboard/GenderComparisonSection",
                                description: "chartData=genderChartData",
                                children: [
                                  {
                                    id: "gender-comparison-container",
                                    name: "div",
                                    type: "container",
                                    description: "bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6",
                                    children: [
                                      {
                                        id: "gender-comparison-header",
                                        name: "div",
                                        type: "container",
                                        description: "mb-4",
                                        children: [
                                          {
                                            id: "gender-comparison-title",
                                            name: "h3",
                                            type: "element",
                                            description: "text-xl font-bold text-foreground mb-2",
                                          },
                                          {
                                            id: "gender-comparison-subtitle",
                                            name: "p",
                                            type: "element",
                                            description: "text-sm text-zinc-600 dark:text-zinc-400",
                                          },
                                        ],
                                      },
                                      {
                                        id: "gender-comparison-chart",
                                        name: "ResponsiveBarChart",
                                        type: "component",
                                        importPath: "@/app/Components/Charts/ResponsiveBarChart",
                                        description: "data=chartData keys=[male, female, other] indexBy=category",
                                        children: [
                                          {
                                            id: "bar-chart-container",
                                            name: "div",
                                            type: "container",
                                            description: "h-[400px]",
                                            children: [
                                              {
                                                id: "bar-chart-svg",
                                                name: "svg",
                                                type: "element",
                                                description: "w-full h-full",
                                                children: [
                                                  {
                                                    id: "bar-chart-bars",
                                                    name: "g",
                                                    type: "element",
                                                    description: "(mapped bars)",
                                                    children: [
                                                      {
                                                        id: "bar-rect",
                                                        name: "rect",
                                                        type: "element",
                                                        description: "x y width height fill",
                                                      },
                                                      {
                                                        id: "bar-label",
                                                        name: "text",
                                                        type: "element",
                                                        description: "x y textAnchor middle",
                                                      },
                                                    ],
                                                  },
                                                  {
                                                    id: "bar-chart-axis-x",
                                                    name: "g",
                                                    type: "element",
                                                    description: "axis bottom",
                                                    children: [
                                                      {
                                                        id: "axis-x-tick",
                                                        name: "line",
                                                        type: "element",
                                                        description: "stroke=currentColor",
                                                      },
                                                      {
                                                        id: "axis-x-label",
                                                        name: "text",
                                                        type: "element",
                                                        description: "textAnchor=middle",
                                                      },
                                                    ],
                                                  },
                                                  {
                                                    id: "bar-chart-axis-y",
                                                    name: "g",
                                                    type: "element",
                                                    description: "axis left",
                                                    children: [
                                                      {
                                                        id: "axis-y-tick",
                                                        name: "line",
                                                        type: "element",
                                                        description: "stroke=currentColor",
                                                      },
                                                      {
                                                        id: "axis-y-label",
                                                        name: "text",
                                                        type: "element",
                                                        description: "textAnchor=end",
                                                      },
                                                    ],
                                                  },
                                                  {
                                                    id: "bar-chart-legend",
                                                    name: "g",
                                                    type: "element",
                                                    description: "legend",
                                                    children: [
                                                      {
                                                        id: "legend-item",
                                                        name: "g",
                                                        type: "element",
                                                        description: "(mapped legend items)",
                                                        children: [
                                                          {
                                                            id: "legend-color",
                                                            name: "rect",
                                                            type: "element",
                                                            description: "fill",
                                                          },
                                                          {
                                                            id: "legend-label",
                                                            name: "text",
                                                            type: "element",
                                                            description: "textAnchor=start",
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
                                id: "today-attendance-section-dashboard",
                                name: "TodayAttendanceSection",
                                type: "section",
                                importPath: "@/app/Components/Sections/Dashboard/TodayAttendanceSection",
                                description: "chartData=todayChartData totalStudents=totalStudents presentCount=presentCount absentCount=absentCount recordedCount=recordedCount",
                                children: [
                                  {
                                    id: "today-attendance-container",
                                    name: "div",
                                    type: "container",
                                    description: "bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6",
                                    children: [
                                      {
                                        id: "today-attendance-header",
                                        name: "div",
                                        type: "container",
                                        description: "mb-4",
                                        children: [
                                          {
                                            id: "today-attendance-title",
                                            name: "h3",
                                            type: "element",
                                            description: "text-xl font-bold text-foreground mb-2",
                                          },
                                          {
                                            id: "today-attendance-stats",
                                            name: "div",
                                            type: "container",
                                            description: "flex flex-wrap gap-4 text-sm",
                                            children: [
                                              {
                                                id: "total-students-stat",
                                                name: "div",
                                                type: "container",
                                                description: "flex items-center gap-2",
                                                children: [
                                                  {
                                                    id: "total-students-label",
                                                    name: "span",
                                                    type: "element",
                                                    description: "text-zinc-600 dark:text-zinc-400",
                                                  },
                                                  {
                                                    id: "total-students-value",
                                                    name: "span",
                                                    type: "element",
                                                    description: "font-semibold text-foreground",
                                                  },
                                                ],
                                              },
                                              {
                                                id: "present-stat",
                                                name: "div",
                                                type: "container",
                                                description: "flex items-center gap-2",
                                                children: [
                                                  {
                                                    id: "present-label",
                                                    name: "span",
                                                    type: "element",
                                                    description: "text-zinc-600 dark:text-zinc-400",
                                                  },
                                                  {
                                                    id: "present-value",
                                                    name: "span",
                                                    type: "element",
                                                    description: "font-semibold text-green-600 dark:text-green-400",
                                                  },
                                                ],
                                              },
                                              {
                                                id: "absent-stat",
                                                name: "div",
                                                type: "container",
                                                description: "flex items-center gap-2",
                                                children: [
                                                  {
                                                    id: "absent-label",
                                                    name: "span",
                                                    type: "element",
                                                    description: "text-zinc-600 dark:text-zinc-400",
                                                  },
                                                  {
                                                    id: "absent-value",
                                                    name: "span",
                                                    type: "element",
                                                    description: "font-semibold text-red-600 dark:text-red-400",
                                                  },
                                                ],
                                              },
                                              {
                                                id: "recorded-stat",
                                                name: "div",
                                                type: "container",
                                                description: "flex items-center gap-2",
                                                children: [
                                                  {
                                                    id: "recorded-label",
                                                    name: "span",
                                                    type: "element",
                                                    description: "text-zinc-600 dark:text-zinc-400",
                                                  },
                                                  {
                                                    id: "recorded-value",
                                                    name: "span",
                                                    type: "element",
                                                    description: "font-semibold text-foreground",
                                                  },
                                                ],
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                      {
                                        id: "today-attendance-chart",
                                        name: "ResponsivePieChart",
                                        type: "component",
                                        importPath: "@/app/Components/Charts/ResponsivePieChart",
                                        description: "data=chartData",
                                        children: [
                                          {
                                            id: "pie-chart-container",
                                            name: "div",
                                            type: "container",
                                            description: "h-[400px]",
                                            children: [
                                              {
                                                id: "pie-chart-svg",
                                                name: "svg",
                                                type: "element",
                                                description: "w-full h-full",
                                                children: [
                                                  {
                                                    id: "pie-chart-arcs",
                                                    name: "g",
                                                    type: "element",
                                                    description: "(mapped arcs)",
                                                    children: [
                                                      {
                                                        id: "arc-path",
                                                        name: "path",
                                                        type: "element",
                                                        description: "d fill",
                                                      },
                                                      {
                                                        id: "arc-label",
                                                        name: "text",
                                                        type: "element",
                                                        description: "x y textAnchor=middle",
                                                      },
                                                    ],
                                                  },
                                                  {
                                                    id: "pie-chart-legend",
                                                    name: "g",
                                                    type: "element",
                                                    description: "legend",
                                                    children: [
                                                      {
                                                        id: "pie-legend-item",
                                                        name: "g",
                                                        type: "element",
                                                        description: "(mapped legend items)",
                                                        children: [
                                                          {
                                                            id: "pie-legend-color",
                                                            name: "rect",
                                                            type: "element",
                                                            description: "fill",
                                                          },
                                                          {
                                                            id: "pie-legend-label",
                                                            name: "text",
                                                            type: "element",
                                                            description: "textAnchor=start",
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
                            id: "attendance-chart-section-dashboard",
                            name: "AttendanceChartSection",
                            type: "section",
                            importPath: "@/app/Components/Sections/Dashboard/AttendanceChartSection",
                            description: "chartData=chartData",
                            children: [
                              {
                                id: "attendance-chart-container",
                                name: "div",
                                type: "container",
                                description: "bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6 mb-8",
                                children: [
                                  {
                                    id: "attendance-chart-header",
                                    name: "div",
                                    type: "container",
                                    description: "mb-4",
                                    children: [
                                      {
                                        id: "attendance-chart-title",
                                        name: "h3",
                                        type: "element",
                                        description: "text-xl font-bold text-foreground mb-2",
                                      },
                                      {
                                        id: "attendance-chart-subtitle",
                                        name: "p",
                                        type: "element",
                                        description: "text-sm text-zinc-600 dark:text-zinc-400",
                                      },
                                    ],
                                  },
                                  {
                                    id: "attendance-chart",
                                    name: "ResponsiveBarChart",
                                    type: "component",
                                    importPath: "@/app/Components/Charts/ResponsiveBarChart",
                                    description: "data=chartData keys=[present, absent] indexBy=month",
                                    children: [
                                      {
                                        id: "attendance-bar-chart-container",
                                        name: "div",
                                        type: "container",
                                        description: "h-[400px]",
                                        children: [
                                          {
                                            id: "attendance-bar-chart-svg",
                                            name: "svg",
                                            type: "element",
                                            description: "w-full h-full",
                                            children: [
                                              {
                                                id: "attendance-bar-chart-bars",
                                                name: "g",
                                                type: "element",
                                                description: "(mapped bars)",
                                                children: [
                                                  {
                                                    id: "attendance-bar-rect",
                                                    name: "rect",
                                                    type: "element",
                                                    description: "x y width height fill",
                                                  },
                                                  {
                                                    id: "attendance-bar-label",
                                                    name: "text",
                                                    type: "element",
                                                    description: "x y textAnchor=middle",
                                                  },
                                                ],
                                              },
                                              {
                                                id: "attendance-bar-chart-axis-x",
                                                name: "g",
                                                type: "element",
                                                description: "axis bottom",
                                                children: [
                                                  {
                                                    id: "attendance-axis-x-tick",
                                                    name: "line",
                                                    type: "element",
                                                    description: "stroke=currentColor",
                                                  },
                                                  {
                                                    id: "attendance-axis-x-label",
                                                    name: "text",
                                                    type: "element",
                                                    description: "textAnchor=middle",
                                                  },
                                                ],
                                              },
                                              {
                                                id: "attendance-bar-chart-axis-y",
                                                name: "g",
                                                type: "element",
                                                description: "axis left",
                                                children: [
                                                  {
                                                    id: "attendance-axis-y-tick",
                                                    name: "line",
                                                    type: "element",
                                                    description: "stroke=currentColor",
                                                  },
                                                  {
                                                    id: "attendance-axis-y-label",
                                                    name: "text",
                                                    type: "element",
                                                    description: "textAnchor=end",
                                                  },
                                                ],
                                              },
                                              {
                                                id: "attendance-bar-chart-legend",
                                                name: "g",
                                                type: "element",
                                                description: "legend",
                                                children: [
                                                  {
                                                    id: "attendance-legend-item",
                                                    name: "g",
                                                    type: "element",
                                                    description: "(mapped legend items)",
                                                    children: [
                                                      {
                                                        id: "attendance-legend-color",
                                                        name: "rect",
                                                        type: "element",
                                                        description: "fill",
                                                      },
                                                      {
                                                        id: "attendance-legend-label",
                                                        name: "text",
                                                        type: "element",
                                                        description: "textAnchor=start",
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
                            id: "recent-activity-section-dashboard",
                            name: "RecentActivitySection",
                            type: "section",
                            importPath: "@/app/Components/Sections/Dashboard/RecentActivitySection",
                            description: "activities=stats?.recentActivity",
                            children: [
                              {
                                id: "recent-activity-container",
                                name: "div",
                                type: "container",
                                description: "bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6",
                                children: [
                                  {
                                    id: "recent-activity-header",
                                    name: "div",
                                    type: "container",
                                    description: "mb-4",
                                    children: [
                                      {
                                        id: "recent-activity-title",
                                        name: "h3",
                                        type: "element",
                                        description: "text-xl font-bold text-foreground mb-2",
                                      },
                                      {
                                        id: "recent-activity-subtitle",
                                        name: "p",
                                        type: "element",
                                        description: "text-sm text-zinc-600 dark:text-zinc-400",
                                      },
                                    ],
                                  },
                                  {
                                    id: "recent-activity-list",
                                    name: "div",
                                    type: "container",
                                    description: "space-y-4",
                                    children: [
                                      {
                                        id: "activity-item-mapped",
                                        name: "div",
                                        type: "container",
                                        description: "(mapped activities) key=activity.id flex items-start gap-4 p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors",
                                        children: [
                                          {
                                            id: "activity-icon",
                                            name: "div",
                                            type: "container",
                                            description: "flex-shrink-0 w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center",
                                            children: [
                                              {
                                                id: "activity-icon-svg",
                                                name: "IconComponent",
                                                type: "element",
                                                description: "className=w-5 h-5 text-foreground",
                                              },
                                            ],
                                          },
                                          {
                                            id: "activity-content",
                                            name: "div",
                                            type: "container",
                                            description: "flex-1 min-w-0",
                                            children: [
                                              {
                                                id: "activity-description",
                                                name: "p",
                                                type: "element",
                                                description: "text-sm text-foreground mb-1",
                                              },
                                              {
                                                id: "activity-time",
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
