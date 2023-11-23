
import { Customer } from "@prisma/client";
import Snoowrap from "snoowrap";
export const reddit = (title, url, subreddit, cliente: Customer) => {

    return new Promise((suc, rej) => {

        const r = new Snoowrap({
            userAgent: "Whatever",
            clientId: cliente.reddit_clientId,
            clientSecret: cliente.reddit_clientSecret,
            username: cliente.reddit_username,
            password: cliente.reddit_password,
        });

        r.getSubreddit(subreddit)
            .submitLink({
                title,
                url,
                sendReplies: true,
                nsfw: true,
            }).then((e) => {
                console.log({ e })
                suc({ status: true, name: e.name })
            })
            .catch((e) => {
                console.log("hay un error");
                console.log({e});
                suc({ status: false, name: null })
            });

    });




}