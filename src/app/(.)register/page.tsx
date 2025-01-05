import Link from "next/link"
import SignUpForm from "../_lib/SignUpForm"

export const metadata = {
  title: "Register"
}

const RegistrationPage = () => {
  return (
    <div className=" w-full flex justify-center z-20 h-full flex-auto mt-5 p-5 mb-20">
      <div className=" flex items-center bg-slate-900 bg-opacity-80 flex-col p-5">
        <br />
        <h1  className="text-white">Sign Up</h1>
        <SignUpForm />
        <span className="text-gray-900">Already Have One? <Link href="/login" className="no-underline text-white opacity-70 hover:opacity-100">Log in</Link></span>
      </div>
    </div>
  )
}

export default RegistrationPage