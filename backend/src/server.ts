import app, { init } from "./app";
import dotenv from "dotenv";
import { logger } from "./config";
dotenv.config();

const PORT = process?.env?.PORT || 4000;

init().then(() => {
  app.listen(PORT, () => {
    logger.info(`Server is listening on port ${PORT}. Access http://localhost:${PORT}`);
  });
});
