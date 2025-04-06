#!/usr/bin/env node

const [, , ...args] = process.argv;

if (args.length !== 2) {
  console.error("❌ Usage: npx ai-config <project-type> <tool>");
  process.exit(1);
}

const [projectType, tool] = args;

const supportedProjects = ["react", "react-native", "node", "next"];
const supportedTools = ["jest", "eslint", "prettier", "vitest"];

if (!supportedProjects.includes(projectType)) {
  console.error(`❌ Unsopperted project type: ${projectType}`);
  process.exit(1);
}

if (!supportedTools.includes(tool)) {
  console.error(`❌ Unsopperted tool: ${tool}`);
  process.exit(1);
}

console.log(`🚀 ${projectType} ${tool} config in progress ...`);
