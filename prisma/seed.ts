import { seedDatabase } from "../src/lib/seed";

seedDatabase()
  .then(() => {
    console.log("✔ Database popolato dal canon.");
    process.exit(0);
  })
  .catch((e) => {
    console.error("✘ Seed fallito:", e);
    process.exit(1);
  });
