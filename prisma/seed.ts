import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clear old data (optional)
  await prisma.user.deleteMany();
  await prisma.project.deleteMany();

  // Insert mock data
  const user = await prisma.user.create({
    data: {
      email: "test@example.com",
      name: "Test User",
      projects: {
        create: [
          { title: "Next.js Project" },
          { title: "Prisma Integration" },
        ],
      },
    },
    include: { projects: true },
  });

  console.log("Mock user created:", user);
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });