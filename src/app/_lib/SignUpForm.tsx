"use client"

import { validateRegistration } from "@/actions/form-validation";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";


const SignUpForm = () => {
  const router = useRouter()
  const [valErr, setValErr] = useState<string[]>([])

  async function handleSubmit(e:FormEvent<HTMLFormElement>) {

    e.preventDefault();
    
    const formData = new FormData(e.target as HTMLFormElement);

    const { errors, userData } = await validateRegistration(formData);

    if (errors.length > 0) {
      setValErr([...errors]);
      return false;
    }
    else {
      try {
        const response =  await fetch(`http://localhost:3456/register`, {
          headers: {
            "content-type": "application/json"
          },
          method: "POST",
          body: JSON.stringify(userData)
        });
  
        if (!response.ok) {
          router.replace("/register")
        }
        else {
          router.replace("/login")
  
        }
  
      } catch {
        throw new Error("Failed to register user!")
      }
    }
  }
    return (
      <form onSubmit={handleSubmit} className="flex flex-wrap border-2 h-max p-8 gap-8 justify-center m-4 max-w-96 rounded-xl bg-slate-500">

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

        </div>
        <button type="submit" className="self-end text-white">Register</button>
        {valErr.length > 0 && 
            <ol>
              {valErr.map((err, index) => {
                return <li key={index} className="text-red-700 text-[12px] italic">{err}</li>
              })}
            </ol>
            }
      </form>
    )
  }
  
  export default SignUpForm