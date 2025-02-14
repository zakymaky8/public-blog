"use client"

import Link from "next/link";

import { usePathname } from "next/navigation";
import { getTokenFromCookies } from "./utils";
import { useEffect, useState } from "react";
import { TAuthor } from "./type";
import UserModal from "./UserModal";
import Image from "next/image";

import ham from "../../../public/ham.svg"
import close from "../../../public/close_icon.svg"

export default function Header() {
  const pathname = usePathname()
  const [userData, setUserData] = useState<TAuthor>();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isShow, setIsShow] = useState(false)
  const [menuShow, setMenuShow] = useState(false)
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

        <button className={`bg-yellow-500 z-20 ${menuShow ? "fixed right-4" : ""}`} id="hamburger" onClick={()=>setMenuShow(!menuShow)}>
          <Image src={menuShow ? close : ham} className="h-8 w-8" alt="menu"/>
        </button>

        <nav className={`navsm flex -right-1 fixed self-center top-[20%] items-center justify-center w-[95%] gap-10 py-10 bg-blue-950  z-20 transition-transform duration-1000 ${menuShow ? "translate-x-0" : "translate-x-[100%]" } `} style={{boxShadow: "3px 2px 6px 0px black"}}>
          <Link onClick={()=>setMenuShow(false)} className={`text-white ${pathname === "/" ? "text-yellow-500 border-b-2 border-yellow-500" : ""} hover:text-yellow-500`} href="/">Home</Link>
          <Link onClick={()=>setMenuShow(false)} className={`text-white ${isActive("/blog") ? "text-yellow-500 border-b-2 border-yellow-500" : ""} hover:text-yellow-500`} href="/blog">Blogs</Link>
          {/* <Link onClick={()=>setMenuShow(false)} className={`text-white hover:text-yellow-500 ${isActive("/about") ? "text-yellow-500 border-b-2 border-yellow-500" : ""}`} href="/about">About</Link> */}
          {!isLoggedIn && <Link onClick={()=>setMenuShow(false)} className={`text-white  hover:text-yellow-500 ${isActive("/login") ? "text-yellow-500  border-b-2 border-yellow-500" : ""}`} href="/login">Get In</Link>}
          {isLoggedIn && <button onClick={() => setIsShow(!isShow)} className="text-3xl rounded-[50%] p-1">🧑‍🦱</button>}
          {isShow && <UserModal setIsShow={setIsShow} userData={userData}/>}
        </nav>
        <nav className="navbar flex gap-1 items-center justify-between flex-wrap">
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
            {/* <Link
              href="/about"
              className={`hover:text-gray-100 ${isActive("/about") ? "text-yellow-500 border-b-2 border-yellow-500" : ""} self-center text-gray-400`}>
                <button className="bg-transparent"> About </button>
            </Link> */}

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