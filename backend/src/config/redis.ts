import { createClient } from "redis";
import { logger } from "./log";

let redisClient: any;

async function runRedis(): Promise<void> {
  redisClient = createClient({
    socket: { host: process.env.REDIS_HOST || "localhost" }
  });
  await redisClient.connect();
  logger.info('redis was connected with success')
}
runRedis();

export const redis = redisClient;