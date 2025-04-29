import { redirect } from "next/navigation";
import SingleComment from "./SingleComment";
import { TReply } from "./type";
import Replies from "./Replies";
import { fetchPostsComments } from "@/actions/fetches";
import Pagination from "./Pagination";
import { TSearchParams } from "../(with-layout)/blog/[blogId]/page";
import ToggleSearchBar from "../(with-layout)/suggestions/_lib/ToggleSearchBar";


type TProps = {
    postId: string,
    searchParams: TSearchParams
}

export type TComment = {
    content: string;
    createdAt: Date;
    lastUpdate: Date;
    likes: string[];
    dislikes: string[];
    user_id: string;
    comments_id: string;
    post_id: string;
    isUpdated: boolean
}


export type TAuthor = {
  users_id: string,
  firstname: string,
  lastname: string,
  username: string,
  password: string,
  Role: string
}

const CommentsCard = async ({postId, searchParams}: TProps) => {

    const { search, limit, page } = await searchParams;

    const { data:{ comments, authors, currentUser, replies, replyActorPairs, totalComments }, redirectUrl, success, meta  } = await fetchPostsComments(postId, search, limit, page)

    if (!["", null].includes(redirectUrl) && !success) {
      redirect(redirectUrl!)
    }


    function findAuthor(commentId: string) {
      const authr = authors.find((author: TAuthor) => author.users_id === commentId);
      return authr
    }

  return (
    <div className="flex flex-col">
      <div className="relative bg-slate-200 p-3 rounded-xl w-[340px] sm:w-[430px] md:w-[520px]">
      <ToggleSearchBar />
        <h2 className="font-bold text-xl mb-5">Comments: {totalComments}</h2>
          {comments.length ?
            comments.map((comment: TComment) => {
              const commentIsLiked = comment.likes.includes(currentUser.users_id) ? true : false
              const commentIsDisLiked = comment.dislikes.includes(currentUser.users_id) ? true : false
              const commentAuthor = findAuthor(comment.user_id);
              const thisCommentReply = replies.filter((reply: TReply) => reply.comment_id === comment.comments_id) || null;
              return (
                <div key={comment.comments_id} className="flex flex-col gap-3 font-serif">
                  <SingleComment
                        comment={comment}
                        commentAuthor={commentAuthor}
                        commentIsLiked={commentIsLiked}
                        commentIsDisLiked={commentIsDisLiked}
                        currentUser={currentUser}
                        authorname = {findAuthor(comment.user_id)}
                        postId= {postId}
                  />

                  <Replies currentUser={currentUser} postId={postId} comment={comment} replyActorPairs={replyActorPairs} commentReply={thisCommentReply} />
                  <hr className="border-[1px] border-black opacity-20"/>
                </div>
              )
          })
        : <p className="text-center mt-10 opacity-70 text-[14px]">No comments yet!</p>}
      </div>
      <div className="mt-20">
        <Pagination
            type="comments"
            currentPage={+meta.current_page}
            currentPageItems={+meta.current_page_items}
            itemsPerPage={+meta.items_per_page}
            totalPages={+meta.total_pages}
            totalItems={+meta.total_items}
            limit={limit? +limit : limit}
        />

      </div>
    </div>
  )
}

export default CommentsCard