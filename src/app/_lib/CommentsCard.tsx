import { redirect } from "next/navigation";
import SingleComment from "./SingleComment";
import { TReply } from "./type";
import Replies from "./Replies";
import { fetchPostsComments } from "@/actions/fetches";


type TProps = {
    postId: string
}

export type TComment = {
    content: string;
    createdAt: Date;
    lastUpdate: Date;
    likes: string[];
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

const CommentsCard = async ({postId}: TProps) => {

    const { data:{ comments, authors, currentUser, replies, replyActorPairs }, redirectUrl, success  } = await fetchPostsComments(postId)

    if (!["", null].includes(redirectUrl) && !success) {
      redirect(redirectUrl!)
    }


    function findAuthor(commentId: string) {
      const authr = authors.find((author: TAuthor) => author.users_id === commentId);
      return authr
    }

  return (
    <div className="bg-slate-200 p-3 rounded-xl">
      <h2 className="font-bold text-xl mb-5">Comments: {comments.length}</h2>
        {comments.length ? 
          comments.map((comment: TComment) => {
            const commentIsLiked = comment.likes.includes(currentUser.users_id) ? true : false
            const commentAuthor = findAuthor(comment.user_id);
            const thisCommentReply = replies.filter((reply: TReply) => reply.comment_id === comment.comments_id) || null;
            return (
              <div key={comment.comments_id} className="flex flex-col gap-3 font-serif">
                <SingleComment
                      comment={comment}
                      commentAuthor={commentAuthor}
                      commentIsLiked={commentIsLiked}
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
  )
}

export default CommentsCard