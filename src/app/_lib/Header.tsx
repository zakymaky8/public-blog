/* eslint-disable @next/next/no-img-element */
"use client"

import Link from "next/link";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { TAuthor } from "./type";
import UserModal from "./UserModal";
import Image from "next/image";

import ham from "../../../public/ham.svg"
import close from "../../../public/close_icon.svg"
import { currentUser } from "@/actions/authAction";
import { FaExclamationCircle } from "react-icons/fa";

export default function Header() {
  const pathname = usePathname()
  const [userData, setUserData] = useState<TAuthor>();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isShow, setIsShow] = useState(false)
  const [menuShow, setMenuShow] = useState(false)
  const isActive = (str: string) => pathname.includes(str)


  useEffect(() => {
    const IsUserLoggedIn = async () => {
      const { success, user } = await currentUser();
      if (success) {
        console.log(user)
        setIsLoggedIn(true)
        setUserData(user)
      } else {
        setIsLoggedIn(false)
      }
    }

    IsUserLoggedIn()

  },[])
  
  return (
    <div className="flex justify-between items-center min-h-28 bg-[#040f28] shadow-inner p-4 flex-wrap gap-4">
        <h1> <Link className="text-4xl text-gray-300 no-underline" href="/"> Tip Logger</Link></h1>

        <button className={`bg-yellow-500 z-20 ${menuShow ? "fixed right-4" : ""}`} id="hamburger" onClick={()=>setMenuShow(!menuShow)}>
          <Image src={menuShow ? close : ham} className="h-8 w-8" alt="menu"/>
        </button>

        <nav
          className={`navsm flex -right-1 fixed
                    self-center top-[20%] items-center
                    justify-center w-[96%] gap-9 py-10 px-3
                    bg-blue-950  z-20 transition-transform
                    duration-1000 ${menuShow ? "translate-x-0" : "translate-x-[100%]" } `}
          style={{boxShadow: "3px 2px 6px 0px black"}}
          >

          <Link onClick={()=>setMenuShow(false)} className={`text-white ${pathname === "/" ? "text-yellow-500 border-b-2 border-yellow-500" : ""} hover:text-yellow-500`} href="/">Home</Link>
          {isLoggedIn && <Link onClick={()=>setMenuShow(false)} className={`text-white ${isActive("/blog") ? "text-yellow-500 border-b-2 border-yellow-500" : ""} hover:text-yellow-500`} href="/blog">Blogs</Link>}
          {isLoggedIn && <Link
              href="/suggestions/your-suggestions"
              onClick={()=>setMenuShow(false)}
              className={`hover:text-yellow-500 ${isActive("/suggestions") ? "text-yellow-500 border-b-2 border-yellow-500" : ""} self-center text-white`}>
                Suggest Topic
          </Link>}
          {!isLoggedIn && <Link onClick={()=>setMenuShow(false)} className={`text-white  hover:text-yellow-500 ${isActive("/login") ? "text-yellow-500  border-b-2 border-yellow-500" : ""}`} href="/login">Get In</Link>}
          {isLoggedIn && (
           userData?.profilePic ?
            <div className="relative">
              <img
                src={JSON.parse(userData.profilePic).secure_url}
                alt="profile picture"
                className="rounded-[50%] cursor-pointer w-12 h-12"
                onClick={() => setIsShow(!isShow)}
              />
              {userData?.isWarned && <FaExclamationCircle className="absolute -top-3 hover:text-yellow-300 right-0 text-yellow-400" title="warned" size={24} />}
            </div> :
            <div className="relative">
              <button onClick={() => setIsShow(!isShow)} className="text-3xl rounded-[50%] p-1">🧑‍🦱</button>
              {userData?.isWarned && <FaExclamationCircle className="absolute -top-3 hover:text-yellow-300 right-0 text-yellow-400" title="warned" size={24} />}
            </div>)
          }

          {isShow && <UserModal setMenuShow={setMenuShow} setIsLoggedIn={setIsLoggedIn} setIsShow={setIsShow} userData={userData}/>}

        </nav>

      {/*  large device navigation */}

        <div
            onClick={()=>{
              setMenuShow(false)
              setIsShow(false)
            }}
            className={`
                fixed right-0 top-0 w-screen z-10
                min-h-screen bg-[#07283e] opacity-50
                ${(menuShow || isShow) ? "block" : "hidden"}
              `}>
        </div>


        <nav className="navbar relative flex gap-10 items-center justify-between flex-wrap">
            <Link
              href="/"
              className={`${pathname === "/" ? "text-yellow-500 border-b-2 border-yellow-500" : ""} self-center text-gray-400`}>
                <button className="bg-transparent hover:text-yellow-500"> Home </button>
            </Link>

            {isLoggedIn && <Link
              href="/blog"
              className={`${isActive("/blog") ? "text-yellow-500 border-b-2 border-yellow-500" : ""} self-center text-gray-400`}>
                <button className="bg-transparent hover:text-yellow-500">Blogs</button>
            </Link>}
            {isLoggedIn && <Link
              href="/suggestions/your-suggestions"
              onClick={()=>setMenuShow(false)}
              className={`${isActive("/suggestions") ? "text-yellow-500 border-b-2 border-yellow-500" : ""} self-center text-gray-400`}>
                <button className="bg-transparent hover:text-yellow-500">Suggest Topic</button>
            </Link>}
            {
              !isLoggedIn &&
                <Link
                  href="/login"
                  className={`${isActive("/login") ? "text-yellow-500  border-b-2 border-yellow-500" : ""} self-center text-gray-400`}>
                    <button className="bg-transparent hover:text-yellow-500"> Get In </button>
                </Link>
            }

            {
              isLoggedIn &&
              ( userData?.profilePic ?
                <>
                  <img
                    src={JSON.parse(userData.profilePic).secure_url}
                    alt="profile picture"
                    className="rounded-[50%] cursor-pointer w-12 h-12"
                    onClick={() => setIsShow(!isShow)}
                  />
                  {userData?.isWarned && <FaExclamationCircle className="absolute -top-3 hover:text-yellow-300 right-0 text-yellow-400" title="warned" size={24} />}
                </>:
                <div className="relative">
                  <button onClick={() => setIsShow(!isShow)} className="relative text-3xl rounded-[50%] p-1">🧑‍🦱</button>)
                  {userData?.isWarned && <FaExclamationCircle className="absolute -top-3 hover:text-yellow-300 right-0 text-yellow-400" title="warned" size={24} />}
                </div>
              )
            }
            {
              isShow && <UserModal setMenuShow={setMenuShow} setIsShow={setIsShow} userData={userData} setIsLoggedIn={setIsLoggedIn}/>
            }

        </nav>
    </div>
  )
}
