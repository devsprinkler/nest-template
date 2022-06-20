import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { RedisCache } from '@src/common/database/redis/redis.interface';
import { logger } from '@src/common/util/logger/winston-logger';

@Injectable()
export class RedisService {
  private redisClient: Redis;
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: RedisCache,
  ) {
    logger.info(
      `create client - ${process.env.REDIS_HOST || 'localhost'}:${
        process.env.REDIS_PORT || '6379'
      }`,
      'Redis',
    );
    this.redisClient = cacheManager.store.getClient();
    this.setUpLogs();
  }

  private defaultExpirationTime: number = 24 * 60 * 60;

  public async set(
    key: string,
    value: string,
    expirationTime = 0,
  ): Promise<'OK' | null> {
    try {
      return this.redisClient.set(
        key,
        value,
        'EX',
        this.getExpirationTimeWithDefaults(expirationTime),
      );
    } catch (err) {
      throw err;
    }
  }

  public async get(key: string): Promise<string> {
    try {
      return this.redisClient.get(key);
    } catch (err) {
      throw err;
    }
  }

  public async setNumber(key: string, value: number, expirationTime = 0) {
    try {
      return this.redisClient.set(
        key,
        value.toString(),
        'EX',
        this.getExpirationTimeWithDefaults(expirationTime),
      );
    } catch (err) {
      throw err;
    }
  }

  public async setnx(key: string, value: string): Promise<number> {
    try {
      return this.redisClient.setnx(key, value);
    } catch (err) {
      throw err;
    }
  }

  public async setex(
    key: string,
    value: string,
    expirationTime = 0,
  ): Promise<'OK' | null> {
    try {
      return this.redisClient.setex(key, expirationTime, value);
    } catch (err) {
      throw err;
    }
  }

  public async zadd(
    setkey: string,
    key: string,
    score: number,
  ): Promise<string | number> {
    try {
      return this.redisClient.zadd(setkey, score, key);
    } catch (err) {
      throw err;
    }
  }

  public async zrangeWithScores(
    key: string,
    start: number,
    end: number,
  ): Promise<string[]> {
    try {
      return this.redisClient.zrange(key, start, end, 'WITHSCORES');
    } catch (err) {
      throw err;
    }
  }

  public async zrange(
    key: string,
    start: number,
    end: number,
  ): Promise<string[]> {
    try {
      return this.redisClient.zrange(key, start, end);
    } catch (err) {
      throw err;
    }
  }

  public async zrevrange(
    key: string,
    start: number,
    end: number,
  ): Promise<string[]> {
    try {
      return this.redisClient.zrevrange(key, start, end);
    } catch (err) {
      throw err;
    }
  }

  public async zrevrangeWithScores(
    key: string,
    start: number,
    end: number,
  ): Promise<string[]> {
    try {
      return this.redisClient.zrevrange(key, start, end, 'WITHSCORES');
    } catch (err) {
      throw err;
    }
  }

  public async exists(key: string): Promise<number> {
    try {
      return this.redisClient.exists(key);
    } catch (err) {
      throw err;
    }
  }

  public async hmset(
    key: string,
    data: Record<string, string>,
    expirationTime = 0,
  ) {
    try {
      const res = this.redisClient.hmset(key, Object.entries(data).flat());
      if (res) {
        await this.expire(
          key,
          this.getExpirationTimeWithDefaults(expirationTime),
        );
      }
      return res;
    } catch (err) {
      throw err;
    }
  }

  async hmget(key: string, fields: string[]): Promise<string[]> {
    try {
      return await this.redisClient.hmget(key, ...fields);
    } catch (err) {
      throw err;
    }
  }

  async hgetall(key: string): Promise<Record<string, string>> {
    try {
      return this.redisClient.hgetall(key);
    } catch (err) {
      throw err;
    }
  }

  async hdel(key: string, field: string[] | string): Promise<number> {
    const fields = field instanceof Array ? field : [field];
    try {
      return await this.redisClient.hdel(key, ...fields);
    } catch (err) {
      throw err;
    }
  }

  async expire(key: string, expirationTime = 0): Promise<number> {
    try {
      return this.redisClient.expire(
        key,
        this.getExpirationTimeWithDefaults(expirationTime),
      );
    } catch (err) {
      throw err;
    }
  }

  async del(key: string): Promise<number> {
    try {
      return this.redisClient.del(key);
    } catch (err) {
      throw err;
    }
  }

  async renamenx(prevKey: string, newKey: string): Promise<number> {
    try {
      return this.redisClient.renamenx(prevKey, newKey);
    } catch (err) {
      throw err;
    }
  }

  async incr(key: string): Promise<number> {
    try {
      return this.redisClient.incr(key);
    } catch (err) {
      throw err;
    }
  }

  async setObject<T>(key: string, value: T, expirationTime = 0) {
    return this.set(key, JSON.stringify(value), expirationTime);
  }

  async getObject<T>(key: string): Promise<T | null> {
    return JSON.parse(await this.get(key));
  }

  async getSortedObject<T>(
    key: string,
    start: number,
    end: number,
  ): Promise<T[] | null> {
    const data = await this.zrevrange(key, start, end);

    const res: T[] = data.map((elem: string) => {
      return JSON.parse(elem);
    });
    return res;
  }

  async keys(pattern: string): Promise<string[]> {
    try {
      return this.redisClient.keys(pattern);
    } catch (err) {
      throw err;
    }
  }

  getExpirationTimeWithDefaults(expirationTime: number): number {
    let eTime = this.defaultExpirationTime;
    if (expirationTime > 0) {
      eTime = expirationTime;
    }
    return eTime;
  }

  async flushDB(): Promise<'OK' | null> {
    try {
      return this.redisClient.flushdb();
    } catch (err) {
      throw err;
    }
  }

  private setUpLogs() {
    this.redisClient.on('ready', (details) => {
      logger.info(`Redis Server Ready: ${details}`, 'Redis');
    });
    this.redisClient.on('connect', (details) => {
      logger.info(`Redis Server Connect: ${details}`, 'Redis');
    });
    this.redisClient.on('reconnecting', (details) => {
      logger.info(`Redis Server Reconnect: ${details}`, 'Redis');
    });
    this.redisClient.on('error', (details) => {
      logger.info(`Redis Server Error: ${details}`, 'Redis');
    });
    this.redisClient.on('end', (details) => {
      logger.info(`Redis Server End: ${details}`, 'Redis');
    });
  }
}
