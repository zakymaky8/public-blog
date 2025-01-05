"use client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";


const LoginForm = () => {
  const router = useRouter()
  const [error, setError] = useState("");
  const [isPwdSeen, setIsPwdSeen] = useState(false)

  const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const loginData = {
      username: formData.get("username"),
      password: formData.get("password"),
    };

    try {
      const res = await fetch("http://localhost:3456/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (!res.ok) {
        setError("Invalid username or password");
        const errMsg:string = await new Promise(resolve => setTimeout(() => resolve(""), 3000))
        setError(errMsg)
        return;
      }

      const { token } = await res.json();
      document.cookie = `token=${token}; path=/; secure`

      router.replace("/blog")
      await new Promise(() => setTimeout(() => window.location.reload(), 500))

    } catch (err) {
      setError("An error occurred during login");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col border-2 h-max p-8 gap-5 m-4 max-w-96 rounded-xl bg-slate-500">
      {error && <p className="text-[rgb(95,24,24)] italic text-sm">{error}</p>}
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
  
    </form>
  );
};

export default LoginForm;
