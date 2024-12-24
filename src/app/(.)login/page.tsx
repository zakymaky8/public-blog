import Link from "next/link"
import LoginForm from "../_lib/LoginForm"

const Page = () => {
  return (
    <div className="relative w-full flex justify-center z-20 h-full flex-auto mt-5 p-5">
      <div className="absolute flex items-center bg-slate-900 bg-opacity-80 flex-col p-5">
        <h1 className="text-gray-900 mt-8">Sign In</h1>
        <LoginForm />
        <span className="text-gray-900">No account yet? <Link href="/register" className="no-underline text-white opacity-70 hover:opacity-100">Register</Link></span>
      </div>
    </div>
  )
}

export default Page
