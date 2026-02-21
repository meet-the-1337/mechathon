const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      username: "manan",
      role: "admin",
    },
  });

  console.log("Inserted:", user);

  const all = await prisma.user.findMany();
  console.log("All users:", all);
}

main().finally(() => prisma.$disconnect());
