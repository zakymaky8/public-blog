import Link from "next/link"
import { Post } from "../blog/page";
import { cookies } from "next/headers";

interface BlogInfo {
    id: string,
    title: string,
    content: string,
    post: Post,
    readTime: number,
    excerpt: string
}

const BlogCard = async ({id, title, excerpt, post, readTime}: BlogInfo) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value
  const res = await fetch(`http://localhost:3456/posts/${id}/comments`, {
    headers: {
        "authorization": `Bearer ${token}`,
        "content-type": "application/json"
      }
  });
  const { data } = await res.json();
  const [comments] = data;


  return (
    <div className="max-w-[600px] gap-2 min-h-56 bg-[#c8daff] text-[#111827] rounded-md border-t-[13px] border-b-[13px] border-[#111827]  p-3 pl-6 pr-6 flex flex-col justify-between"
      style={{boxShadow: "inset 0 0 20px 0 #111827"}}>
        <h2 className="text-2xl font-[1000] font-serif">{title.toUpperCase()[0] + title.slice(1, )}</h2>
        <p className="text-[13px] italic">{excerpt} ...</p>
        <div className="flex justify-between items-center flex-wrap gap-2">
            <div className="flex gap-2 text-[14px] text-green-700">
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