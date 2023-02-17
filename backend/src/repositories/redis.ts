import { createClient } from "redis";

let redisClient: any;

async function runRedis(): Promise<void> {
  redisClient = createClient({
    socket: { host: process.env.REDIS_HOST || "localhost" }
  });
  await redisClient.connect();
}
runRedis();

export default class Redis {
  private key: string;

  constructor(key: string) {
    this.key = key;
  }

  public set(value: string): void {
    return redisClient.set(this.key, value);
  }
    
  public get(): string {
    return redisClient.get(this.key);
  }
  
  public exists() {
    return redisClient.exists(this.key);
  }
}


