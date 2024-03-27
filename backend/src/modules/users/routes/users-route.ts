import { Router } from "express";
import { validateBody } from "@/middlewares/schema-middleware";
import { createUser, loginOAuth, loginUser } from "../controllers";
import { createUserSchema, loginOAuthSchema, loginUserSchema } from "../schemas";

const usersRouter = Router();

usersRouter
  .post("/", validateBody(createUserSchema), createUser)
  .post("/signin", validateBody(loginUserSchema), loginUser)
  .post("/signin/oauth", validateBody(loginOAuthSchema), loginOAuth);

export default usersRouter;
