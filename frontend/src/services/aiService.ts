const API_BASE = import.meta.env.VITE_API_URL ?? '';

export interface ImproveSummaryRequest {
  jobTitle: string;
  currentSummary: string;
  experience: string;
  skills: string;
}

export interface ImproveSummaryResponse {
  improvedSummary: string;
}

export async function improveSummary(
  params: ImproveSummaryRequest
): Promise<string> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000);

  try {
    const res = await fetch(`${API_BASE}/api/ai/improve-summary`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(
        (err as { message?: string }).message ?? `Error ${res.status}`
      );
    }

    const data: ImproveSummaryResponse = await res.json();
    return data.improvedSummary ?? '';
  } catch (e) {
    clearTimeout(timeoutId);
    throw e;
  }
}
