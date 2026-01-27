import express from "express";
import { setup } from "./setup.js";

/**
 * Creates a fully configured Express app (no listen)
 */
export async function createApp() {
  const app = express();
  await setup(app);

  return app;
}
