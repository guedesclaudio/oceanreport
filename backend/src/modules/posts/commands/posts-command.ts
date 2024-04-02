import { postsService } from "../services";

export function runCommandsPosts() {
    setInterval(postsService.checkPostDate, 86400000);
};