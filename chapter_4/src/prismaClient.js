import { PrismaClient } from "@prisma/client";

// Initialize Prisma Client instance
const prisma = new PrismaClient();

// Expose the Prisma Client instance to other modules
export default prisma;
