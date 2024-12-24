import Link from "next/link"
import LoginForm from "../_lib/LoginForm"

export const  metadata = {
  title: "Login"
}

const Page = () => {
  return (
    <div className="w-full flex items-center flex-col">
      <h1 className="text-gray-900 mt-8">Sign In</h1>
      <LoginForm />
      <span className="text-gray-900">No account yet? <Link href="/register" className="no-underline text-white opacity-70 hover:opacity-100">Register</Link></span>
    </div>
  )
}

export default Page
