import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {

	if (req.method !== 'POST') {
		return res.status(405).json({ error: 'Method not allowed' });
	}

	const { project, tool } = req.body;
	//TODO: check for supported project and tools
	if (!project || !tool) {
		return res.status(400).json({ error: 'Missing project or tool' });
	}

	const prompt = `
	You're a config generator API. Based on the provided tool and project type, respond with a valid configuration file.

	Respond ONLY with a valid JSON object:

	{
		"filename": "<string>",
		"content": "<escaped string>"
	}

	IMPORTANT:
	- 'content' must always be a string — even if it's JavaScript code.
	- Escape newlines, double quotes, and backslashes properly.
	- Don't include markdown formatting or explanation.
	- Add common optional settings as comments.
	
	Return ONLY valid file content. No explanation or markdown.

	Tool: ${tool}
	Project: ${project}
	`;

	const llmRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
		},
		body: JSON.stringify({
			model: 'llama3-8b-8192',
			temperature: 0,
			messages: [
				{
					role: 'system',
					content: 'You are a dev assistant that generates config files.',
				},
				{
					role: 'user',
					content: prompt,
				},
			],
		}),
	});

	const data = await llmRes.json();
	const config = data.choices?.[0]?.message?.content;
	let parsedConfig;
	try {
		parsedConfig = JSON.parse(config);
	} catch (e) { };

	if (!config || !parsedConfig) {
		return res.status(500).json({ error: 'LLM response invalid' });
	}

	const filename = parsedConfig.filename;
	const content = parsedConfig.content;

	return res.status(200).json({ filename, content });
}
