import { PrismaClient } from "@prisma/client";
import user from "./user.json";
const prisma = new PrismaClient();


async function main() {
  const database = {
    user
  };

  for (const [key, value] of Object.entries(database)) {
    await (prisma as any)[key].createMany({
      data: value,
      skipDuplicates: true,
    });
    console.log(`Seeded ${key}!`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
