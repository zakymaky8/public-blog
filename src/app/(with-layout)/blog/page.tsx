import { redirect } from "next/navigation";
import BlogCard from "../../_lib/BlogCard"
import Search from "../../_lib/Search";
import { fetchPublishedPosts } from "@/actions/fetches";
import Inconvienence from "@/app/_lib/Inconvienence";
import Pagination from "@/app/_lib/Pagination";


export interface Post {
    posts_id: string,
    title: string,
    content: string,
    likes: string[],
    excerpt: string,
    readTime: number,
    createdAt: Date,
    lastUpdate: Date,
    isUpdated: boolean,
    views: string[]

}

export const metadata = {
    title: "Blogs"
}

const Blogs =  async ({ searchParams }: {searchParams: Promise<{ search: string, page: number, limit: number }>}) => {
    const { search, page, limit } = await searchParams;

    const { success, posts, redirectUrl, message, status, meta } = await fetchPublishedPosts(search, page, limit);

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
        <div className="flex flex-col items-center gap-10 mt-20">
            <Search />
            <div className="text-slate-700 mb-20 p-5 flex flex-col items-center gap-8 justify-center">
                {
                    posts.length ? posts.map((post:Post) => {
                        return <BlogCard excerpt={post.excerpt} readTime={post.readTime} post={post} id={post.posts_id} key={post.posts_id} content={post.content} title={post.title}/>
                    }) : <span className="mt-20">No posts available!</span>
                }
            </div>

            <Pagination
                type="post"
                currentPage={+meta.current_page}
                currentPageItems={+meta.current_page_items}
                itemsPerPage={+meta.items_per_page}
                totalPages={+meta.total_pages}
                totalItems={+meta.total_items}
                limit={limit ? +limit: limit}
            />
        </div>
    )
}

export default Blogs