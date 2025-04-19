import fs from "fs";
import path from "path";
import { InfoType, Tool } from "../types/index.js";
import { log } from "./logger.js";

export function writeConfig(filename: string, content: string): void {
	
	if (!filename) {
		throw new Error();
	}

	const fullPath = path.join(process.cwd(), filename);
	fs.writeFileSync(fullPath, content.toString());

	//TODO: multiple config file generation case
	log.success(`${InfoType.DONE}`);
	log.success(`Generated ${filename}`);
}
