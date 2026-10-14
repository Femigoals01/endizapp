
import "dotenv/config";

import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { randomBytes } from "node:crypto";

import { hash } from "bcryptjs";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

async function main() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL is missing.");
  }

  const prisma = new PrismaClient({
    adapter: new PrismaPg({ connectionString }),
  });

  const rl = createInterface({ input, output });

  try {
    console.log("\nENDIZ — FIRST ADMINISTRATOR SETUP\n");

    // This script is exclusively for initial setup.
    // It cannot create additional accounts after the first admin.
    const existingAdmin = await prisma.adminUser.findFirst({
      where: { role: "ADMIN" },
      select: { id: true },
    });

    if (existingAdmin) {
      console.log(
        "An administrator already exists. Initial setup is disabled."
      );
      return;
    }

    const name = (await rl.question("Full name: ")).trim();

    const email = (
      await rl.question("Administrator email: ")
    )
      .trim()
      .toLowerCase();

    if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error("Please provide a valid name and email.");
    }

    // Generate a strong temporary password.
    // It is displayed once, then stored only as a bcrypt hash.
    const temporaryPassword = randomBytes(24).toString("base64url");

    const passwordHash = await hash(temporaryPassword, 12);

    const admin = await prisma.adminUser.create({
      data: {
        name,
        email,
        passwordHash,
        role: "ADMIN",
        active: true,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    console.log("\nADMINISTRATOR CREATED SUCCESSFULLY");
    console.log("Name:", admin.name);
    console.log("Email:", admin.email);
    console.log("Role:", admin.role);

    console.log("\nTEMPORARY PASSWORD:");
    console.log(temporaryPassword);

    console.log(
      "\nStore this password securely. It will not be displayed again."
    );
  } finally {
    rl.close();
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error("Administrator setup failed:", error.message);
  process.exitCode = 1;
});
