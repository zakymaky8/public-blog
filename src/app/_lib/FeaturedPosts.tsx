import { fetchFeaturedPosts } from "@/actions/fetches"
import { redirect } from "next/navigation";
import Inconvienence from "./Inconvienence";
import { Post } from "../(with-layout)/blog/page";
import { decideWhichFormat } from "./utils";
import Link from "next/link";

const FeaturedPosts = async () => {
    const {message, posts, redirectUrl, success} = await fetchFeaturedPosts("", 1, 3);

    if (!success && redirectUrl) {
        redirect(redirectUrl)
    }
    if (!success) {
        <Inconvienence message={message} />
    }

    if (posts.length > 0) {
        return (
          <ul className="flex flex-col items-center lg:flex-row gap-8 justify-center w-[96vw]">
            {
                posts.map((post:Post) => {
                    const ptitle = post.title.length > 30 ? post.title.slice(0, 30) + "..." : post.title
                    return (
                        <Link
                            href={`/blog/${post.posts_id}`}
                            key={post.posts_id}
                            className="gap-2 bg-[#c8daff] min-h-[310px] w-[90%] md:w-[60%] hover:bg-[#bccef0] hover:translate-x-[6px] hover:-translate-y-[6px] transition-transform duration-[600ms] text-[#111827] rounded-md p-3 px-6 flex flex-col justify-between md:max-w-[60%] pb-1"
                            style={{boxShadow: "inset 0 0 18px 0 #111827"}}>
                            <h2
                                className="text-2xl font-[1000] font-serif">
                                {ptitle.toUpperCase()[0] + ptitle.slice(1, )}
                            </h2>
                            <div className="flex gap-2 justify-between mb-2">
                                <span className="text-[10px] italic opacity-65">{decideWhichFormat(post.createdAt)}</span>
                            </div>
                            <p className="text-[13px] font-medium">{post.excerpt.length > 200 ? post.excerpt.slice(0, 200) + "..." : post.excerpt}</p>
                            <div className="flex justify-between items-center flex-wrap gap-2">
                                <p className="bg-[#111827] no-underline text-yellow-600 text-opacity-100 p-[6px] rounded-md">{post.readTime ?? "--"} min Read</p>
                                <span className="text-[14px] italic opacity-75">{post.views.length} view{post.views.length > 1 ? "s" : ""}</span>
                            </div>
                        </Link>
                    )
                })
            }
          </ul>
        )
    }
    return <p className="text-center mt-10 opacity-70 text-[14px]">No Post!</p>
}


export default FeaturedPosts