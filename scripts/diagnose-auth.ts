import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  console.log("--- Auth Diagnosis ---");

  // 1. Check Environment Variables
  console.log("NEXTAUTH_URL:", process.env.NEXTAUTH_URL || "MISSING");
  console.log(
    "NEXTAUTH_SECRET:",
    process.env.NEXTAUTH_SECRET ? "SET" : "MISSING"
  );
  console.log(
    "POSTGRES_PRISMA_URL:",
    process.env.POSTGRES_PRISMA_URL ? "SET" : "MISSING"
  );

  // 2. Check Database Connection
  try {
    console.log("Connecting to database...");
    const userCount = await prisma.user.count();
    console.log(`Database connected. User count: ${userCount}`);

    if (userCount > 0) {
      const users = await prisma.user.findMany({
        take: 5,
        select: { email: true, role: true, isAdmin: true },
      });
      console.log("First 5 users:", JSON.stringify(users, null, 2));
    } else {
      console.log("No users found in database.");
    }
  } catch (error) {
    console.error("Database connection failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
