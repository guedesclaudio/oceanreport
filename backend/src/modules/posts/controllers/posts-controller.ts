import { AuthenticatedRequest, Post } from "@/types";
import { Response, Request } from "express";
import httpStatus from "http-status";
import { postsService } from "../services";
import { logger } from "../../../config";

export async function getPosts(req: Request, res: Response) {

    try {
        const response = await postsService.get();
        return res.status(httpStatus.OK).send(response);
    } catch (error) {
        logger.error(`[POSTS - getPosts] Error: ${error?.message}`);
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

export async function createPost(req: AuthenticatedRequest, res: Response) {

    const userId = req.userId;
    const postData = req.body as Post;

    try {
        await postsService.insert(postData, Number(userId));
        return res.sendStatus(httpStatus.CREATED);
    } catch (error) {
        logger.error(`[POSTS - createPost] Error: ${error?.message}`);
        if (error.name === "PostContentIsNotValid") return res.sendStatus(httpStatus.BAD_REQUEST);
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

export async function deletePost(req: Request, res: Response) {

    const { postId } = req.params;
    
    try {
        await postsService.remove(Number(postId));
        return res.sendStatus(httpStatus.OK);
    } catch (error) {
        logger.error(`[POSTS - deletePost] Error: ${error?.message}`);
        if (error.name === "PostNotFoundError") return res.sendStatus(httpStatus.NOT_FOUND);
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }   
}