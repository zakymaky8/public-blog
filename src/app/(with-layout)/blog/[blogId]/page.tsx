import { fetchSinglePost } from "@/actions/fetches";
import AddCommentSec from "@/app/_lib/AddCommentSec";
import CommentsCard from "@/app/_lib/CommentsCard";
import DislikeButton from "@/app/_lib/DislikeButton";
import Inconvienence from "@/app/_lib/Inconvienence";
import LikeButton from "@/app/_lib/LikeButton";
import { TSuggestions } from "@/app/_lib/type";
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
export type TSearchParams = Promise<{ search: string, page: number, limit: number }>

const BlogDetail = async ({params, searchParams}: {
  params: TParams,
  searchParams: TSearchParams
}) => {
    const { blogId } = await params;
    const { data, message, redirectUrl, status, success} = await fetchSinglePost(blogId);

    if (!success || status === 404) return <Inconvienence message={message} />
    if ( !success && redirectUrl !== null) redirect(redirectUrl)

    const {post, author, currentUser, suggestions} = data

    const postIsLiked = post?.likes?.includes(currentUser.users_id) ? true : false;
    const postIsDisLiked = post?.dislikes?.includes(currentUser.users_id) ? true : false;

    return (
      <div className="text-black flex flex-col w-full items-center gap-6 p-5">
        <div className="flex flex-col gap-3">
          <h2 className="text-3xl font-bold text-center font-serif italic" style={{maxWidth: "450px"}}>{post.title.toUpperCase()[0] + post.title.slice(1,)}</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-start text-[10px] italic flex-wrap items-start self-center">
            <cite className="">Author: <strong><em>{`${cap(author.firstname)} ${cap(author.lastname)}`}</em></strong></cite>
            <span> Created:  {decideWhichFormat(post.createdAt)}</span>
            <span> Last update: {decideWhichFormat(post.lastUpdate)}</span>
          </div>
        </div>

        <div className="p-4">

        <div
          style={{lineHeight: "1.5", scrollbarWidth: "none", boxShadow: "inset 1px 1px 5px 0px "}}
          className=" main-cont box-border max-w-[650px] overflow-auto bg-[#e5eff9] px-8  py-3 my-10 border-y-[20px] border-slate-800 text-base rounded-xl"
          dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        <div className="flex gap-5 items-center">
          <div className="flex gap-2 items-center">
            <span className="text-[14px] -mt-1 cursor-pointer">{post.dislikes?.length}</span>
            <DislikeButton commentId="" replyId="" bg={postIsDisLiked ? "#ef4444" : "black"} type='post' postId={blogId}/>
          </div>
          <div className="flex gap-2 items-center">
            <span className="text-[14px] -mt-1 cursor-pointer">{post.likes?.length}</span>
            <LikeButton commentId="" replyId="" bg={postIsLiked ? "#ef4444" : "black"} type='post' postId={blogId}/>
          </div>
        </div>
        <span className="text-[14px] italic opacity-75">{post.views.length} view{post.views.length > 1 ? "s" : ""}</span>
        <Link href="/blog" className="text-[13px] bg-transparent hover:opacity-60 mt-14 mb-6">Back to posts</Link>

        <hr className="w-full border-[1px] border-black opacity-50"/>
        <div className="mb-16 mt-5">
          <AddCommentSec postId={blogId}/>
          <CommentsCard postId={blogId} searchParams={searchParams}/>
        </div>
        {
          suggestions.length > 0 &&
          <div className='self-center max-w-[600px] mt-10'>
            <h3 className='font-bold text-[16px]'>Suggestions to the post</h3>
            <ul className="flex flex-col gap-2">
              {suggestions.map((sugg: TSuggestions) => {
                return <li className="text-[14px] italic opacity-90" key={sugg.suggns_id}>{sugg.content}</li>
              })}
            </ul>
          </div>
        }
      </div>
    )
  }

  export default BlogDetail