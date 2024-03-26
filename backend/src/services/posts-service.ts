import { postsRepository } from "@/repositories/posts-repository";
import { Post } from "@/types";
import { postNotFoundError } from "@/erros/post-not-found-error";
import { offensiveWords } from "@/helpers/posts-helpers";
import { postContentIsNotValid } from "@/erros/offensive-words-error";

async function get() {
    const list: any = await postsRepository.list();
    list.forEach((value: any) => {
        value.hour = `${new Date(value.createdAt).getHours()}:${new Date(value.createdAt).getMinutes()}`;
        value.date = `${new Date(value.createdAt).getDate()}/${new Date(value.createdAt).getUTCMonth() + 1}/${new Date(value.createdAt).getFullYear()}`   
    });
    this.checkPostDate();
    return list;
}

function validateWords(postData: Post) {
    const postWords = postData.content.split(" ");
    const existsOffensiveWords = (postWords.filter(value => offensiveWords[value])).length;
    if (existsOffensiveWords) throw postContentIsNotValid();
}

async function checkPostDate() {
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

async function insert(postData: Post, userId: number) {
    this.validateWords(postData);
    return postsRepository.create(postData, userId);
}

async function remove(postId: number) {
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

const deleteOldPosts = postsService.checkPostDate;
setInterval(deleteOldPosts, 86400000);
