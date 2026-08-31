"use client"

import React, { useState } from 'react'
import EditMyRequestForm from './EditMyRequestForm'



type TProps = {
    contact: string,
    valueProp: string,
    role: string | ("ADMIN" | "EDITOR" | "CREATOR"),
    requestId: string,
    status: string,
}


const EditRoleReqButton = ({contact, requestId, role, valueProp, status}: TProps) => {


    const [isShow, setIsShow] = useState(false)
    console.log(status)


  return (


    <>
        <button disabled={status !== "PENDING"} className="px-4 py-[5px] text-yellow-700 border-[1px] hover:border-[2px] border-black bg-transparent" onClick={() => setIsShow(true)}>UPDATE</button>
    {
        isShow && <EditMyRequestForm setIsShow={ setIsShow } contact={contact} requestId={requestId} role={role} valueProp={valueProp}  />
    }


    <div
        onClick={() => {
            setIsShow(false)
        }}
        className={`
            fixed right-0 top-0 w-screen z-10
            min-h-screen bg-[#07283e] opacity-80
            ${isShow ? "block" : "hidden"}
            `}>
    </div>

    </>
  )

}

export default EditRoleReqButton