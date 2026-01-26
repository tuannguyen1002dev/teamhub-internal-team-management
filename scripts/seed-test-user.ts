import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = 'test@example.com';
  const password = 'password123';
  const hashedPassword = await bcrypt.hash(password, 10);

  const account = await prisma.account.upsert({
    where: { email },
    update: { password: hashedPassword },
    create: {
      email,
      password: hashedPassword,
      role: 'ADMIN',
      fullname: 'Test Admin',
      username: 'testadmin',
      permissions: ['READ', 'WRITE', 'UPDATE', 'DELETE']
    },
  });

  console.log('Test account created/updated:', account.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
