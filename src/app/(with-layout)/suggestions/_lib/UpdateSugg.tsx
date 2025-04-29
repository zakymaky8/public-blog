"use client"

import { TSuggestions } from "@/app/_lib/type"
import SuggestionForm from "./SuggestionForm"
import { useState } from "react"


const UpdateSugg = ({suggestion}: {suggestion: TSuggestions}) => {
    const [isModalShow, setIsModalShow] = useState(false)
  return (
    <>
        <button onClick={() => setIsModalShow(true)} className="text-yellow-500 hover:text-white py-[5px] px-3 w-max text-[15px] bg-transparent">update</button>
        {
            isModalShow && <SuggestionForm type="update" suggestion={suggestion} setIsModalShow={setIsModalShow}/>
        }
        <div
            onClick={()=>{
              setIsModalShow(false)
            }}
            className={`
                fixed right-0 top-0 w-screen z-10
                min-h-screen bg-[#07283e] opacity-50
                ${isModalShow ? "block" : "hidden"}
              `}>
        </div>
    </>
  )
}

export default UpdateSugg