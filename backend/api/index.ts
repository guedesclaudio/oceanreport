import app, { init } from "../src/app";
import dotenv from "dotenv";
import { logger } from "../src/config";
import { runCommands } from "../src/helpers";
dotenv.config();

const PORT = process?.env?.PORT || 4000;

init().then(() => {
  app.listen(PORT, () => {
    logger.info(`Server is listening on port ${PORT}. Access http://localhost:${PORT}`);
  });
  runCommands();
});
