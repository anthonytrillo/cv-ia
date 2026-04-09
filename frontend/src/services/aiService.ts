const API_BASE = import.meta.env.VITE_API_URL ?? '';

/** Cold start / gateway issues common on serverless; retry before surfacing an error */
const REQUEST_TIMEOUT_MS = 30_000;
const MAX_ATTEMPTS = 3;
const RETRY_DELAY_MS = [600, 1600] as const;

const RETRYABLE_STATUS = new Set([
  408, 429, 502, 503, 504, 520, 521, 522, 524,
]);

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function shouldRetryStatus(status: number): boolean {
  return RETRYABLE_STATUS.has(status);
}

function shouldRetryFetchError(e: unknown): boolean {
  if (e instanceof TypeError) return true;
  return (
    e instanceof DOMException &&
    (e.name === 'AbortError' || e.name === 'NetworkError')
  );
}

async function postJsonWithRetry<T>(
  path: string,
  body: object
): Promise<T> {
  let lastError: unknown = undefined;

  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const res = await fetch(`${API_BASE}${path}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        const shouldRetry =
          shouldRetryStatus(res.status) && attempt < MAX_ATTEMPTS - 1;
        if (shouldRetry) {
          await sleep(RETRY_DELAY_MS[attempt] ?? RETRY_DELAY_MS[RETRY_DELAY_MS.length - 1]);
          continue;
        }
        const err = await res.json().catch(() => ({}));
        throw new Error(
          (err as { message?: string }).message ?? `Error ${res.status}`
        );
      }

      return (await res.json()) as T;
    } catch (e) {
      clearTimeout(timeoutId);
      lastError = e;
      const canRetry =
        shouldRetryFetchError(e) && attempt < MAX_ATTEMPTS - 1;
      if (canRetry) {
        await sleep(RETRY_DELAY_MS[attempt] ?? RETRY_DELAY_MS[RETRY_DELAY_MS.length - 1]);
        continue;
      }
      throw e;
    }
  }

  throw lastError ?? new Error('Solicitud fallida');
}

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
  const data = await postJsonWithRetry<ImproveSummaryResponse>(
    '/api/ai/improve-summary',
    params
  );
  return data.improvedSummary ?? '';
}

export interface ImproveDescriptionRequest {
  jobTitle: string;
  currentDescription: string;
}

export interface ImproveDescriptionResponse {
  improvedDescription: string;
}

export async function improveDescription(
  params: ImproveDescriptionRequest
): Promise<string> {
  const data = await postJsonWithRetry<ImproveDescriptionResponse>(
    '/api/ai/improve-description',
    params
  );
  return data.improvedDescription ?? '';
}
