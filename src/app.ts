import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env";
import { errorHandler, notFound } from "./middlewares/error.middleware";
import routes from "./routes";

const app = express();

app.use(helmet());
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin) || origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:')) {
      callback(null, true);
    } else {
      callback(null, true);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: env.nodeEnv === "development" ? 100000 : 5000,
    standardHeaders: true,
    legacyHeaders: false,
    skip: (req) => {
      // Always skip rate limiting in development or for local loopback testing
      const ip = req.ip || req.socket.remoteAddress || '';
      const isLocal =
        ip === '127.0.0.1' ||
        ip === '::1' ||
        ip === '::ffff:127.0.0.1' ||
        ip.includes('127.0.0.1');
      return env.nodeEnv === "development" || isLocal;
    },
    message: {
      status: false,
      message: "Too many requests, please try again later.",
    },
  })
);

app.use("/v1", routes);
app.use(notFound);
app.use(errorHandler);

export default app;
