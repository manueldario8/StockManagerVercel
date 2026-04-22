import type { AuthState } from "./auth.types";

const KEY = "auth";

export const tokenStorage = {
  save(state: AuthState) {
    localStorage.setItem(KEY, JSON.stringify(state));
  },

  get(): AuthState | null {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as AuthState;
    } catch {
      return null;
    }
  },

  clear() {
    localStorage.removeItem(KEY);
  },

  isExpired(): boolean {
    const state = this.get();
    if (!state) return true;
    return new Date(state.expiresAt) <= new Date();
  },
};