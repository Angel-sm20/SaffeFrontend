import dotenv from "dotenv";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const isRailway = Boolean(
    process.env.RAILWAY_ENVIRONMENT ||
    process.env.RAILWAY_PROJECT_ID
);

if (process.env.NODE_ENV !== "production" && !isRailway) {
    const envPath = resolve(dirname(fileURLToPath(import.meta.url)), "../../.env");
    dotenv.config({ path: envPath, override: true, quiet: true });
}
