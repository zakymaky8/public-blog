import Link from "next/link"
import RoleRequestForm from "./_cpts/RoleRequestForm"
import { getAccessToken } from "@/utils/server-only"
import { redirect } from "next/navigation"


const RoleRequestPage = async () => {

    const token = await getAccessToken()

    if (!token) {
        redirect("/login")
    }

  return (
    <section className="flex flex-col items-center py-8">
        <div className="w-[340px] sm:w-[450px] md:w-[500px] flex flex-col items-center gap-10">
            <h2 className="text-3xl text-center">Request Role</h2>
            <RoleRequestForm />

            <div className="self-start mt-32">
                <h4>Help</h4>
                <p>To ask what best suits you is the most recommended role.</p>
                <ul className="flex flex-col gap-2 text-sm">
                    <li><strong>Admin: </strong> This is a rarest role which requires extensive discussion with the super.</li>
                    <li><strong>Editor:</strong> Exclusive content supervisor but under the admin</li>
                    <li><strong>Creator:</strong> In this role user will have a contributor and author role who is to be supervised by the editor and admin but has full power on his works</li>
                </ul>
            </div>

            <div className="mt-10 flex justify-between w-full self-start gap-2">
                <Link href="/roles/my-requests" className="text-[18px] hover:underline">See Your Requests</Link>
                <Link href="/roles/open_roles" className="text-[18px] hover:underline">See Open Roles</Link>
            </div>
        </div>
    </section>
  )
}

export default RoleRequestPage