import { redirect } from "next/navigation";
import BlogCard from "../_lib/BlogCard"
import { cookies } from "next/headers";
import Search from "../_lib/Search";

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
    const cookieStore = cookies();
    const token = (await cookieStore).get("token")?.value;

    const res = await fetch("http://localhost:3456/posts", {
        method: "GET",
        headers: {
            "content-type": "application/json",
            "authorization": `Bearer ${token}`
        },
    });
    if (!res.ok) {
        redirect("/login")
    }
    const { posts } = await res.json();
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