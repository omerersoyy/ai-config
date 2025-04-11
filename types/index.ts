export type ProjectType =
	| "react"
	| "react-native"
	| "node"
	| "next"
	| "vue"
	| "angular"
	| "express"
	| "svelte";

export type Tool =
	| "jest"
	| "eslint"
	| "prettier"
	| "typescript"
	| "babel"
	| "webpack"
	| "storybook"
	| "husky"
	| "commitlint"
	| "lint-staged"
	| "react-router"
	| "redux"
	| "apollo-client"
	| "cypress"
	| "vue-router"
	| "svelte"
	| "gatsby"
	| "nestjs"
	| "rollup"
	| "parcel"
	| "postcss"
	| "sass"
	| "vitest";

export type ToolResponses = Partial<Record<Tool, string>>;

export interface PromptInput {
	project: ProjectType;
	tool: Tool;
}

export enum ErrorType {
	INVALID_USAGE = "Invalid Usage Error",
	UNSUPPORTED_COMBINATION = "Unsupported Combination Error",
	SOMETHING_WENT_WRONG = "Something Went Wrong",
}

export enum InfoType {
	IN_PROGRESS = "Configuration In Progress",
	DONE = "Configuration Done",
}
