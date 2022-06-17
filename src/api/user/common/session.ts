import crypto from 'crypto';

export function createSession(key: string): string {
  const session = crypto
    .createHmac('sha256', key)
    .update(crypto.randomBytes(8))
    .digest('hex');
  // TODO: save the session to cache
  return session;
}
