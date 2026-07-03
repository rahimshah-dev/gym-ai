/**
 * Secure storage (auth tokens via expo-secure-store) and general cache
 * (cached plans for offline viewing, per docs/01-product/prd/gymai-coach-prd.md
 * §7 "offline handling"). Keep the secure and general-cache interfaces
 * separate — never put tokens through the general cache path.
 */
export interface SecureStorage {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
}
