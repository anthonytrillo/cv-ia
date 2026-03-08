import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const SYSTEM_PROMPT = `You are a professional CV writer specialized in improving short professional summaries for resumes.

Always respond in Argentine Spanish (español de Argentina / rioplatense). Use a medium-formal tone: professional but approachable, avoiding excessive formality or overly corporate language.`;

export async function improveSummaryHandler(
  params: {
    jobTitle: string;
    currentSummary: string;
    experience: string;
    skills: string;
  },
  opts: { timeout: number; maxTokens: number }
): Promise<string> {
  const userPrompt = `Improve the following professional summary.
Make it clear, concise, and impactful.

Requirements:
- Maximum 3 sentences
- Write in Argentine Spanish with a medium-formal tone
- Focus on achievements and strengths
- Keep it readable for recruiters
- Do not invent experience that does not exist

Context:

Professional Title:
${params.jobTitle}

Current Summary:
${params.currentSummary}

${params.experience ? `Experience:\n${params.experience}` : ''}
${params.skills ? `Skills:\n${params.skills}` : ''}

Return only the improved summary text.`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), opts.timeout);

  try {
    const completion = await groq.chat.completions.create(
      {
        model: 'llama-3.1-8b-instant',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userPrompt },
        ],
        max_tokens: opts.maxTokens,
        temperature: 0.4,
      },
      { signal: controller.signal }
    );

    clearTimeout(timeoutId);
    const text = completion.choices?.[0]?.message?.content?.trim() ?? '';

    if (!text) {
      const err = new Error('La IA no devolvió texto');
      (err as Error & { status: number }).status = 502;
      throw err;
    }

    return text;
  } catch (e) {
    clearTimeout(timeoutId);
    if ((e as Error).name === 'AbortError') {
      const err = new Error('Tiempo de espera agotado');
      (err as Error & { status: number }).status = 504;
      throw err;
    }
    throw e;
  }
}
