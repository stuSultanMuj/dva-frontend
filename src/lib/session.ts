import { v4 as uuidv4 } from "uuid";

const SESSION_KEY = "dva-session-id";

export function getSessionId(): string {
  if (typeof window === "undefined") return uuidv4();

  let sessionId = sessionStorage.getItem(SESSION_KEY);
  if (!sessionId) {
    sessionId = uuidv4();
    sessionStorage.setItem(SESSION_KEY, sessionId);
  }
  return sessionId;
}

export function resetSession(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(SESSION_KEY);
}
