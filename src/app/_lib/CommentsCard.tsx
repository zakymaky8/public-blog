import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import SingleComment from "./SingleComment";
import { TReply, TReplyActor } from "./type";
import Replies from "./Replies";


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
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const res = await  fetch(`http://localhost:3456/posts/${postId}/comments`, {
      headers: {
        "authorization": `Bearer ${token}`,
        "content-type": "application/json"
      }
    });
    if (!res.ok) {
      redirect("/login")
    }
    const { data } = await res.json();
    const [comments, authors, currentUser, replies, replyActorPairs]: [TComment[], TAuthor[], TAuthor, TReply[], TReplyActor[]] = data;

    function findAuthor(commentId: string) {
      const authr = authors.find(author => author.users_id === commentId);
      return authr
    }

  return (
    <div>
      <h2 className="font-bold text-xl mb-5">Comments: {comments.length}</h2>
        {comments.map((comment) => {
            const commentIsLiked = comment.likes.includes(currentUser.users_id) ? true : false
            const commentAuthor = findAuthor(comment.user_id);
            const thisCommentReply = replies.filter(reply => reply.comment_id === comment.comments_id) || null;
            return (
              <div key={comment.comments_id} className="flex flex-col gap-3">
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
        })}
    </div>
  )
}

export default CommentsCard