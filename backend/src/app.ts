import express from "express";
import "dotenv/config";
import { connect } from "./db";
import { apiRoutes } from "./routes/apiRoutes";

const app = express();
const PORT = process.env.PORT || 3001;

async function startApp() {
  try {
    await connect();
    app.use(express.json());
    app.use("/api", apiRoutes);
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  } catch (error) {
    console.error("An error occurred while starting the application:", error);
  }
}

startApp();
