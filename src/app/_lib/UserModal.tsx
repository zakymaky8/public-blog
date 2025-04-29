/* eslint-disable @next/next/no-img-element */
"use client"

import { Dispatch, SetStateAction } from "react"
import Logout from "./Logout"
import { TAuthor } from "./type"
import { cap } from "./utils"
import Link from "next/link"
import { FaExclamationCircle } from "react-icons/fa"

type Props = {
    setIsShow: Dispatch<SetStateAction<boolean>>,
    userData: TAuthor | undefined,
    setIsLoggedIn: Dispatch<SetStateAction<boolean>>,
    setMenuShow: Dispatch<SetStateAction<boolean>>

}


const UserModal = ({setIsShow, userData, setIsLoggedIn, setMenuShow}: Props) => {
    const pp = userData?.profilePic ? JSON.parse(userData.profilePic) : null
  return (
    <div
        className="min-w-[290px] overflow-auto flex gap-10 rounded-lg flex-col fixed z-20 top-[25px] right-[10px] p-4  bg-slate-400 border-y-[6px] border-blue-900">
      <Link
        onClick={() => {
          setIsShow(false)
          setMenuShow(false)
        }}
        href="/user" className="flex gap-2 items-center text-black hover:text-yellow-700">

          {
            pp ? <img src={pp.secure_url} alt="user profile picture" className="rounded-[50%] w-9 h-9"/> :
            <h4 className="bg-green-800 rounded-[50%] w-9 h-9 text-white pt-[10px] text-center border-slate-700">{userData?.firstname[0].toUpperCase()}</h4>
          }

        <h4>{`${cap(userData ? userData.firstname : "")} ${cap(userData ? userData.lastname : "")}`}</h4>
      </Link>
      { userData?.isWarned &&
      <div className="flex flex-col gap-2 self-center items-center -mt-4">
        <FaExclamationCircle className="text-yellow-800" title="warned" size={38} />
        <span className="text-center italic text-yellow-800 text-[13px]">You are warned!</span>
      </div>
      }
      <div className="flex flex-col gap-2 text-[13px]">
        <button className="text-yellow-600 hover:text-yellow-300 bg-slate-900 py-2" onClick={() => window.location.href = "/login"}>Login with other account</button>
        <Logout setIsLoggedIn={setIsLoggedIn}/>

      </div>
        <button onClick={() => setIsShow(false)} className="bg-red-950 absolute top-7 p-0 -mt-6 hover:opacity-65 w-8 h-7 font-extralight self-end">X</button>
    </div>
  )
}

// priority of appearance on the top priority 1-10 or other scaling methods
// preferencial appearance relating to user acct

export default UserModal
