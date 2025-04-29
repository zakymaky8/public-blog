"use client"

import { changeUserPassword } from "@/actions/changePassword";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";


const ChangePassword = () => {
    const [showPwdChange, setShowPwdChange]= useState(false);
    const [oldvalue, setOldValue] = useState("")
    const [newvalue, setNewValue] = useState("")

    const router = useRouter()

    const [ state, formAction ] = useActionState( changeUserPassword, { success: "", message: "", redirectUrl: "" } )

    useEffect(() => {
        if (state.success === false && ![null, ""].includes(state.redirectUrl)) {
            router.replace(state.redirectUrl!)
        }
        if (state.success === true) {
            router.refresh()
            setOldValue("")
            setNewValue("")
            setShowPwdChange(false)
            state.success = ""
        }
    }, [state.success])

  return (
    <>
        <button className={`text-yellow-600 py-[10px] hover:text-yellow-300 bg-slate-900`} onClick={() => setShowPwdChange(true)}>Change Password</button>
        {
            showPwdChange &&
            <form
            action={formAction}
                className="bg-red-950 py-8 pb-4 shadow-lg z-20 w-[300px] sm:w-[450px] md:w-[500px] text-yellow-600 rounded px-10 flex flex-col items-center gap-12 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="flex flex-col gap-1">
                    <label htmlFor="oldpwd">Old Password</label><br />
                    <input
                        className="focus:outline-none bg-transparent border-b-[1px] border-yellow-400 h-9"
                        type="password"
                        name="old_pwd"
                        id="oldpwd"
                        placeholder="********"
                        value={oldvalue}
                        onChange={(e) => setOldValue(e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="newpwd">New Password</label><br />
                    <input
                        className="focus:outline-none bg-transparent border-b-[1px] border-yellow-400 h-9"
                        type="password"
                        name="new_pwd"
                        placeholder="********"
                        value={newvalue}
                        onChange={(e) => setNewValue(e.target.value)}
                        id="newpwd"
                    />
                </div>
                <button type={(newvalue && oldvalue) ? "submit" : "button"} onClick={() => (newvalue && oldvalue) ? "" : setShowPwdChange(false)} className="text-green-400 font-bold p-1 bg-transparent text-[14px] hover:opacity-70 mt-4">{(newvalue && oldvalue) ? "Change" : "Close"}</button>

            {state.success !== "" && <span className="text-red-400 italic text-[12px]">{state.message}</span>}

        </form>
        }
    <div
        onClick={()=>{
            setShowPwdChange(false)
        }}
        className={`
            fixed right-0 top-0 w-screen z-10
            min-h-screen bg-[#07283e] opacity-50
            ${showPwdChange ? "block" : "hidden"}
            `}>
    </div>
    </>
  )
}

export default ChangePassword
