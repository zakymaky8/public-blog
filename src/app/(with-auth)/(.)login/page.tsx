import LoginForm from "@/app/_lib/LoginForm"
import Link from "next/link"

const Page = () => {
  return (
    <div className="w-full flex justify-center z-20 h-full flex-auto mt-16 p-5 mb-20">
      <div className="flex items-center bg-slate-900 bg-opacity-80 flex-col p-5">
        <h1 className="text-white mt-8">Sign In</h1>
        <LoginForm />
        <div className="text-gray-400 text-[14px]">No account yet? <Link href="/register" className="text-white opacity-70 hover:opacity-100">Register</Link></div>
      </div>
    </div>
  )
}

export default Page
