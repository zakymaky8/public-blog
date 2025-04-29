/* eslint-disable @next/next/no-img-element */
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
import DislikeButton from "./DislikeButton"
import pp from "../../../public/person_icon.svg"
import InlineUserProfileInfo from "./InlineUserProfileInfo"
import { FaExclamationCircle } from "react-icons/fa"

type TProps = {
    commentIsLiked: boolean,
    commentIsDisLiked: boolean,
    commentAuthor: TAuthor | undefined,
    comment: TComment,
    currentUser: TAuthor,
    authorname: TAuthor | undefined,
    postId: string
}


const SingleComment = ({commentIsLiked, commentAuthor, comment, currentUser, postId, commentIsDisLiked}: TProps) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [infoShow, setInfoShow] = useState(false)
    const [isReply, setIsReply] = useState(false)

  return (
    <div className="flex relative com-sec flex-col  p-3 pb-1 rounded-xl bg-[#d1cff9] m-2" style={{maxWidth: "90vw"}}>

        <div className="flex gap-2 items-center" onClick={() =>setInfoShow(true)}>
            <div className="relative">
                <img src={commentAuthor?.profilePic ? JSON.parse(commentAuthor.profilePic).secure_url : pp.src} alt="profile picture" className="w-7 h-7 rounded-[50%]" />
                {commentAuthor?.isWarned && <FaExclamationCircle className="absolute -top-3 right-0 text-yellow-700" title="warned" size={20} />}
            </div>
            <h2 className="text-sm text-gray-600 hover:italic cursor-pointer">{commentAuthor?.username} {commentAuthor?.Role==="ADMIN" && <span className="text-[9px] bg-black p-[2px] rounded-md mb-2 text-yellow-500">Author</span>}</h2>
        </div>
        {infoShow && <InlineUserProfileInfo user={commentAuthor!}/>}
        {/* layer */}
        <div onClick={()=>setInfoShow(false)} className={`fixed right-0 top-0 w-screen z-10 min-h-screen bg-[#07283e] opacity-50 ${(infoShow) ? "block" : "hidden"}`}></div>

        { comment.isUpdated && <span className="absolute top-7 right-3 text-[10px] text-yellow-900">edited!</span>}
        {
        isEditMode ? <EditCommentForm content={comment.content} replyId="" type="comment" commentId = {comment.comments_id} postId={postId} setIsEditMode={setIsEditMode} /> : 
        <p className="pt-1 italic p-2 max-w-[400px] break-words text-justify rounded-md bg-[#b2b0fa]">{comment.content}</p>
        }
        <div className="flex justify-between gap-4 items-center italic mt-4">
            <span className="text-[10px] opacity-65">{decideWhichFormat(comment.createdAt)}</span>
            <div className="flex gap-2 items-center">
                <div className="flex items-center gap-[2px]">
                    <span className=" mr-1 text-red-900 font-extrabold rounded-xl px-[7px]">{comment.dislikes?.length}</span>
                    <DislikeButton replyId="" bg={commentIsDisLiked ? "#ef4444" : "black"} postId={postId} type="comment" commentId={comment.comments_id} />
                </div>
                <div className="flex items-center gap-[2px]">
                    <span className=" mr-1 text-red-900 font-extrabold rounded-xl px-[7px]">{comment.likes?.length}</span>
                    <LikeButton replyId="" bg={commentIsLiked ? "#ef4444" : "black"} postId={postId} type="comment" commentId={comment.comments_id} />
                </div>
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