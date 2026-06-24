import LoginForm from "@/app/_lib/LoginForm"
import Link from "next/link"


export const  metadata = {
  title: "Login"
}

const Page = () => {
  return (
    <div className="w-full flex items-center flex-col flex-auto mt-16">
      <Link href="/"><h2 className="text-white text-3xl bg-[#040f28]  p-6 rounded-[10px]">Tip Logger</h2></Link>
      <h2 className="text-gray-900 mt-8">Sign In</h2>
      <LoginForm />
      <span className="text-gray-900">No account yet? <Link href="/register" className="hover:opacity-70">Register</Link></span>
      <Link href="/" className="mt-16 hover:opacity-60 hover:underline">Back to Home</Link>
    </div>
  )
}

export default Page
