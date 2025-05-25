require("dotenv").config();

export type NODE_ENV_VALUES = "development" | "staging" | "production";

export interface Enviroment {
  port: number;
  nodeEnv: NODE_ENV_VALUES;
}

const enviroment: Enviroment = {
  port: Number(process.env.PORT) || 5000,
  nodeEnv: (process.env.NODE_ENV as NODE_ENV_VALUES) || "development",
};

export default enviroment;
