import postsRepository from "@/repositories/posts-repository";
import { Post } from "@/types";
import { postNotFoundError } from "@/erros/post-not-found-error";
import { offensiveWords } from "@/helpers/posts-helpers";
import { postContentIsNotValid } from "@/erros/offensive-words-error";

const posts = new postsRepository;

export default class PostsService {

    async get() {
        const list: any = await posts.list();
        list.forEach((value: any) => {
            value.hour = `${new Date(value.createdAt).getHours()}:${new Date(value.createdAt).getMinutes()}`;
            value.date = `${new Date(value.createdAt).getDate()}/${new Date(value.createdAt).getUTCMonth()}/${new Date(value.createdAt).getFullYear()}`
            
        });
        this.checkPostDate();
        return list;
    }

    validateWords(postData: Post) {
        const postWords = postData.content.split(" ");
        const existsOffensiveWords = (postWords.filter(value => offensiveWords[value])).length;
        if (existsOffensiveWords) throw postContentIsNotValid();
    }

    async checkPostDate() {
        const today = new Date().getDate();
        const list = await posts.findPostDate();

        for (let i in list) {
            const postDate = list[i].createdAt.toDateString().split(" ")[2];
            const postId = list[i].id;
            const postIsOld = today - Number(postDate) >= 3;

            if (postIsOld) {
                await posts.delete(postId);
            }
        }
    }

    async insert(postData: Post, userId: number) {
        this.validateWords(postData);
        return posts.create(postData, userId);
    }

    async remove(postId: number) {
        const postExists = await posts.find(postId);
        if (!postExists) throw postNotFoundError();
        return posts.delete(postId);
    }
}

const postsService = new PostsService;
const deleteOldPosts = postsService.checkPostDate;

setInterval(deleteOldPosts, 86400000);
