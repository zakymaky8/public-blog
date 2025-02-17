"use client"

import { logUserOutAction } from "@/actions/logoutAction";
import { useRouter } from "next/navigation"
import { Dispatch, SetStateAction } from "react";

type TProps = {
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>
}


const Logout = ({ setIsLoggedIn }: TProps) => {
    const router = useRouter();
  return (
    <button
        onClick={()=>{
          logUserOutAction()
          setIsLoggedIn(false)
          router.replace("/login", { scroll: false })
        }}
        className="bg-red-800 hover:bg-red-500 text-white"
        >Logout
    </button>
  )
}

export default Logout