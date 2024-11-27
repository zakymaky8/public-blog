import Link from "next/link"

interface BlogInfo {
    id: number,
    title: string,
    content: string,
    commentAmt: number
}

const BlogCard = ({id, title, content, commentAmt}: BlogInfo) => {
  return (
    <div className="w-64 h-56 bg-gray-900 rounded-xl text-stone-300 p-3 flex flex-col justify-between">
        <h2 className="text-xl">{title}</h2>
        <p className="text-xs italic">{content}</p>
        <div className="flex justify-between">
            <p>Comments: {Number(commentAmt)}</p>
            <Link href={`/blog/${id}`} className="underline">Read more</Link>
        </div>
    </div>
  )
}

export default BlogCard