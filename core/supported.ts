import type { ProjectType, Tool } from "../types";

export const supportedCombos: Record<ProjectType, Tool[]> = {
  react: ["jest", "eslint", "prettier"],
  "react-native": ["jest"],
  node: ["eslint", "prettier"],
  next: ["jest", "eslint", "prettier"],
};

export function isSupported(project: ProjectType, tool: Tool): boolean {
  return supportedCombos[project]?.includes(tool) ?? false;
}

export function isSupportedProject(project: string): project is ProjectType {
  return Object.keys(supportedCombos).includes(project);
}

export function isSupportedTool(tool: string): tool is Tool {
  return Object.values(supportedCombos).some((tools) => tools.includes(tool as Tool));
}
