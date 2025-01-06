"use client"

import { Dispatch, SetStateAction, useState } from "react"
import Logout from "./Logout"
import { TAuthor } from "./type"
import { cap } from "./utils"
import ChangePwd from "./ChangePwd"

type Props = {
    setIsShow: Dispatch<SetStateAction<boolean>>,
    userData: TAuthor | undefined

}


const UserModal = ({setIsShow, userData}: Props) => {
    const [showPwdChange, setShowPwdChange]= useState(false);

  return (
    <div
        className="min-w-[270px] flex gap-8 rounded-lg flex-col fixed z-20 top-[25px] right-[10px] p-4  bg-yellow-600 border-y-[10px] border-gray-900"
        style={{boxShadow: "0 0 4px 0 white"}}>
      <div className="flex gap-2 items-center">
        <h3 className="bg-green-800 rounded-[50%] w-9 h-9 text-white pt-2 text-center">{userData?.firstname[0].toUpperCase()}</h3>
        <h4>{`${cap(userData ? userData.firstname : "")} ${cap(userData ? userData.lastname : "")}`}</h4>
      </div>
      <div className="flex flex-col gap-2 text-[13px]">
        <button className={`text-yellow-600 hover:text-yellow-300`} onClick={() => setShowPwdChange(!showPwdChange)}>Change Password</button>
        {
            showPwdChange &&
            <ChangePwd setShowPwdChange={setShowPwdChange} showPwdChange={showPwdChange}/>
        }
        <button className="text-yellow-600 hover:text-yellow-300" onClick={() => window.location.href = "/login"}>Login with other account</button>
        <Logout />
      </div>
        <button onClick={() => setIsShow(false)} className="bg-red-600 font-bold -mt-6 text-[12px] w-fit self-end">Close</button>
    </div>
  )
}

// priority of appearance on the top priority 1-10 or other scaling methods
// preferencial appearance relating to user acct

export default UserModal
