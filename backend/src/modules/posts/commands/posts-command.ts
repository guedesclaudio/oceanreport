import { postsService } from "../services";

export function runCommandsPosts() {
    console.log('chamou aqui post')
    setInterval(postsService.checkPostDate, 86400000);
};