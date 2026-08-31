import LoginForm from "@/app/_lib/LoginForm"
import Image from "next/image"
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
      <div className="flex flex-col gap-[2px]">
        <div className="flex gap-10 items-center bg-slate-200 p-2 py-1 min-w-80 justify-start rounded w-max">
          <Image src={"/google.png"} width={20} height={20} alt="" />
          <span className="opacity-80 text-sm">Sign in with google</span>
        </div>
        <div className="flex gap-10 items-center bg-slate-200 p-2 py-1 min-w-80 justify-start rounded w-max">
          <Image src={"/google.png"} width={20} height={20} alt="" />
          <span className="opacity-80 text-sm">Sign up with google</span>
        </div>
      </div>
      <span className="text-gray-900 mt-12">No account yet? <Link href="/register" className="hover:opacity-70">Register</Link></span>
      <Link href="/" className="mt-16 hover:opacity-60 hover:underline mb-2">Back to Home</Link>
    </div>
  )
}

export default Page
