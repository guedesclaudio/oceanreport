import { prisma } from "@/config";
import { Post } from "@/types";

async function list() {
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

async function create(postData: Post, userId: number) {
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

async function deletePost(postId: number) {
    return prisma.post.delete({
            where: { id: postId }
    });
}

async function find(postId: number) {
    return prisma.post.findUnique({
        where: { id: postId }
    });
}

async function findPostDate() {
    return prisma.post.findMany({});
}

export const postsRepository = {
    list,
    create,
    deletePost,
    find,
    findPostDate,
}