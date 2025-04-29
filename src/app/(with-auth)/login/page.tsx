import LoginForm from "@/app/_lib/LoginForm"
import Link from "next/link"


export const  metadata = {
  title: "Login"
}

const Page = () => {
  return (
    <div className="w-full flex items-center flex-col flex-auto mt-16">

      <h1 className="text-gray-900 mt-8">Sign In</h1>
      <LoginForm />
      <span className="text-gray-900">No account yet? <Link href="/register" className="hover:opacity-70">Register</Link></span>
    </div>
  )
}

export default Page
