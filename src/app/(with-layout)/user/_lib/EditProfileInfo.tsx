"use client"

import { updateProfileInfoAction } from "@/actions/updateProfile";
import { TAuthor } from "@/app/_lib/type";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";

const EditProfileInfo = ({user}: { user: TAuthor }) => {
    const [isModalShow, setIsModalShow] = useState(false);
    const router = useRouter();
    const [profInfo, setProfInfo] = useState({ fname: user.firstname ?? "", lname: user.lastname ?? "", uname: user.username ?? "" })

    const actionwrapper = async (prev: { success: boolean, message: string }, formdata: FormData) => {
        return updateProfileInfoAction(user.users_id, formdata)
    }
    const [state, action] = useActionState(actionwrapper, { success: "", message: "" })
    useEffect(() => {
        if (state.success) {
            setIsModalShow(false)
            router.refresh()
            state.success = ""
        }
    }, [state.success])
  return (
    <>
        <button
            className="px-4 text-yellow-600 py-[10px] w-[230px] hover:text-yellow-300 bg-slate-900"
            onClick={()=> setIsModalShow(true)}
             >Edit Profile
        </button>
        {
            isModalShow &&
            <form action={action} className="flex z-50 flex-col bg- fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 gap-6 bg-[#a3b2c6] px-10 py-12 rounded w-[380px] sm:w-[480px] md:w-[550px]">
                <div className="flex justify-between gap-2 w-full items-center flex-wrap">
                    <label htmlFor="fname">First Name: </label>
                    <input
                        type="text"
                        name="firstname"
                        value={profInfo.fname}
                        onChange={(e) => setProfInfo({...profInfo, fname: e.target.value})}
                        id="fname"
                        placeholder="first name"
                        required
                        className="pl-2 bg-[#b8cdea] rounded p-2 box-border flex-grow h-12" />
                </div>
                <div className="flex justify-between gap-2 w-full items-center flex-wrap">
                    <label htmlFor="lname">Last Name </label>
                    <input
                        type="text"
                        name="lastname"
                        id="lname"
                        value={profInfo.lname}
                        onChange={(e) => setProfInfo({...profInfo, lname: e.target.value})}
                        placeholder="last name"
                        required
                        className="pl-2 bg-[#b8cdea] rounded p-2 box-border flex-grow h-12" />
                </div>
                <div className="flex justify-between gap-2 w-full items-center flex-wrap">
                    <label htmlFor="uname">Username: </label>
                    <input
                        type="text"
                        name="username"
                        id="uname"
                        value={profInfo.uname}
                        onChange={(e) => setProfInfo({...profInfo, uname: e.target.value})}
                        placeholder="username"
                        required
                        className="pl-2 bg-[#b8cdea] rounded p-2 box-border flex-grow h-12" />
                </div>
                <button className="py-3 px-5 hover:text-yellow-500 hover:opacity-75 w-full mt-6">Save Changes</button>
                {state.success === false && <span className='text-center mt-2 italic text-green-600 text-[14px]'>{state.message}</span>}
            </form>
        }

            <div
                onClick={()=>{
                    setIsModalShow(false)
                }}
                className={`
                    fixed right-0 top-0 w-screen z-20
                    min-h-screen bg-[#07283e] opacity-50
                    ${isModalShow ? "block" : "hidden"}
                    `}>
            </div>
    </>
  )
}

export default EditProfileInfo