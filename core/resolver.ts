import type { ProjectType, Tool } from "../types";
import { log } from "../lib/logger";
import { isSupportedProject, isSupportedTool } from "./supported";

type ResolverInput = {
  project: ProjectType;
  tool: Tool;
};

export async function resolveConfig({ project, tool }: ResolverInput) {
  if (!isSupportedProject(project)) {
    log.error(`❌ Not supported: ${project}`);
    process.exit(1);
  }

  if (!isSupportedTool(tool)) {
    log.error(`❌ Not supported: ${tool}`);
    process.exit(1);
  }

  log.info(`🧠 Configuring ${tool}, for your ${project} project`);

  await new Promise((res) => setTimeout(res, 1000)); 

  log.success(`🧠 Configured ${tool}, for your ${project} project`);
}
