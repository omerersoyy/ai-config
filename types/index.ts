export type ProjectType = 'react' | 'react-native' | 'node' | 'next';
export type Tool = 'jest' | 'eslint' | 'prettier' | 'vitest';

export interface PromptInput {
  project: ProjectType;
  tool: Tool;
}
