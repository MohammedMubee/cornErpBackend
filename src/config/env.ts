import dotenv from "dotenv";

dotenv.config();

const required = (key: string, fallback?: string): string => {
  const value = process.env[key] ?? fallback;
  if (!value) throw new Error(`Missing environment variable: ${key}`);
  return value;
};

export const env = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  port: Number(process.env.PORT ?? 5000),
  MONGO_URI: process.env.MONGO_URI || "",
  jwtAccessSecret: required("JWT_ACCESS_SECRET", "change_this_access_secret_min_32_chars"),
  jwtRefreshSecret: required("JWT_REFRESH_SECRET", "change_this_refresh_secret_min_32_chars"),
  jwtAccessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN ?? "1d",
  jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN ?? "7d",
  corsOrigin: process.env.CORS_ORIGIN ?? "http://localhost:5173",
};
