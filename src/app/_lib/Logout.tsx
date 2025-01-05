"use client"

import { useRouter } from "next/navigation"

const Logout = () => {
    const router = useRouter();
     async function handleClick() {
        document.cookie = `token=${null}; path=/; secure`
        document.cookie = ``
        router.replace("/")
        await new Promise(() => setTimeout(() => window.location.reload(), 10))
    }
  return (
    <button onClick={handleClick} className="bg-red-800 hover:bg-red-500 text-white">Logout</button>
  )
}

export default Logout