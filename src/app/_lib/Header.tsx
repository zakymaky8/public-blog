"use client"

import Link from "next/link";

import { usePathname } from "next/navigation";
import { getTokenFromCookies } from "./utils";
import { useEffect, useState } from "react";
import { TAuthor } from "./type";
import UserModal from "./UserModal";

export default function Header() {
  const pathname = usePathname()
  const [userData, setUserData] = useState<TAuthor>();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isShow, setIsShow] = useState(false)
  const isActive = (str: string) => pathname.includes(str)

  useEffect(() => {
    const getUser = async function() {
      const token = getTokenFromCookies();
      const res = await fetch("http://localhost:3456/current_user", {
        headers: {
          "authorization": `Bearer ${token}`,
          "content-type": "application/json"
        }
      })
      if (!res.ok) {
        setIsLoggedIn(false)
      }
      const { user } = await res.json()
      setIsLoggedIn(true)
      setUserData(user)
    }
    getUser()
  }, [])
  return (
    <div className="flex justify-between items-center min-h-28 bg-[#040f28] shadow-inner p-4 flex-wrap gap-4">
        <h1> <Link className="text-4xl text-gray-300 no-underline" href="/"> Tip Logger</Link></h1>
        {/* <Search /> */}
        <nav className="flex gap-1 items-center justify-between flex-wrap">
            <Link
              href="/"
              className={`hover:text-gray-100 ${pathname === "/" ? "text-yellow-500 border-b-2 border-yellow-500" : ""} self-center text-gray-400`}>
                <button className="bg-transparent"> Home </button>
            </Link>

            <Link
              href="/blog"
              className={`hover:text-gray-100 ${isActive("/blog") ? "text-yellow-500 border-b-2 border-yellow-500" : ""} self-center text-gray-400`}>
                <button className="bg-transparent">Blogs</button>
            </Link>
            <Link
              href="/about"
              className={`hover:text-gray-100 ${isActive("/about") ? "text-yellow-500 border-b-2 border-yellow-500" : ""} self-center text-gray-400`}>
                <button className="bg-transparent"> About </button>
            </Link>

            {
              !isLoggedIn && 
                <Link
                  href="/login"
                  className={`hover:text-gray-100 ${isActive("/login") ? "text-yellow-500  border-b-2 border-yellow-500" : ""} self-center text-gray-400`}>
                    <button className="bg-transparent"> Get In </button>
                </Link>
            }

            {
              isLoggedIn && <button onClick={() => setIsShow(!isShow)} className="text-3xl rounded-[50%] p-1">🧑‍🦱</button>
            }
            {
              isShow && <UserModal setIsShow={setIsShow} userData={userData}/>
            }

        </nav>
    </div>
  )
}


// create branch called develop
// create another feature branch
// work on any thing