/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { createSuggestionAction } from '@/actions/createSuggestion'
import { updateSuggestionAction } from '@/actions/updateSuggestion'
import { TSuggestions } from '@/app/_lib/type'
import { useRouter } from 'next/navigation'
import React, { Dispatch, SetStateAction, useActionState, useEffect, useState } from 'react';

type TProps = {
        type: string,
        suggestion?: TSuggestions,
        setIsModalShow?: Dispatch<SetStateAction<boolean>>
    }

const SuggestionForm = ({ suggestion, type, setIsModalShow }: TProps) => {

    const router = useRouter()
    const [priority, setPriority] = useState(type === "update" ? suggestion?.priority : "MEDIUM")
    const [isChecked, setIsChecked] = useState(type==="update" ? !suggestion?.isVisible : false)
    const [content, setContent] = useState(type==="update" ? suggestion?.content : "")

    const updateActionWrapper = (prev: {success: boolean, message: string}, formdata: FormData) => {
        return updateSuggestionAction(suggestion!.suggns_id, formdata)
    }
    const [ state, action ] = useActionState(type === "update" ? updateActionWrapper : createSuggestionAction, { message: "", success: "", redirectUrl: "" })

    if (!state.success && !["", null].includes(state.redirectUrl)) {
        router.replace(state.redirectUrl!)
    } else if (state.success === false) {
        alert(state.message);
        state.success = ""
    }

    useEffect(() => {
        if (state.success === true) {
            if (type === "update") {
                setIsModalShow!(false)
                router.refresh();
            }
            else {
                router.push("/suggestions/your-suggestions")
            }
        }
    }, [state.success])

  return (
    <form
        action={action}
        className={` ${type==="update" ? "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30" : ""} shadow-lg  flex flex-col gap-12 bg-[#a3b2c6] p-4 py-8 mx-2 rounded w-[380px] sm:w-[500px] md:w-[600px]`}
        >
        <div className='flex flex-col gap-4'>
            <label htmlFor="content">Your suggestion thoroughly</label>
            <textarea
                name="content"
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className='p-2 py-3 text-[15px] h-[130px] bg-[#b8cdea] rounded placeholder:text-gray-600 resize-none border-[1px] border-gray-500'
                placeholder='write your suggestions thoroughly...'
                 ></textarea>
        </div>
        <div className='flex flex-col gap-4'>
            <label htmlFor="priority">How significant do you think this suggestion is?</label>
            <select value={priority} onChange={(e) => setPriority(e.target.value as "LOW" | "MEDIUM" | "HIGH")} name="priority" id="priority" className='self-center p-2 rounded bg-[#8697ae] w-full'>
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
            </select>
        </div>
        <div className='flex gap-4 items-center'>
            <input checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} type="checkbox" name="visibility" id="visibility" className='accent-slate-700 w-5 h-5' />
            <label htmlFor="visibility">Mark as Anonymous</label>
        </div>

        <button type="submit" className='hover:opacity-75 py-3 hover:text-yellow-500'>{type==="update" ? "Update Suggestion" : "Create Suggestion"}</button>

        {state.success === true && <span className='text-center mt-2 italic text-green-600 text-[14px]'>{state.message}</span>}
    </form>
  )
}

export default SuggestionForm