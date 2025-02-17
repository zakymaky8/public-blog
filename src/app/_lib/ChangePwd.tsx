"use client"

import { Dispatch, SetStateAction, useActionState, useState } from "react"
import { changeUserPassword } from "@/actions/changePassword"
import { useRouter } from "next/navigation"


type Props = {
    setShowPwdChange: Dispatch<SetStateAction<boolean>>,
    showPwdChange: boolean
}

const ChangePwd = ({setShowPwdChange}: Props) => {
    const [ value, setValue ] = useState("")
    const router = useRouter()

    const [ state, formAction ] = useActionState( changeUserPassword, { success: "", message: "", redirectUrl: "" } )

    if (state.success === false && ![null, ""].includes(state.redirectUrl)) {
        router.replace(state.redirectUrl!)
    }
    if (state.success === false) {
        alert(state.message)
    }

    if (state.success) {
        router.replace("/login")
    }
  return (
    <form
        action={formAction}
        className="bg-red-950 text-yellow-600 mb-6 mt-2 rounded-md p-2 flex flex-col items-center gap-4">
        <div>
            <label htmlFor="oldpwd">Old Password</label><br />
            <input
                className="w-[150px] focus:outline-none bg-transparent border-b-[1px] border-yellow-400 h-6"
                type="password"
                name="old_pwd"
                id="oldpwd" />
        </div>
        <div>
            <label htmlFor="newpwd">New Password</label><br />
            <input
                className="w-[150px] focus:outline-none bg-transparent border-b-[1px] border-yellow-400 h-6"
                type="password"
                name="new_pwd"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                id="newpwd"/>
        </div>
        <button type={value ? "submit" : "button"} onClick={() => value ? "" : setShowPwdChange(false)} className="text-green-400 font-bold p-1 bg-transparent text-[11px]">{value ? "Change" : "Collapse"}</button>

        {state.success !== "" && <span className="text-red-400 italic">{state.message}</span>}

    </form>
  )
}

export default ChangePwd
