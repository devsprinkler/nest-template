import { Cache, Store } from 'cache-manager';
import { Redis } from 'ioredis';

export interface RedisCache extends Cache {
  store: RedisStore;
}

export interface RedisStore extends Store {
  name: 'redis';
  getClient: () => Redis;
  isCacheableValue: (value: any) => boolean;
}
