"use client"

import { Dispatch, SetStateAction, useActionState, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { updateCommentAction } from "@/actions/updateComment"
import { updateReplyAction } from "@/actions/updateReply"


const EditCommentForm = ({content, setIsEditMode, postId, commentId, type, replyId}:
     {
        setIsEditMode: Dispatch<SetStateAction<boolean>>,
        postId: string,
        commentId:string,
        type: string,
        replyId: string,
        content: string
}) => {
    const router = useRouter()
    const [editValue, setEditValue] = useState(content)

    const actionWrapper =
        async function(
            prev:{
                success: boolean,
                message: string,
                redirectUrl: string | null,
                },
            formData: FormData) {

        return type === "comment" ?
                await updateCommentAction(postId, commentId, formData) :
                await updateReplyAction(postId, commentId, replyId, formData)
    }

    const [state, formStateAction ] = useActionState(actionWrapper, {success: "", message: "", redirectUrl: ""});

    if (!["", null].includes(state.redirectUrl)) {
        router.push(state.redirectUrl!)
    }
    if(state.success === false) {
        alert(state.message)
    }

    useEffect(() => {
        if (state.success === true) {
            router.refresh();
            setIsEditMode(false)
        }
        state.success = ""
    }, [state, router, setIsEditMode]);
  return (
    <form 
        action={formStateAction}
        className="flex mt-1 mb-1 items-end"
        >
        <textarea
            name="content"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            id="content"
            rows={6}
            cols={28}
            className="h-fit w-fit p-2 text-[14px] m-1 mr-[1px] resize-none  bg-slate-400 pl-1 text-green-950"
        
        ></textarea>

        {editValue === content ?
            <span onClick={() => setIsEditMode(false)} className="bg-black cursor-pointer text-white text-[13px] h-fit p-1  mb-1 rounded-none">cancel</span> : 
            <button type="submit" className=" rounded-none h-fit w-50px text-[13px] text-white mb-1">Edit</button>
        }
        
    </form>
  )
}

export default EditCommentForm