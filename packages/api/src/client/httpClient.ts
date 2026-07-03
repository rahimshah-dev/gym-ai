/**
 * Thin fetch wrapper — the ONLY place in the app that should call fetch()
 * directly against the production API. See root AGENTS.md "Do NOT create a
 * second API client" — every endpoint module in ../endpoints goes through
 * this.
 */
export interface HttpClientConfig {
  baseUrl: string;
  getAuthToken: () => Promise<string | null>;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export function createHttpClient(config: HttpClientConfig) {
  async function request<T>(path: string, init?: RequestInit): Promise<T> {
    const token = await config.getAuthToken();
    const res = await fetch(`${config.baseUrl}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...init?.headers
      }
    });

    const body = await res.json().catch(() => ({}));

    if (!res.ok) {
      throw new ApiError(body?.error ?? "Request failed", res.status);
    }

    return body as T;
  }

  return { request };
}

export type HttpClient = ReturnType<typeof createHttpClient>;
