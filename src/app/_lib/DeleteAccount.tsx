"use client"

import { FormEvent } from "react"
import { getTokenFromCookies } from "./utils"
import { useRouter } from "next/navigation"

const DeleteAccount = ({userId}: {userId: string| undefined}) => {
    const router = useRouter();

    async function handleSubmit(e:FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const confirmed = confirm("are you sure You wanted to delete user?")

        if (confirmed) {
            const token = getTokenFromCookies()

            const res= await fetch(`http://localhost:3456/user/${userId}?action=delete-account`, {
                method: "DELETE",
                headers: {"authorization": `Bearer ${token}`}
            });
            if (!res.ok) {
                alert("Unable to delete!")
            } else {
                document.cookie = `token=${null}; path=/; secure`
                document.cookie = ``
                router.replace("/register")
                await new Promise(() => setTimeout(() => window.location.reload(), 1000))
            }
        }
        else alert("deletion canceled")
    }
  return (
    <form onSubmit={handleSubmit} className="bg-red-800 rounded-md flex justify-center">
      <button className="bg-red-800">Delete My Account</button>
    </form>
  )
}

export default DeleteAccount
