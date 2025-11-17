import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/schemas/",   
  out: "./drizzle",             
  dialect: "postgresql",
} satisfies Config;