type Entry = { attempts: number; resetAt: number };
const entries = new Map<string, Entry>();
export function allowSensitiveRequest(key: string, limit = 10, windowMs = 60_000) {
  const now = Date.now();
  const current = entries.get(key);
  if (!current || current.resetAt <= now) {
    entries.set(key, { attempts: 1, resetAt: now + windowMs });
    return true;
  }
  if (current.attempts >= limit) return false;
  current.attempts += 1;
  return true;
}
