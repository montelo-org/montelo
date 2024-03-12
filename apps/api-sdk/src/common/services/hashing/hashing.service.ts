/**
 * Duplicated in api
 */
import { Injectable } from "@nestjs/common";
import { compare, genSalt, hash } from "bcrypt";

@Injectable()
export class HashingService {
  constructor() {}

  async hash(str: string): Promise<string> {
    const saltRounds = 10;
    const salt = await genSalt(saltRounds);
    return hash(str, salt);
  }

  async verify(apiKey: string, hash: string): Promise<boolean> {
    return await compare(apiKey, hash);
  }
}
