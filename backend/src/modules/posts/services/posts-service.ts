import { Post, PostWithBRDate } from "../../../types";
import { postNotFoundError, } from "../../../erros/post-not-found-error";
import { offensiveWords } from "../../../helpers/posts-helpers";
import { postContentIsNotValid } from "../../../erros/offensive-words-error";
import { Post as PostData } from "@prisma/client";
import { postsRepository } from "../repositories";
import moment from 'moment-timezone';
import { logger } from "../../../config";

async function get(): Promise<PostWithBRDate[]> {
    const list: PostData[] = await postsRepository.list();
    list?.forEach((value: PostWithBRDate) => {
        const brazilianTime = moment.utc(value.createdAt).tz('America/Sao_Paulo');
        value.hour = `${brazilianTime.hours()}:${brazilianTime.minutes()}`;
        value.date = `${brazilianTime.date()}/${brazilianTime.month() + 1}/${brazilianTime.year()}`; 
    });

    return list as PostWithBRDate[];
}

function validateWords(postData: Post): void {
    const postWords = postData.content.split(" ");
    const existsOffensiveWords = (postWords.filter(value => offensiveWords[value])).length;
    if (existsOffensiveWords) throw postContentIsNotValid();
}

async function deleteOldPosts(): Promise<void> {
    try {
        const posts = await postsRepository.findPostDate();
        const oldPostsIds = getOldPostsIds(posts);
        await postsRepository.deleteMany(oldPostsIds);
    } catch (error) {
        logger.error(`[SERVICES - deleteOldPosts] An error has occurred when execute deleteOldPosts. Error: ${JSON.stringify(error)}`);
        console.log(`[SERVICES - deleteOldPosts] An error has occurred when execute deleteOldPosts. Error: ${JSON.stringify(error)}`);
    }
}

async function insert(postData: Post, userId: number): Promise<PostData> {
    this.validateWords(postData);
    return postsRepository.create(postData, userId);
}

async function remove(postId: number): Promise<PostData> {
    const postExists = await postsRepository.find(postId);
    if (!postExists) throw postNotFoundError();
    return postsRepository.deletePost(postId);
}


function getOldPostsIds(posts: PostData[]): number[] {
    const today = new Date()

    return (posts?.filter((post) => {
        const postDate = new Date(post.createdAt);
        postDate.setDate(postDate.getDate() + 2);
        const postItsOld = (today >= postDate);
        if (postItsOld) return post;
    })).map((post) => post.id);
}

export const postsService = {
    insert,
    remove,
    deleteOldPosts,
    validateWords,
    get
}
