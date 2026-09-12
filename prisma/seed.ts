import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.systemHealth.upsert({
    where: { key: "seed" },
    update: { value: "LifeTrack foundation seed" },
    create: { key: "seed", value: "LifeTrack foundation seed" },
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (error: unknown) => {
    console.error("Database seed failed", error);
    await prisma.$disconnect();
    process.exitCode = 1;
  });
