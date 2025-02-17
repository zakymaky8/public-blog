import { redirect } from "next/navigation";
import BlogCard from "../_lib/BlogCard"
import Search from "../_lib/Search";
import { fetchPublishedPosts } from "@/actions/fetches";

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
    const { success, posts, redirectUrl } = await fetchPublishedPosts();

    if (!success && redirectUrl !== null) {
        redirect(redirectUrl)
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