import { createClient } from "redis";

let redisClient: any;

async function runRedis(): Promise<void> {
  redisClient = createClient({
    socket: { host: process.env.REDIS_HOST || "localhost" }
  });
  await redisClient.connect();
  console.log('redis connect with success')
}
runRedis();

export const redis = redisClient;