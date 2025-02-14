"use client"

import LikeButton from "./LikeButton"
import ReplyButton from "./ReplyButton"
import editBtn from "../../../public/edit_icon.svg"
import Image from "next/image"
import DeleteButton from "./DeleteButton"
import { TAuthor, TComment } from "./type"
import { useState } from "react"
import EditCommentForm from "./EditCommentForm"
import ReplyForm from "./ReplyForm"
import { decideWhichFormat } from "./utils"

type TProps = {
    commentIsLiked: boolean,
    commentAuthor: TAuthor | undefined,
    comment: TComment,
    currentUser: TAuthor,
    authorname: TAuthor | undefined,
    postId: string
}


const SingleComment = ({commentIsLiked, commentAuthor, comment, currentUser, authorname, postId}: TProps) => {
    const [isEditMode, setIsEditMode] = useState(false);
    
    const [isReply, setIsReply] = useState(false)

  return (
    <div className="flex relative com-sec flex-col  p-3 pb-1 rounded-xl bg-[#d1cff9] m-2" style={{maxWidth: "90vw"}}>
        <h2 className="text-sm text-gray-600 hover:underline cursor-pointer">@{authorname?.username} {authorname?.Role==="ADMIN" && <span className="text-[9px] bg-black p-[2px] rounded-md mb-2 text-yellow-500">Author</span>}</h2>
        { comment.isUpdated && <span className="absolute top-7 right-3 text-[10px] text-yellow-900">edited!</span>}
        {
        isEditMode ? <EditCommentForm content={comment.content} replyId="" type="comment" commentId = {comment.comments_id} postId={postId} setIsEditMode={setIsEditMode} /> : 
        <p className="pt-1 italic p-2 max-w-[400px] break-words text-justify rounded-md bg-[#b2b0fa]">{comment.content}</p>
        }
        <div className="flex justify-between gap-4 items-center italic">
            <span className="text-[10px] opacity-65">{decideWhichFormat(comment.createdAt)}</span>
            <div className="self-end flex gap-2 items-center">
                <span className="text-[16px] mr-1 text-red-900 border-b-[5px] font-extrabold border-t-[5px] rounded-xl border-slate-700 px-[7px]">{comment.likes?.length}</span>
                <LikeButton replyId="" bg={commentIsLiked ? "bg-red-500" : "bg-none"} postId={postId} type="comment" commentId={comment.comments_id} />
                <ReplyButton setIsReply = {setIsReply}/>
                {
                currentUser.users_id === commentAuthor?.users_id &&
                <button onClick={() => setIsEditMode(true)}  type="submit" className="bg-slate-300 p-0 w-fit">
                    <Image title="edit comment" src={editBtn} alt="edit button"  className="h-[20px] w-[20px] rounded-[50%]"/>
                </button>
                }
                {
                    currentUser.users_id === commentAuthor?.users_id &&
                    <DeleteButton type="comment" replyId="" postId={postId} commentId={comment.comments_id}/>
                }
            </div>
        </div>
        {isReply && <ReplyForm replyId="" action="to_comment" commentId={comment.comments_id} postId={postId} setIsReply={setIsReply} />
        }
  </div>
  )
}

export default SingleComment