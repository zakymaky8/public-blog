import Link from "next/link"
import { Post } from "../blog/page";
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
  const {comments} = data;


  return (
    <div className="relative max-w-[600px] gap-2 min-h-56 bg-[#c8daff] text-[#111827] rounded-md border-t-[13px] border-b-[13px] border-[#111827]  p-3 px-6 flex flex-col justify-between min-w-full"
      style={{boxShadow: "inset 0 0 20px 0 #111827"}}>
        <h2 className="text-2xl font-[1000] font-serif">{title.toUpperCase()[0] + title.slice(1, )} {post.isUpdated && <span className="pl-3 font-light text-[10px] text-green-700">Updated!</span>}</h2>
        {isNew(post.createdAt) && <Image src={newBadge} alt="new badge" className="z-10 h-8 w-8 absolute top-4 right-4" />}
        <div className="flex gap-2 mb-3">
          <span className="text-[10px] italic opacity-65">{decideWhichFormat(post.createdAt)}</span>
          {post.isUpdated && <span className="text-[10px] italic opacity-65">Updated At: {decideWhichFormat(post.lastUpdate)}</span>}
        </div>
        <p className="text-[13px] italic">{excerpt} ...</p>
        <div className="flex justify-between items-center flex-wrap gap-2">
            <div className="flex gap-2 text-[14px] text-green-700 italic font-serif">
              <p>{readTime} min Read,</p>
              <p>Comments: {comments.length}</p>
              <p>Likes: {post.likes.length}</p>
            </div>
            <Link href={`/blog/${id}`} className="text-[#f7f8f9] bg-[#111827] no-underline  text-opacity-50 p-[6px] rounded-md hover:text-opacity-100">Read more</Link>
        </div>
    </div>
  )
}

export default BlogCard