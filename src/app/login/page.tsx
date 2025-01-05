import Link from "next/link"
import LoginForm from "../_lib/LoginForm"

export const  metadata = {
  title: "Login"
}

const Page = () => {
  return (
    <div className="w-full flex items-center flex-col mb-20">
      <h1 className="text-gray-900 mt-8">Sign In</h1>
      <LoginForm />
      <span className="text-gray-900">No account yet? <Link href="/register" className="hover:opacity-70">Register</Link></span>
    </div>
  )
}

export default Page
