#!/usr/bin/env ts-node

import { isSupported } from "../core/supported";
import { log } from "../lib/logger";
import type { ProjectType, Tool } from "../types";
import { resolveConfig } from "../core/resolver"; 

const args = process.argv.slice(2);

if (args.length !== 2) {
  log.error("Usage: npx ai-config <project> <tool>");
  process.exit(1);
}

const [projectArg, toolArg] = args;
const project = projectArg as ProjectType;
const tool = toolArg as Tool;

resolveConfig({ project, tool })
  .then(() => {
    log.success("Completed!");
  })
  .catch((err: { message: any; }) => {
    log.error(`Error: ${err.message}`);
    process.exit(1);
  });
