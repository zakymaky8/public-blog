"use client"

import { useActionState, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { deleteUserAction } from "@/actions/deleteAccount"
import { logUserOutAction } from "@/actions/logoutAction"

const DeleteAccount = ({userId}: {userId: string | undefined}) => {
  const [isDelOn, setIsDelOn] = useState(false)
  const router = useRouter();
  const actionWrapper = async () =>  await deleteUserAction(userId!)
  const [ state, formAction ] = useActionState(actionWrapper, { success: "", message: "", redirectUrl: "", data: "" } )

  if (!["", null].includes(state.redirectUrl)) {
      router.push(state.redirectUrl!)
  }
  if(state.success === false && state.redirectUrl === null ) {
      alert(state.message)
  }

  useEffect(() => {

    async function walkUserOut() {
      if (state.success === true) {
        await logUserOutAction()
        router.replace("/register");
      }
      state.success = ""
    }
    walkUserOut()
  }, [state, router]);

  return (
    <>
      <button type="button" className="bg-red-800 hover:bg-red-700 px-6 py-3 w-max" onClick={() => setIsDelOn(true)}>Delete My Account</button>
      {
        isDelOn &&
      <form
        action={formAction}
        className= {`fixed top-1/2 md:top-1/2 left-1/2 -translate-x-1/2
            -translate-y-1/2 z-20 bg-slate-700 rounded
            shadow-lg text-white p-6 flex flex-col gap-4`}
            >
        <p className="italic text-[15px]">Are you sure you wanted to end your account?</p>
        <div className="flex justify-between gap-6">
          <button type="button" onClick={() => setIsDelOn(false)} className="px-5 hover:opacity-70">Close</button>
          <button type="submit" className="bg-red-700 px-5 hover:opacity-70">Delete</button>
        </div>
      </form>
      }
      <div onClick={()=>setIsDelOn(false)} className={`fixed right-0 top-0 w-screen z-10 min-h-screen bg-[#07283e] opacity-50 ${(isDelOn) ? "block" : "hidden"}`}></div>
    </>
  )
}

export default DeleteAccount
