import { Router } from "express";
import { authenticateToken, validateParams, validateBody } from "../../../middlewares";
import { createPostSchema, deletePostSchema } from "../schemas";
import { createPost, deletePost, getPosts } from "../controllers";

const postsRouter = Router();

postsRouter
    .get("/", getPosts)
    .post("/", authenticateToken, validateBody(createPostSchema), createPost)
    .delete("/:postId", authenticateToken, validateParams(deletePostSchema), deletePost)

export default postsRouter;
