import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const publications = await prisma.publication.findMany();
  const users = await prisma.user.findMany();
  if (publications) {
    await prisma.$executeRaw`TRUNCATE TABLE "publications" RESTART IDENTITY CASCADE;`
  }
  if (users) {
    await prisma.$executeRaw`TRUNCATE TABLE "users" RESTART IDENTITY CASCADE;`
  }
}

main().
  then(() => {
    console.log('Database cleaned');
  }).
  catch((error) => {
  console.log(error);
  process.exit(1);
  }).
  finally(async () => {
    await prisma.$disconnect();
})