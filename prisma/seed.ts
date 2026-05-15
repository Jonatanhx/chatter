import { db } from "~/server/db";

async function main() {
  const user = await db.user.upsert({
    where: { email: "admin@admin.com" },
    update: {},
    create: {
      email: "admin@admin.com",
      name: "admin",
    },
  });

  const post = await db.post.upsert({
    where: { id: "seed-post-1" },
    update: {},
    create: {
      id: "seed-post-1",
      content: "My First Post",
      userId: user.id,
    },
  });

  console.log({ user, post });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
