import type { ProjectType, Tool } from "../types";

export const supportedCombos: Record<ProjectType, Tool[]> = {
	react: [
		"jest",
		"eslint",
		"prettier",
		"typescript",
		"babel",
		"webpack",
		"storybook",
		"husky",
		"commitlint",
		"lint-staged",
		"react-router",
		"redux",
		"apollo-client",
	],
	node: [
		"eslint",
		"prettier",
		"typescript",
		"babel",
		"webpack",
		"husky",
		"commitlint",
		"lint-staged",
		"cypress",
	],
	next: [
		"jest",
		"eslint",
		"prettier",
		"typescript",
		"babel",
		"webpack",
		"husky",
		"commitlint",
		"lint-staged",
		"cypress",
		"react-router",
	],
	"react-native": [
		"jest",
		"eslint",
		"prettier",
		"typescript",
		"babel",
		"webpack",
		"husky",
		"commitlint",
		"lint-staged",
		"react-router",
	],
	vue: [
		"jest",
		"eslint",
		"prettier",
		"typescript",
		"babel",
		"webpack",
		"husky",
		"commitlint",
		"lint-staged",
		"vue-router",
	],
	angular: [
		"jest",
		"eslint",
		"prettier",
		"typescript",
		"webpack",
		"husky",
		"commitlint",
		"lint-staged",
	],
	express: [
		"eslint",
		"prettier",
		"typescript",
		"babel",
		"webpack",
		"husky",
		"commitlint",
		"lint-staged",
		"cypress",
	],
	svelte: [
		"eslint",
		"prettier",
		"typescript",
		"babel",
		"webpack",
		"husky",
		"commitlint",
		"lint-staged",
	],
	gatsby: [
		"jest",
		"eslint",
		"prettier",
		"typescript",
		"babel",
		"webpack",
		"husky",
		"commitlint",
		"lint-staged",
	],
	nestjs: [
		"eslint",
		"prettier",
		"typescript",
		"babel",
		"webpack",
		"husky",
		"commitlint",
		"lint-staged",
	],
};

export function isSupported(project: ProjectType, tool: Tool): boolean {
	return supportedCombos[project]?.includes(tool) ?? false;
}

export function isSupportedProject(project: string): project is ProjectType {
	return Object.keys(supportedCombos).includes(project);
}

export function isSupportedTool(tool: string): tool is Tool {
	return Object.values(supportedCombos).some((tools) =>
		tools.includes(tool as Tool)
	);
}
