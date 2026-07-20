import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const words = await prisma.word.findMany({
    include: {
      diary: true,
      userStatuses: true,
    }
  });
  console.log(JSON.stringify(words, null, 2));
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
