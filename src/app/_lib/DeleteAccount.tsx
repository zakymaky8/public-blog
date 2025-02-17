"use client"

import { useActionState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { deleteUserAction } from "@/actions/deleteAccount"
import { logUserOutAction } from "@/actions/logoutAction"

const DeleteAccount = ({userId}: {userId: string | undefined}) => {

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
    <form
        action={formAction}
        className="bg-red-800 rounded-md flex justify-center">
      <button type="submit" className="bg-red-800">Delete My Account</button>
    </form>
  )
}

export default DeleteAccount
