"use client"

import { SignUpAction } from "@/actions/createAccount";
import {  useRouter } from "next/navigation";
import { useActionState } from "react";


const SignUpForm = () => {
    const router = useRouter()

    const [state, formAction] = useActionState(SignUpAction, { success: "", message: "", redirectUrl: "", user: null })

    if (state.success && ![null, ""].includes(state.redirectUrl)) {
      router.replace(state.redirectUrl!)
    }

    return (
      <form
          action={formAction}
          className="flex flex-col border-2 h-max p-8 gap-8 justify-center m-4 min-w-72 rounded-xl bg-slate-500">

        <div className="flex flex-col gap-4 w-full">
          <div className="flex justify-between gap-2 w-full">
            <label htmlFor="fname">First Name: </label>
            <input
                type="text"
                name="firstname"
                id="fname"
                placeholder="first name"
                required
                className="text-[white] pl-2 bg-slate-800 rounded-lg p-1 box-border flex-grow h-10" />
          </div>
          <div className="flex justify-between gap-2 w-full">
            <label htmlFor="lname">Last Name: </label>
            <input
                type="text"
                name="lastname"
                id="lname"
                placeholder="last name"
                required
                className="text-[white] pl-2 bg-slate-800 rounded-lg p-1 box-border flex-grow h-10" />
          </div>
        </div>
        <div  className="flex flex-col gap-4 w-full">
          <div className="flex justify-between gap-2 w-full">
            <label htmlFor="uname">Username: </label>
            <input
                type="text"
                name="username"
                id="uname"
                placeholder="username"
                required
                className="text-[white] pl-2 bg-slate-800 rounded-lg p-1 box-border flex-grow h-10" />
          </div>
          <div className="flex justify-between gap-2 w-full">
            <label htmlFor="pwd">Password: </label>
            <input
                type="password"
                name="password"
                id="pwd"
                placeholder="password"
                required
                className="text-[white] pl-2 bg-slate-800 rounded-lg p-1 box-border flex-grow h-10" />
          </div>
          <div className="flex justify-between gap-2 w-full">
            <label htmlFor="cpwd">Confirm Password: </label>
            <input
                type="text"
                name="confirm_password"
                id="cpwd"
                placeholder="confirm"
                required
                className="text-[white] pl-2 bg-slate-800 rounded-lg p-1 box-border flex-grow h-10" />
          </div>
          {
            !state.success && <span className="text-red-700 text-[12px] self-center italic">{state.message}</span>
          }
        </div>
        <button type="submit" className="text-white bg-slate-800 hover:bg-slate-900 h-10">Register</button>

      </form>
    )
  }
  
  export default SignUpForm