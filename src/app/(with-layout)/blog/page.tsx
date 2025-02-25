import { redirect } from "next/navigation";
import BlogCard from "../../_lib/BlogCard"
import Search from "../../_lib/Search";
import { fetchPublishedPosts } from "@/actions/fetches";
import Inconvienence from "@/app/_lib/Inconvienence";
import { getAccessToken } from "@/utils/server-only";

export interface Post {
    posts_id: string,
    title: string,
    content: string,
    likes: string[],
    excerpt: string,
    readTime: number,
    createdAt: Date,
    lastUpdate: Date,
    isUpdated: boolean

}

export const metadata = {
    title: "Blogs"
}

const Blogs =  async () => {
    const { success, posts, redirectUrl, message, status } = await fetchPublishedPosts();
    const token = getAccessToken();
    
    if (!token) {
        redirect("/login")
    }

    if (status === 404) return <Inconvienence message={message} />
    if (!success && redirectUrl !== null) redirect(redirectUrl)
    if (!success || status === 429) {
        return (
            <div className="ml-auto text-center pt-40 p-20 text-black italic min-h-[70vh]">
                <p className="opacity-60">{message}!</p>
            </div>
        )
    }
    return (
        <div className="flex flex-col items-center gap-10 mt-5 mb-20">
            <Search />
            <div className="text-slate-700 mb-20 p-5 flex flex-col items-center gap-8 justify-center">
                {
                    posts.length ? posts.map((post:Post) => {
                        return <BlogCard excerpt={post.excerpt} readTime={post.readTime} post={post} id={post.posts_id} key={post.posts_id} content={post.content} title={post.title}/>
                    }) : <span className="mt-20">No posts available!</span>
                }
            </div>
        </div>
    )
}

export default Blogs