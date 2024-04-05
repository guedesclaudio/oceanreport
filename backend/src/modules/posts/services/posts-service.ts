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

async function checkPostDate(): Promise<void> {
    const today = new Date().getDate();
    const list = await postsRepository.findPostDate();

    for (let i in list) {
        const postDate = list[i].createdAt.toDateString().split(" ")[2];
        const postId = list[i].id;
        const postIsOld = today - Number(postDate) >= 3;

        if (postIsOld) {
            await postsRepository.deletePost(postId);
        }
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

export const postsService = {
    insert,
    remove,
    checkPostDate,
    validateWords,
    get
}
