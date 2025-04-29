import Link from "next/link"
import { Post } from "../(with-layout)/blog/page";
import { decideWhichFormat, isNew } from "./utils";

import newBadge from "../../../public/new_badge_icon.svg"
import Image from "next/image";
import { fetchPostsComments } from "@/actions/fetches";
import { redirect } from "next/navigation";

interface BlogInfo {
    id: string,
    title: string,
    content: string,
    post: Post,
    readTime: number,
    excerpt: string
}

const BlogCard = async ({id, title, excerpt, post, readTime}: BlogInfo) => {

  const { success, data, redirectUrl } = await fetchPostsComments(id);

  if (!success && redirectUrl !== null) {
      redirect(redirectUrl)
  }


  return (
    <div className="relative max-w-[720px] gap-2 min-h-52 bg-[#c8daff] text-[#111827] rounded-md border-t-[13px] border-b-[13px] border-[#111827]  p-3 px-6 flex flex-col justify-between min-w-full"
      style={{boxShadow: "inset 0 0 18px 0 #111827"}}>

        <h2
          className="text-2xl font-[1000] font-serif">
            {title.toUpperCase()[0] + title.slice(1, )} {post.isUpdated &&<span className="pl-3 font-light text-[10px] text-green-700">Updated!</span>}
        </h2>

        {isNew(post.createdAt) && <Image src={newBadge} alt="new badge" className="z-10 h-8 w-8 absolute top-4 right-4" />}

        <div className="flex gap-2 justify-between mb-2">
          <span className="text-[10px] italic opacity-65">{decideWhichFormat(post.createdAt)}</span>
          {post.isUpdated && <span className="text-[10px] italic opacity-65">Updated: {decideWhichFormat(post.lastUpdate)}</span>}
        </div>
        <p className="text-[13px] font-medium">{excerpt} ...</p>
        <div className="flex justify-between items-center flex-wrap gap-2">
            <div className="flex flex-col gap-1 text-[14px] text-green-700 italic font-serif">
              <span>{readTime ?? "--"} min Read,</span>
              <div className="flex  gap-2">
                <span>{data.totalComments ?? 0} comment{data.totalComments > 1 ? "s" : ""}</span>
                <span>{post.likes.length ?? 0} like{post.likes.length > 1 ? "s" : ""}</span>
                <span>{post.views.length ?? 0} view{post.views.length > 1 ? "s" : ""}</span>
              </div>
            </div>
            <Link href={`/blog/${id}`} className="bg-[#111827] no-underline text-yellow-500 text-opacity-60 p-[6px] rounded-md hover:text-opacity-100">Read more</Link>
        </div>
    </div>
  )
}

export default BlogCard