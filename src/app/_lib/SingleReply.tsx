"use client"


import editBtn from "../../../public/edit_icon.svg"
import Image from "next/image"

import { TAuthor, TComment, TReply, TReplyActor } from "./type"
import ReplyButton from "./ReplyButton"
import { useState } from "react"
import ReplyForm from "./ReplyForm"
import LikeButton from "./LikeButton"
import EditCommentForm from "./EditCommentForm"
import DeleteButton from "./DeleteButton"
import { decideWhichFormat } from "./utils"

type TProps = {

    reply: TReply,
    authorname: TReplyActor | undefined,
    comment: TComment,
    postId: string,
    currentUser: TAuthor
}


const SingleReply = ({reply, authorname, comment, postId, currentUser}: TProps) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [isReply, setIsReply] = useState(false)
    const replyIsLiked = reply.likes.includes(currentUser.users_id) ? true : false

  return (
    <div className="relative flex flex-col p-3 pb-1 gap-2 rounded-xl m-3 bg-[#cad5f9]" style={{maxWidth: "80vw"}}>
        <div className="flex items-center gap-3 -mb-4">
            <h5 className="text-[12px] text-gray-600 hover:underline cursor-pointer">@{authorname?.replier.username}</h5>
            <h5 className="text-[9px] text-green-950">
                <span className="opacity-70 ">replied to </span>
                <span className=" hover:underline cursor-pointer">@{authorname?.replied_to.username}</span>
            </h5>
        </div>
        { reply.isUpdated && <span className="text-[10px] absolute top-8 right-3 text-yellow-900">edited!</span>}

        {isEditMode ?
            <EditCommentForm
                content = {reply.content}
                replyId={reply.replies_id}
                type="reply"
                commentId = {comment.comments_id}
                postId={postId}
                setIsEditMode={setIsEditMode}/>

                 :
             <p className="pt-1 text-[14px] italic mb-2 max-w-[400px] break-words bg-[#98bddc] p-1 rounded-md">{reply.content}</p> }

        <div className="flex justify-between gap-4 items-center italic">
            <span className="text-[10px] opacity-65">{decideWhichFormat(reply.createdAt)}</span>
            <div className="self-end flex gap-2 items-start">
                <span className="text-[13px] mr-1 font-extrabold text-red-900 rounded-xl border-slate-700 border-b-[5px] border-t-[5px] px-[7px] p-[1px]">{reply.likes?.length}</span>
                <LikeButton replyId={reply.replies_id} bg={replyIsLiked ? 'bg-red-500' : 'bg-none'} postId={postId} type="reply" commentId={comment.comments_id} />
                <ReplyButton setIsReply={setIsReply}/>
                {
                currentUser.users_id === authorname?.replier.users_id &&
                <button type="submit" onClick={() => setIsEditMode(true)} className="bg-slate-300 p-0 w-fit">
                    <Image title="edit comment" src={editBtn} alt="edit button"  className="h-[20px] w-[20px] rounded-[50%]"/>
                </button>
                }
                {
                    currentUser.users_id === authorname?.replier.users_id &&
                    <DeleteButton replyId={reply.replies_id} type="reply" postId={postId} commentId={comment.comments_id}/>
                }
            </div>
        </div>
         {isReply && <ReplyForm action="to_reply" replyId={reply.replies_id} commentId={comment.comments_id} postId={postId} setIsReply={setIsReply} />}
  </div>
  )
}

export default SingleReply