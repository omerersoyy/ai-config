import { ProjectType, Tool } from "../types/index.js";
import { log } from "../lib/logger.js";
import { writeConfig } from "../lib/writer.js";
import 'dotenv/config'

const API_URL = "https://ai-config.vercel.app/api/config";

export async function resolveConfig(project: ProjectType, tool: Tool) {
	try {
		const res = await fetch(API_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ project, tool }),
		});
		
		if (!res.ok) {
			throw new Error(`API call failed with status ${res.status}`);
		}

		const data = await res.json();
		if (!data) {
			throw new Error("Empty config returned from API");
		}
		
		try {
			writeConfig(data.filename, data.content);
		} catch (e) {
			throw new Error("LLM response could not be parsed.");
		}
	} catch (err: any) {
		log.error(`Failed to resolve config: ${err.message}`);
		throw err;
	}
}
