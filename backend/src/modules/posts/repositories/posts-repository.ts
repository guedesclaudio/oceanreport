import { prisma } from "../../../config";
import { Post, PostAndUserName } from "../../../types";
import { Post as PostData, Prisma } from "@prisma/client";

async function list(): Promise<PostAndUserName[]> {
    return prisma.post.findMany({
        orderBy: {
            createdAt: 'desc'
        },
        include: {
            User: {
                select: { name: true }
            }
        }
    });
}

async function create(postData: Post, userId: number): Promise<PostData> {
    return prisma.post.create({
        data: { 
            Title: postData.title,
            Content: postData.content,
            userId,
            createdAt: new Date(),
            updatedAt: new Date(),
        }
    });
}

async function deletePost(postId: number): Promise<PostData> {
    return prisma.post.delete({
        where: { id: postId }
    });
}

async function deleteMany(postIds: number[]): Promise<Prisma.BatchPayload> {
    return prisma.post.deleteMany({
        where: {
            id: {
                in: postIds,
            }
        }
    })
}

async function find(postId: number): Promise<PostData> {
    return prisma.post.findUnique({
        where: { id: postId }
    });
}

async function findPostDate(): Promise<PostData[]> {
    return prisma.post.findMany({});
}

export const postsRepository = {
    list,
    create,
    deletePost,
    find,
    findPostDate,
    deleteMany,
}