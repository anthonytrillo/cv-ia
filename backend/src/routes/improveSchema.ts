const MAX_LEN = {
  jobTitle: 150,
  currentSummary: 600,
  experience: 2000,
  skills: 500,
};

const HTML_SCRIPT_REGEX = /<[^>]*>|<\s*script|javascript:|on\w+\s*=/gi;

function stripHtmlScript(str: string): string {
  return String(str ?? '')
    .replace(HTML_SCRIPT_REGEX, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function sanitizeImproveBody(body: unknown) {
  const o =
    body && typeof body === 'object' ? (body as Record<string, unknown>) : {};
  return {
    jobTitle: stripHtmlScript(String(o.jobTitle ?? '').slice(0, MAX_LEN.jobTitle)),
    currentSummary: stripHtmlScript(
      String(o.currentSummary ?? '').slice(0, MAX_LEN.currentSummary)
    ),
    experience: stripHtmlScript(
      String(o.experience ?? '').slice(0, MAX_LEN.experience)
    ),
    skills: stripHtmlScript(String(o.skills ?? '').slice(0, MAX_LEN.skills)),
  };
}

export function validateImproveBody(
  raw: ReturnType<typeof sanitizeImproveBody>
) {
  if (raw.currentSummary.length < 20) {
    const err = new Error('El resumen debe tener al menos 20 caracteres');
    (err as Error & { status: number }).status = 400;
    throw err;
  }
  return raw;
}
