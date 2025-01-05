"use client"

import { Dispatch, FormEvent, SetStateAction, useState } from "react"
import { getTokenFromCookies } from "./utils"


type Props = {
    setShowPwdChange: Dispatch<SetStateAction<boolean>>,
    showPwdChange: boolean
}

const ChangePwd = ({setShowPwdChange}: Props) => {
    const [err, setError] = useState("");
    const [message, setMessage] = useState("");
    const [ value, setValue ] = useState("")

    const handleSubmit = async function(e:FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formdata = new FormData(e.target as HTMLFormElement);
        const userInps = {
            oldpwd: formdata.get("old_pwd"),
            newpwd: formdata.get("new_pwd")
        }
        const token = getTokenFromCookies();

        const res = await fetch(`http://localhost:3456/user/change_password`, {
            method: "PUT",
            headers: {
                "authorization": `Bearer ${token}`,
                "content-type": "application/json"
            },
            body: JSON.stringify(userInps)
        })
        if (!res.ok) {
            const { error } = await res.json();
            setError(error)
            setTimeout(() => setError(""), 3000)
        }
        else {
            const { message } = await res.json();
            setMessage(message)
            setTimeout(() => setMessage(""), 3000)
        }
    }
  return (
    <form
        onSubmit={handleSubmit}
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

        <span className="text-red-400 italic">{err? err : message ? message : ""}</span>
    </form>
  )
}

export default ChangePwd
