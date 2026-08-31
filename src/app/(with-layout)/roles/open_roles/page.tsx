import { fetchAllOpenRoles } from "@/actions/fetches";
import Inconvienence from "@/app/_lib/Inconvienence";
import { decideWhichFormat } from "@/app/_lib/utils";
import { getAccessToken } from "@/utils/server-only";
import { TOpenRole } from "@/utils/types";
import Link from "next/link"
import { redirect } from "next/navigation";



const RoleRequestPage = async () => {

    const token = await getAccessToken()

    if (!token) {
        redirect("/admin-login")
    }

    const { data:openRoles, message, redirectUrl, status, success } = await fetchAllOpenRoles();

    if (!success || !status) {
        return <Inconvienence message={ message } />
    }

    if (!success && (redirectUrl !== null)) {
        redirect(redirectUrl)
    }
  return (
    <section className="flex flex-col items-center py-8">
        <div className="w-[340px] sm:w-[450px] md:w-[500px] flex flex-col items-center gap-10">
            <h2 className="text-3xl text-center">Currently Available Roles</h2>
            <div className="flex justify-between flex-wrap gap-20">

                <div className="w-[340px] sm:w-[450px] md:w-[740px] flex flex-col items-center gap-10 text-black">


                    {
                        openRoles.length >= 1 ? openRoles.map( (openRole: TOpenRole) => {
                            return (
                                <div key={openRole.open_id} className="w-full shadow p-4 px-6 rounded flex flex-col justify-between gap-3 border-[#898989] border-[1px]">
                                    <div className="flex justify-between items-center">
                                        <h3 className='text-[22px] font-bold'>{ openRole.title }</h3>
                                        <span className={`text-[11px] ${ openRole.isActive ? "text-green-900" : "text-gray-700"} text-green-900`}>{ openRole.isActive ? "Available" : "Not Available" }</span>
                                    </div>
                                    <div className="flex flex-col self-start">
                                        <p>{ openRole.description }</p>
                                    </div>
                                    <p className='text-[12px]'><strong>Note: </strong>{ openRole.notes }</p>
                                    <div className="text-[10pt] flex justify-between items-center">
                                        <span><strong className="font-medium">Vacant Slots</strong>: <span className="text-slate-600">{ openRole.slots }</span></span>
                                        <span><strong className="font-medium">Role Needed:</strong> <span className="text-slate-600">{ openRole.role.name }</span></span>
                                    </div>
                                    <div className='flex text-[9pt] gap-7 mt-4'>
                                        <span className="text-slate-600"> Posted: { decideWhichFormat(openRole.createdAt)}</span>
                                        <span className="text-slate-600"> Updated: { decideWhichFormat(openRole.updatedAt)}</span>
                                    </div>
                                </div>
                            )
                        } )
                    : <p className='my-20 text-gray-600'>No Open Role Found</p>}
                </div>
             
                <Link href="/roles/role_request" className="text-white bg-slate-800 hover:bg-slate-900 mt-10 h-12 py-2 px-4 text-lg rounded">Request Role Now </Link>
            </div>


            <Link href="/open_roles"> </Link>
        </div>
    </section>
  )
}

export default RoleRequestPage