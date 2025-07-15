import { PrismaClient } from "./generated/prisma";

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}


//create global variable to ensure Prisma client instance is resused
//otherwise each time app reloads, new instance of Prisma client is created, 
//which can lead to connection issues
