import Redis from 'ioredis'

export interface CacheConnection {
  set(key: string, value: any): Promise<void>
  get(key: string): Promise<any>
  delete(key: string): Promise<void>
}

export class RedisAdapter implements CacheConnection {
  private readonly connection: any

  constructor() {
    this.connection = new Redis({
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT!),
      db: parseInt(process.env.REDIS_DB!)
    })
  }

  async set(key: string, value: any): Promise<void> {
    await this.connection.set(key, JSON.stringify(value))
  }

  async get(key: string): Promise<any> {
    let data = await this.connection.get(key)
    if (!data) {
      return null
    }
    data = JSON.parse(data)
    return data
  }

  async delete(key: string): Promise<void> {
    await this.connection.del(key)
  }
}
