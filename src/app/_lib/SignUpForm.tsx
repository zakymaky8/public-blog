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
          className="flex flex-wrap border-2 h-max p-8 gap-8 justify-center m-4 max-w-96 rounded-xl bg-slate-500">

        <div className="flex flex-col gap-4">
          <div>
            <label htmlFor="fname">First Name: </label>
            <input
                type="text"
                name="firstname"
                id="fname"
                placeholder="first name"
                required
                className="w-32 bg-slate-800 rounded-lg p-1 box-border" />
          </div>
          <div>
            <label htmlFor="lname">Last Name: </label>
            <input
                type="text"
                name="lastname"
                id="lname"
                placeholder="last name"
                required
                className="w-32 bg-slate-800 rounded-lg p-1 box-border" />
          </div>
        </div>
        <div  className="flex flex-col gap-4">
          <div>
            <label htmlFor="uname">Username: </label>
            <input
                type="text"
                name="username"
                id="uname"
                placeholder="username"
                required
                className="w-32 bg-slate-800 rounded-lg p-1 box-border" />
          </div>
          <div>
            <label htmlFor="pwd">Password: </label>
            <input
                type="password"
                name="password"
                id="pwd"
                placeholder="password"
                required
                className="w-32 bg-slate-800 rounded-lg p-1 box-border" />
          </div>
          <div>
            <label htmlFor="cpwd">Confirm Password: </label>
            <input
                type="text"
                name="confirm_password"
                id="cpwd"
                placeholder="confirm"
                required
                className="w-32 bg-slate-800 rounded-lg p-1 box-border" />
          </div>
          {
            !state.success && <span className="text-red-700 text-[12px] self-center italic">{state.message}</span>
          }
        </div>
        <button type="submit" className="self-end text-white">Register</button>
{/* 
        {
          valErr.length > 0 && 
            <ol>
              {valErr.map((err, index) => {
                return <li key={index} className="text-red-700 text-[12px] italic">{err}</li>
              })}
            </ol>
        } */}



      </form>
    )
  }
  
  export default SignUpForm