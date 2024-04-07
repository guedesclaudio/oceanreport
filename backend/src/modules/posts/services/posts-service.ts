import { Post, PostWithBRDate } from "../../../types";
import { postNotFoundError, } from "../../../erros/post-not-found-error";
import { offensiveWords } from "../../../helpers/posts-helpers";
import { postContentIsNotValid } from "../../../erros/offensive-words-error";
import { Post as PostData } from "@prisma/client";
import { postsRepository } from "../repositories";
import moment from 'moment-timezone';

async function get(): Promise<PostWithBRDate[]> {
    const list: PostData[] = await postsRepository.list();
    list?.forEach((value: PostWithBRDate) => {
        const brazilianTime = moment.utc(value.createdAt).tz('America/Sao_Paulo');
        
        value.hour = `${brazilianTime.hours()}:${brazilianTime.minutes()}`;
        value.date = `${brazilianTime.day()}/${brazilianTime.month()}/${brazilianTime.year()}`;   
    });

    return list as PostWithBRDate[];
}

function validateWords(postData: Post): void {
    const postWords = postData.content.split(" ");
    const existsOffensiveWords = (postWords.filter(value => offensiveWords[value])).length;
    if (existsOffensiveWords) throw postContentIsNotValid();
}

async function deleteOldPosts(): Promise<void> {
    const posts = await postsRepository.findPostDate();
    const oldPostsIds = getOldPostsIds(posts);
    await postsRepository.deleteMany(oldPostsIds);
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

function getPostDate(post: PostData): number {
    return Number(post.createdAt.toDateString().split(" ")[2]);
}

function getOldPostsIds(posts: PostData[]): number[] {
    const today = new Date().getDate();

    return (posts?.filter((post) => {
        const postDate = getPostDate(post)
        const postItsOld = (today - postDate >= 1);
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
