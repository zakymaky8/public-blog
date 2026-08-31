import { fetchMyRequests } from '@/actions/fetches'
import Inconvienence from '@/app/_lib/Inconvienence'
import { decideWhichFormat } from '@/app/_lib/utils'
import { getAccessToken } from '@/utils/server-only'
import { TRequest } from '@/utils/types'
import { redirect } from 'next/navigation'
import React from 'react'
import DeleteRoleRequestButton from './_cpts/DeleteMyRequest'
import EditRoleReqButton from './_cpts/EditRoleReqButton'

const MyRequestsPage = async () => {
    const token = await getAccessToken()
    if (!token) {
      redirect("/login")
    }
    const myReqRes = await fetchMyRequests()

    const { data, message, redirectUrl, success } = myReqRes;

    if (!success && redirectUrl !== null) redirect(redirectUrl)
    if (!success) {
        return (
          <Inconvienence message={ message } />
        )
    }
// yemotut kehiwet fida beteamr danu


  return (
    <section className="flex flex-col items-center py-8">
        <div className="flex flex-col items-center gap-10">
            <h2 className="text-3xl text-center">My Requests</h2>
            <ul className='flex flex-wrap gap-10'>
              { data.map((request: TRequest) => {
                return (
                <li key={request.request_id} className="w-[340px] sm:w-[450px] md:w-[740px] shadow p-4 px-6 rounded flex flex-col gap-5 bord  justify-between border-[#898989] border-[1px]">
                    <div className="flex justify-between items-center">
                        <h3>{ request.role.name }</h3>
                        <span className={`text-sm ${ request.status === "APPROVED" ? 'text-green-700' : request.status === 'REJECTED' ? 'text-red-700'  : 'text-gray-500' }`}>{ request.status ?? "Pending" }</span>
                    </div>
                    {/* <span>Current: {  }</span> */}
                    <div className="text-[10pt] flex flex-col gap-4">
                      <div>
                        <p style={{lineHeight: 1.5}}><strong>Value Proposed:</strong> { request.value_proposition }</p>
                        <p><strong>Contact Note:</strong> { request.contact }</p>
                      </div>
                      <div className='flex justify-between'>
                        <span className="text-slate-600"> Created: { decideWhichFormat(request.createdAt)}</span>
                        <span className="text-slate-600"> Updated: { decideWhichFormat(request.updatedAt)}</span>
                      </div>
                      <div className='flex justify-between mt-5'>
                        <EditRoleReqButton status={ request.status } contact={request.contact} requestId={request.request_id} role={request.role.name} valueProp={request.value_proposition} />
                        <DeleteRoleRequestButton requestId={request.request_id} />
                      </div>
                    </div>
                </li>
                )
              }) }
            </ul>
        </div>
    </section>
  )
}

export default MyRequestsPage