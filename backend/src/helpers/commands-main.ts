import { runCommandsPosts } from "../modules/posts/commands";
import { runCommandsReports } from "../modules/reports/commands";

export function runCommands() {
    const run = () => {
        runCommandsReports();
        runCommandsPosts();
    }
    setTimeout(run, 5000);
}