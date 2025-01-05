"use client"

import { useRouter } from "next/navigation";
import { FormEvent } from "react";

// import { useEffect, useState } from "react"

const SignUpForm = () => {
  const router = useRouter()
  async function handleSubmit(e:FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const userData = {
      firstname: formData.get("firstname"),
      lastname: formData.get("lastname"),
      username: formData.get("username"),
      password: formData.get("password"),
      confirm_password: formData.get("confirm_password"),
    }

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
                className="w-32 bg-slate-800 rounded-lg p-1 box-border" />
          </div>
          <div>
            <label htmlFor="lname">Last Name: </label>
            <input
                type="text"
                name="lastname"
                id="lname"
                placeholder="last name"
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
                className="w-32 bg-slate-800 rounded-lg p-1 box-border" />
          </div>
          <div>
            <label htmlFor="pwd">Password: </label>
            <input
                type="password"
                name="password"
                id="pwd"
                placeholder="password"
                className="w-32 bg-slate-800 rounded-lg p-1 box-border" />
          </div>
          <div>
            <label htmlFor="cpwd">Confirm Password: </label>
            <input
                type="text"
                name="confirm_password"
                id="cpwd"
                placeholder="confirm"
                className="w-32 bg-slate-800 rounded-lg p-1 box-border" />
          </div>

        </div>
        <button type="submit" className="self-end text-white">Register</button>
      </form>
    )
  }
  
  export default SignUpForm