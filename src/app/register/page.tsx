import Link from "next/link"
import SignUpForm from "../_lib/SignUpForm"

export const metadata = {
  title: "Register"
}

const RegistrationPage = () => {
  return (
    <div className="w-full flex items-center flex-col">
        <br />
        <h1  className="text-gray-900">Sign Up</h1>
        <SignUpForm />
        <span className="text-gray-900">Already Have One? <Link href="/login">Log in</Link></span>
    </div>
  )
}

export default RegistrationPage