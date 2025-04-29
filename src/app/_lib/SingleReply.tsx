/* eslint-disable @next/next/no-img-element */
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
import DislikeButton from "./DislikeButton"
import pp from "../../../public/person_icon.svg"
import InlineUserProfileInfo from "./InlineUserProfileInfo"
import { FaExclamationCircle } from "react-icons/fa"

type TProps = {

    reply: TReply,
    authorname: TReplyActor,
    comment: TComment,
    postId: string,
    currentUser: TAuthor
}


const SingleReply = ({reply, authorname, comment, postId, currentUser}: TProps) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [isReply, setIsReply] = useState(false)
    const [infoReplierShow, setInfoReplierShow] = useState(false)
    const [infoRepliedShow, setInfoRepliedShow] = useState(false)
    const replyIsLiked = reply.likes.includes(currentUser.users_id) ? true : false
    const replyIsDisLiked = reply.dislikes.includes(currentUser.users_id) ? true : false

  return (
    <div className="relative flex flex-col p-3 pb-1 gap-2 rounded-xl m-3 bg-[#cad5f9]" style={{maxWidth: "80vw"}}>
        <div className="flex items-center gap-3 -mb-4">

            <div className="flex gap-[6px] items-center" onClick={() =>setInfoReplierShow(true)}>
                <div className="relative">
                    <img src={authorname?.replier?.profilePic ? JSON.parse(authorname.replier.profilePic).secure_url : pp.src} alt="profile picture" className="w-6 h-6 rounded-[50%]" />
                    {authorname?.replier.isWarned && <FaExclamationCircle className="absolute -top-3 right-0 text-yellow-700" title="warned" size={18} />}
                </div>
                <h5 className="text-[12px] text-gray-600 hover:underline cursor-pointer">{authorname?.replier.username} {authorname?.replier.Role==="ADMIN" && <span className="text-[9px] bg-black p-[2px] rounded-md mb-2 text-yellow-500">Author</span>}</h5>
            </div>
            {infoReplierShow && <InlineUserProfileInfo user={authorname.replier}/>}
            {infoRepliedShow && <InlineUserProfileInfo user={authorname.replied_to}/>}
            <div onClick={()=> {
                setInfoReplierShow(false)
                setInfoRepliedShow(false)

            }} className={`fixed right-0 top-0 w-screen z-10 min-h-screen bg-[#07283e] opacity-50 ${(infoRepliedShow || infoReplierShow) ? "block" : "hidden"}`}></div>


            <span className="opacity-70 text-[9px]">replied to </span>
            <div className="flex gap-1 items-center text-[10px]" onClick={() => setInfoRepliedShow(true)}>
                <div className="relative">
                <img src={authorname?.replied_to?.profilePic ? JSON.parse(authorname.replied_to.profilePic).secure_url : pp.src} alt="profile picture" className="w-[18px] h-[18px] rounded-[50%]" />
                    {authorname?.replied_to.isWarned && <FaExclamationCircle className="absolute -top-3 right-0 text-yellow-700" title="warned" size={14} />}
                </div>
                <span className=" hover:underline cursor-pointer">{authorname?.replied_to.username} {authorname?.replied_to.Role==="ADMIN" && <span className="text-[9px] bg-black p-[2px] rounded-md mb-2 text-yellow-500">Author</span>}</span>
            </div>
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
            <div className="self-end flex gap-2 items-start mt-3">
                <div className="flex items-center gap-[2px]">
                    <span className="text-[13px] mr-1 font-extrabold text-red-900">{reply.dislikes?.length}</span>
                    <DislikeButton replyId={reply.replies_id} bg={replyIsDisLiked ? '#ef4444' : 'black'} postId={postId} type="reply" commentId={comment.comments_id} />
                </div>

                <div className="flex items-center gap-[2px]">
                    <span className="text-[13px] mr-1 font-extrabold text-red-900">{reply.likes?.length}</span>
                    <LikeButton replyId={reply.replies_id} bg={replyIsLiked ? '#ef4444' : 'black'} postId={postId} type="reply" commentId={comment.comments_id} />
                </div>

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