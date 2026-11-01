import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const limiters = new Map<string, Ratelimit>();

function getLimiter(namespace: string, limit: number) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  const key = `${namespace}:${limit}`;
  if (!limiters.has(key)) {
    limiters.set(key, new Ratelimit({ redis: new Redis({ url, token }), limiter: Ratelimit.slidingWindow(limit, "10 m"), prefix: `lockbox:${namespace}`, analytics: false }));
  }
  return limiters.get(key)!;
}

async function anonymizedRequestKey(request: Request) {
  const raw = request.headers.get("x-vercel-forwarded-for") || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(raw));
  return Array.from(new Uint8Array(digest)).map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

export async function enforceRateLimit(request: Request, namespace: string, limit: number) {
  if (process.env.NEXT_PUBLIC_DEMO_MODE !== "false") return { success: true, demo: true };
  const limiter = getLimiter(namespace, limit);
  if (!limiter) return { success: false, configurationError: true };
  const result = await limiter.limit(await anonymizedRequestKey(request));
  return { success: result.success, configurationError: false, reset: result.reset };
}
