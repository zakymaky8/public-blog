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
      className="flex flex-col border-2 h-max p-8 gap-5 m-4 max-w-96 rounded-xl bg-slate-500">
      <div>
        <label htmlFor="uname">Username: </label>
        <input
          type="text"
          name="username"
          id="uname"
          required
          className="w-32 bg-slate-800 rounded-lg p-2 box-border"
          placeholder="username"
        />
      </div>
      <div className="relative">
        <label htmlFor="pwd">Password: </label>
        <input
          type={isPwdSeen ? "text" : "password"}
          name="password"
          id="pwd"
          required
          className="w-32 bg-slate-800 rounded-lg p-2 box-border"
          placeholder="password"
        />
        <span onClick={() => setIsPwdSeen(!isPwdSeen)} className={`${isPwdSeen ? "blur-[1px]" : "blur-none"} absolute right-1 top-1/2 -translate-y-1/2 cursor-pointer`}>👁️‍🗨️</span>
      </div>

      <button type="submit" className="text-white">Log in</button>
      {!state.success && <p className="text-[rgb(95,24,24)] italic text-sm self-center">{state.message}</p>}
      {state.success && <p className="text-[rgb(23,75,18)] italic text-sm self-center">{state.message}</p>}
    </form>
  );
};

export default LoginForm;
