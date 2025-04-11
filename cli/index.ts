#!/usr/bin/env ts-node

import { isSupported } from "../core/supported";
import { log } from "../lib/logger";
import { ErrorType, InfoType, type ProjectType, type Tool } from "../types";
import { resolveConfig } from "../core/resolver";
import { writeConfig } from "../lib/writer";

const args = process.argv.slice(2);

if (args.length !== 2) {
	log.error(`${ErrorType.INVALID_USAGE}: 
    expected 'npx ai-config <project> <tool>'
    received 'npx ai-config' ${args.join(",")}  
  `);
	process.exit(1);
}

const [projectArg, toolArg] = args;
const project = projectArg as ProjectType;
const tool = toolArg as Tool;

if (!isSupported(project, tool)) {
	log.error(`${ErrorType.UNSUPPORTED_COMBINATION}: ${project} + ${tool}`);
	process.exit(1);
}

log.info(`${InfoType.IN_PROGRESS}: configuring ${tool} for ${project} `);

resolveConfig(project, tool)
	.then((r) => {
		writeConfig(tool as Tool, r.content as string);
	})
	.catch((err) => {
		log.error(`Hata: ${err.message}`);
		process.exit(1);
	});
