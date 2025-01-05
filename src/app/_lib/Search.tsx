"use client"

import { useState } from "react"


const Search = () => {
  const [key, setKey] = useState("");
  // const router = useRouter();
  // const pathname = usePathname()

  // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault()
  //   const token = getTokenFromCookies()
  //   const res = await fetch(`http:localhost:3456/serach?keyword=${key}`, {
  //     headers: {
  //       "authorization": `Bearer ${token}`,
  //       "content-type": "application/json"
  //     }
  //   })
  //   if (!res.ok) {
  //     router.replace(pathname)
  //   }
  // }
  return (
    <div>
        <form onSubmit={()=>{}} className="bg-slate-600 p-2">
            <div className="flex gap-1 items-center">
                <label htmlFor="key">Search: </label>
                <input
                    className="w-32 bg-slate-800 rounded-sm p-1 box-border"
                    type="search"
                    name="key"
                    value = {key}
                    onChange={(e) => setKey(e.target.value)}
                    id="key"
                    placeholder="search in blog"
                />
                <button type="submit">🔎</button>
            </div>
        </form>
    </div>
  )
}

export default Search