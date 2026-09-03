import { use } from "react"

export default function Posts ({postDataPromise}) {

    const posts = use(postDataPromise);
    console.log(posts);

    return (
        <div>

        </div>
    )
}