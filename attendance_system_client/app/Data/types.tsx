// Type definitions for page structures

export interface ComponentInfo {
  id: string;
  name: string;
  type: "page" | "container" | "component" | "section" | "element";
  description?: string;
  importPath?: string;
  children?: ComponentInfo[];
}
