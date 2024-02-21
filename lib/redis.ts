import { redisUrl } from "@/constants";
import IORedis, { Redis } from "ioredis";

class ClientRedis {
  static instance: Redis;

  constructor() {
    throw new Error("Use Singleton.getInstance()");
  }

  static getInstance(): Redis | null {
    if (!ClientRedis.instance) {
      console.log("redis url", redisUrl);
      ClientRedis.instance = new IORedis(redisUrl);
    }
    return ClientRedis.instance;
  }
}

export default ClientRedis.getInstance();
