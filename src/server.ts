import dns from "dns";

if (process.env.NODE_ENV !== "production") {
  dns.setDefaultResultOrder("ipv4first");
  try {
    dns.setServers(["8.8.8.8", "1.1.1.1"]);
  } catch (err) {
    console.warn("Could not set custom DNS servers:", err);
  }
}

import app from "./app";
import { connectDB } from "./config/db";
import { env } from "./config/env";

async function bootstrap() {
  await connectDB();

  app.listen(env.port, () =>
    console.log(`Server running on http://localhost:${env.port}`)
  );
}

bootstrap().catch((error) => {
  console.error("Failed to start server", error);
  process.exit(1);
});