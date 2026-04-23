const KEY = "auth";

export interface AuthStorage {
  token: string;
  expiresAt: string; 
  role: string;
}

export const tokenStorage = {
  save(data: AuthStorage) {
    localStorage.setItem(KEY, JSON.stringify(data));
  },

  get(): AuthStorage | null {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;

    try {
      return JSON.parse(raw) as AuthStorage;
    } catch {
      return null;
    }
  },

  clear() {
    localStorage.removeItem(KEY);
  },

  isExpired(): boolean {
    const auth = this.get();
    if (!auth?.expiresAt) return true;

    return new Date(auth.expiresAt).getTime() <= Date.now();
  },
};