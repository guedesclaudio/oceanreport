import { Router } from "express";
import { validateBody } from "../../../middlewares/schema-middleware";
import { createUser, loginOAuth, loginUser, updateUserAccount, userAccount } from "../controllers";
import { createUserSchema, loginOAuthSchema, loginUserSchema, updateUserAccountSchema } from "../schemas";
import { authenticateToken } from "../../../middlewares";

const usersRouter = Router();

usersRouter
  .post("/", validateBody(createUserSchema), createUser)
  .post("/signin", validateBody(loginUserSchema), loginUser)
  .post("/signin/oauth", validateBody(loginOAuthSchema), loginOAuth)
  .get("/account", authenticateToken, userAccount)
  .post("/account/update", authenticateToken, validateBody(updateUserAccountSchema), updateUserAccount);

export default usersRouter;
