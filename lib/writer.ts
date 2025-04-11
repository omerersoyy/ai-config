import fs from "fs";
import path from "path";
import { InfoType, Tool } from "../types";
import { log } from "./logger";

const fileNames: Partial<Record<Tool, string>> = {
	jest: "jest.config.js",
	eslint: ".eslintrc.js",
	prettier: ".prettierrc",
	vitest: "vitest.config.ts",
};

export function writeConfig(tool: Tool, content: string): void {
	const fileName = fileNames[tool];

	if (!fileName) {
		throw new Error();
	}

	const fullPath = path.join(process.cwd(), fileName);
	fs.writeFileSync(fullPath, content);

	//TODO: multiple config file generation case
	log.success(`${InfoType.DONE}`);
	log.success(`Generated ${fileName}`);
}
