"use client";

import { SignUserInAction } from "@/actions/authAction";
import { useRouter } from "next/navigation";
import { useActionState, useState } from "react";


const LoginForm = () => {
  const router = useRouter()
  const [isPwdSeen, setIsPwdSeen] = useState(false)

  const [ state, formAction ] = useActionState(SignUserInAction, { success: "", message: "", redirectUrl: "" })

  if (state.success && !["", null].includes(state.redirectUrl) ) {
    router.push(state.redirectUrl!)
  }

  return (
    <form
      action={formAction}
      className="flex flex-col justify-between border-2 h-max p-6 gap-5 m-4 min-w-80 rounded-xl bg-slate-500">
      <div className="flex justify-between gap-2 items-center">
        <label htmlFor="uname">Username: </label>
        <input
          type="text"
          name="username"
          id="uname"
          required
          className="w-32 bg-slate-800 rounded-lg p-2 box-border h-10 flex-grow text-[white]"
          placeholder="username"
        />
      </div>
      <div className="relative flex justify-between gap-2 items-center">
        <label htmlFor="pwd">Password: </label>
        <input
          type={isPwdSeen ? "text" : "password"}
          name="password"
          id="pwd"
          required
          className="w-32 bg-slate-800 rounded-lg p-2 box-border h-10 flex-grow text-[white]"
          placeholder="password"
        />
        <span onClick={() => setIsPwdSeen(!isPwdSeen)} className={`${isPwdSeen ? "blur-[1px]" : "blur-none"} absolute right-1 top-1/2 -translate-y-1/2 cursor-pointer`}>👁️‍🗨️</span>
      </div>

      <button type="submit" className="text-white bg-slate-800 hover:bg-slate-900 mt-10 h-10">Log in</button>
      {state.success === false && <p className="text-[rgb(95,24,24)] italic text-sm self-center">{state.message}</p>}
      {state.success === true && <p className="text-[rgb(23,75,18)] italic text-sm self-center">{state.message}</p>}
    </form>
  );
};

export default LoginForm;
