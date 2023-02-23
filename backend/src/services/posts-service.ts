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
        return list;
    }

    validateWords(postData: Post) {
        const postWords = postData.content.split(" ");
        const existsOffensiveWords = postWords.filter(value => offensiveWords[value])
        if (existsOffensiveWords) throw postContentIsNotValid();
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