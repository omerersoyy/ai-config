import {
	isSupported,
	isSupportedProject,
	isSupportedTool,
} from "../core/supported";
import { log } from "../lib/logger";
import {
	InfoType,
	type ProjectType,
	type Tool,
	type ToolResponses,
} from "../types";

export async function resolveConfig(project: ProjectType, tool: Tool) {
	if (!isSupportedProject(project)) {
		throw new Error(`❌ Unsupported project type: "${project}"`);
	}

	if (!isSupportedTool(tool)) {
		throw new Error(`❌ Unsupported tool: "${tool}"`);
	}

	if (!isSupported(project, tool)) {
		throw new Error(
			`❌ The tool "${tool}" is not supported for project type "${project}"`
		);
	}

	log.info(
		`${InfoType.IN_PROGRESS}: Fetching recommended config for ${project} + ${tool}...`
	);

	const result = fakeLLMResponses[project as ProjectType]!![tool as Tool];

	return {
		filename: getFilename(tool as Tool),
		content: result,
	};
}

function getFilename(tool: Tool): string {
	switch (tool) {
		case "jest":
			return "jest.config.js";
		case "eslint":
			return ".eslintrc.js";
		case "prettier":
			return ".prettierrc";
		default:
			return "config.generated.js";
	}
}

export async function getConfigFromLLM(
	project: ProjectType,
	tool: Tool
): Promise<string | null> {
	if (!isSupported(project, tool)) {
		return null;
	}

	const config = fakeLLMResponses[project]?.[tool];
	return config || null;
}

const fakeLLMResponses: Partial<Record<ProjectType, ToolResponses>> = {
	react: {
		jest: `// jest.config.js
module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\\\.tsx?$": "babel-jest"
  }
};`,
		eslint: `// .eslintrc.js
module.exports = {
  extends: ["react-app", "eslint:recommended"]
};`,
		prettier: `// .prettierrc
{
  "semi": true,
  "singleQuote": true
}`,
		vitest: "",
	},
	"react-native": {
		jest: `// jest.config.js
module.exports = {
  preset: "react-native",
  transformIgnorePatterns: ["node_modules/(?!react-native)"]
};`,
	},
	node: {
		eslint: `// .eslintrc.js
module.exports = {
  env: { node: true },
  extends: ["eslint:recommended"]
};`,
		prettier: `// .prettierrc
{
  "tabWidth": 2
}`,
		jest: "",
		vitest: "",
	},
	next: {
		jest: `// jest.config.js
module.exports = {
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1"
  }
};`,
		eslint: `// .eslintrc.js
module.exports = {
  extends: ["next/core-web-vitals"]
};`,
		prettier: `// .prettierrc
{
  "printWidth": 80
}`,
		vitest: "",
	},
};
