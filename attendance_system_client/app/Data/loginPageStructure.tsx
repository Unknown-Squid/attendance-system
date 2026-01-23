import { ComponentInfo } from "./types";

export const loginPageStructure: ComponentInfo = {
    id: "login-page",
    name: "LoginPage",
    type: "page",
    children: [
      {
        id: "login-container-1",
        name: "div",
        type: "container",
        description: "flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black px-4",
        children: [
          {
            id: "login-container-2",
            name: "div",
            type: "container",
            description: "w-full max-w-md",
            children: [
              {
                id: "login-container-3",
                name: "div",
                type: "container",
                description: "bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-8 border",
                children: [
                  {
                    id: "login-header",
                    name: "LoginHeader",
                    type: "section",
                    importPath: "@/app/Components/Sections/Login/LoginHeaderSection",
                    children: [
                      {
                        id: "login-header-container",
                        name: "div",
                        type: "container",
                        description: "flex flex-col items-center mb-8",
                        children: [
                          {
                            id: "logo-container",
                            name: "div",
                            type: "container",
                            description: "mb-4",
                            children: [
                              {
                                id: "logo-icon",
                                name: "LogoIcon",
                                type: "component",
                                importPath: "@/app/Components/Icons/LogoIcon",
                                description: "className=w-16 h-16 text-foreground",
                              },
                            ],
                          },
                          {
                            id: "title",
                            name: "h1",
                            type: "element",
                            description: "text-2xl font-bold text-center text-foreground mb-2",
                          },
                          {
                            id: "subtitle",
                            name: "p",
                            type: "element",
                            description: "text-sm text-center text-zinc-600 dark:text-zinc-400",
                          },
                        ],
                      },
                    ],
                  },
                  {
                    id: "login-form",
                    name: "LoginForm",
                    type: "section",
                    importPath: "@/app/Components/Sections/Login/LoginFormSection",
                    children: [
                      {
                        id: "form-element",
                        name: "form",
                        type: "element",
                        description: "onSubmit=handleSubmit space-y-6",
                        children: [
                          {
                            id: "email-input",
                            name: "Input",
                            type: "component",
                            importPath: "@/app/Components/Fields/Input",
                            description: "type=email name=email label=Email placeholder=Enter your email value=formData.email onChange=handleChange error=errors.email required",
                            children: [
                              {
                                id: "input-wrapper",
                                name: "div",
                                type: "container",
                                description: "w-full",
                                children: [
                                  {
                                    id: "input-label",
                                    name: "label",
                                    type: "element",
                                    description: "block text-sm font-medium mb-2 text-foreground (conditional)",
                                    children: [
                                      {
                                        id: "label-text",
                                        name: "span",
                                        type: "element",
                                        description: "Email",
                                      },
                                    ],
                                  },
                                  {
                                    id: "input-field",
                                    name: "input",
                                    type: "element",
                                    description: "type=email name=email className=w-full px-4 py-3 rounded-lg border",
                                  },
                                  {
                                    id: "error-message",
                                    name: "p",
                                    type: "element",
                                    description: "mt-1 text-sm text-red-500 (conditional)",
                                  },
                                ],
                              },
                            ],
                          },
                          {
                            id: "password-input",
                            name: "Input",
                            type: "component",
                            importPath: "@/app/Components/Fields/Input",
                            description: "type=password name=password label=Password placeholder=Enter your password value=formData.password onChange=handleChange error=errors.password required",
                            children: [
                              {
                                id: "input-wrapper-2",
                                name: "div",
                                type: "container",
                                description: "w-full",
                                children: [
                                  {
                                    id: "input-label-2",
                                    name: "label",
                                    type: "element",
                                    description: "block text-sm font-medium mb-2 text-foreground (conditional)",
                                  },
                                  {
                                    id: "input-field-2",
                                    name: "input",
                                    type: "element",
                                    description: "type=password name=password className=w-full px-4 py-3 rounded-lg border",
                                  },
                                  {
                                    id: "error-message-2",
                                    name: "p",
                                    type: "element",
                                    description: "mt-1 text-sm text-red-500 (conditional)",
                                  },
                                ],
                              },
                            ],
                          },
                          {
                            id: "form-options",
                            name: "div",
                            type: "container",
                            description: "flex items-center justify-between text-sm",
                            children: [
                              {
                                id: "remember-me",
                                name: "label",
                                type: "element",
                                description: "flex items-center gap-2 cursor-pointer",
                                children: [
                                  {
                                    id: "checkbox",
                                    name: "input",
                                    type: "element",
                                    description: "type=checkbox className=w-4 h-4 rounded border-zinc-300",
                                  },
                                  {
                                    id: "remember-label",
                                    name: "span",
                                    type: "element",
                                    description: "text-zinc-600 dark:text-zinc-400",
                                  },
                                ],
                              },
                              {
                                id: "forgot-password",
                                name: "a",
                                type: "element",
                                description: "href=# className=text-foreground hover:underline font-medium",
                              },
                            ],
                          },
                          {
                            id: "api-error-message",
                            name: "div",
                            type: "container",
                            description: "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 text-sm text-red-600 (conditional)",
                          },
                          {
                            id: "submit-button",
                            name: "Button",
                            type: "component",
                            importPath: "@/app/Components/Fields/Buttons",
                            description: "type=submit variant=primary isLoading=isLoading className=w-full disabled=isLoading || authLoading",
                            children: [
                              {
                                id: "button-content",
                                name: "button",
                                type: "element",
                                description: "type=submit className=px-6 py-3 rounded-lg font-medium",
                                children: [
                                  {
                                    id: "loading-spinner",
                                    name: "span",
                                    type: "element",
                                    description: "flex items-center justify-center gap-2 (conditional)",
                                    children: [
                                      {
                                        id: "spinner-svg",
                                        name: "svg",
                                        type: "element",
                                        description: "animate-spin h-5 w-5",
                                        children: [
                                          {
                                            id: "spinner-circle",
                                            name: "circle",
                                            type: "element",
                                            description: "opacity-25 cx=12 cy=12 r=10 stroke=currentColor strokeWidth=4",
                                          },
                                          {
                                            id: "spinner-path",
                                            name: "path",
                                            type: "element",
                                            description: "opacity-75 fill=currentColor",
                                          },
                                        ],
                                      },
                                      {
                                        id: "loading-text",
                                        name: "span",
                                        type: "element",
                                        description: "Loading...",
                                      },
                                    ],
                                  },
                                  {
                                    id: "button-text",
                                    name: "span",
                                    type: "element",
                                    description: "Sign In",
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
                    id: "login-footer",
                    name: "LoginFooter",
                    type: "section",
                    importPath: "@/app/Components/Sections/Login/LoginFooterSection",
                    children: [
                      {
                        id: "footer-container",
                        name: "div",
                        type: "container",
                        description: "mt-6 text-center text-sm text-zinc-600 dark:text-zinc-400",
                        children: [
                          {
                            id: "footer-text",
                            name: "p",
                            type: "element",
                            children: [
                              {
                                id: "footer-text-1",
                                name: "span",
                                type: "element",
                                description: "Don't have an account?",
                              },
                              {
                                id: "footer-link",
                                name: "a",
                                type: "element",
                                description: "href=# className=text-foreground hover:underline font-medium",
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