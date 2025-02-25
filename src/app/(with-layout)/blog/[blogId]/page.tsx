import { fetchSinglePost } from "@/actions/fetches";
import AddCommentSec from "@/app/_lib/AddCommentSec";
import CommentsCard from "@/app/_lib/CommentsCard";
import Inconvienence from "@/app/_lib/Inconvienence";
import LikeButton from "@/app/_lib/LikeButton";
import { decideWhichFormat } from "@/app/_lib/utils";
import Link from "next/link";
import { redirect } from "next/navigation";

function cap(word: string):string {
  return word[0].toUpperCase() + word.slice(1,).toLowerCase()
}


export async function generateMetadata({ params }: {params: Promise<{blogId: string}>}) {
  const { blogId } = await params;
  const { data, message, success } = await fetchSinglePost(blogId);
  if (!success ) return { title: message}
  else {
    return {title: data.post.title}
  }
}

type TParams = Promise<{ blogId: string }>;

const BlogDetail = async ({params}: {
  params: TParams
}) => {
    const { blogId } = await params;
    const { data, message, redirectUrl, status, success} = await fetchSinglePost(blogId)

    if (!success || status === 404) return <Inconvienence message={message} />
    if ( !success && redirectUrl !== null) redirect(redirectUrl)

    const {post, author, currentUser} = data

    const postIsLiked = post?.likes?.includes(currentUser.users_id) ? true : false;

    return (
      <div className="text-black flex flex-col w-full items-center gap-5 p-5">
        <div className="flex flex-col gap-3">
          <h2 className="text-3xl font-bold text-center font-serif italic" style={{maxWidth: "450px"}}>{post.title.toUpperCase()[0] + post.title.slice(1,)}</h2>
          <div className="flex gap-4 justify-start text-[10px] italic flex-wrap items-center">
            <cite className="">Author: <strong><em>{`${cap(author.firstname)} ${cap(author.lastname)}`}</em></strong></cite>
            <p> Created at:  {decideWhichFormat(post.createdAt)}</p>
            <p> Last update: {decideWhichFormat(post.lastUpdate)}</p>
          </div>
        </div>

        <div className="p-4">

        <div
          style={{lineHeight: "1.5", scrollbarWidth: "none", boxShadow: "inset 1px 1px 5px 0px "}}
          className=" main-cont box-border max-w-[650px] overflow-auto bg-[#e5eff9] px-10  py-3 my-10 border-y-[25px] border-slate-800 text-[16px] rounded-xl"
          dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        <div className='flex gap-2 items-center mt-10'>
          <span className="text-[14px] -mt-1 cursor-pointer">{post.likes?.length}</span>
          <LikeButton commentId="" replyId="" bg={postIsLiked ? "bg-red-500" : "bg-none"} type='post' postId={blogId}/>
          <span className=' text-[11px] bg-black text-white p-1 rounded-sm font-light ml-2'>{postIsLiked ? "You liked this post 🎉" :  "Like this Post!"} </span>
        </div>
        <Link href="/blog" className="text-[13px] bg-transparent hover:opacity-60 mt-5">Back to posts</Link>
        <hr className="w-full border-[1px] border-black opacity-50"/>
  
        <div className="mb-16 mt-5">
          <AddCommentSec postId={blogId}/>
          <CommentsCard postId={blogId}/>
        </div>

      </div>
    )
}

export default BlogDetail