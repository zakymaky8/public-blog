"use client"


import { useActionState } from 'react'
import { createRoleRequest } from '@/actions/createRoleRequest'
import { useRouter } from 'next/navigation'

const RoleRequestForm = () => {
    const router = useRouter()

    const [ state, formAction ] = useActionState(createRoleRequest, { success: null, message: "", redirectUrl: "" })


    if (state.success && ![null, ""].includes(state.redirectUrl)) {
      router.replace(state.redirectUrl!)
    }

  return (
    <form className='self-start flex flex-col gap-10' action={formAction}>
        <div className="flex flex-col gap-2">
            <h4 className='font-medium mb-2'>Pick The Role You are Requesting </h4>
            <div className="flex gap-2 text-[#061e88]">
                <input type="radio" id="admin" name="role" className="h-4 w-4" value="ADMIN" />
                <label htmlFor="admin" className='cursor-pointer'>Admin</label>
            </div>

            <div className="flex gap-2 text-[#061e88]">
                <input type="radio" id="editor" name="role" className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" value="EDITOR" />
                <label htmlFor="editor" className='cursor-pointer'>Editor</label>
            </div>

            <div className="flex gap-2 text-[#061e88]">
                <input type="radio" name="role" id="creator" className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" value="CREATOR" />
                <label htmlFor="creator" className='cursor-pointer'>Creator</label>
            </div>
        </div>

        <div className='flex flex-col gap-4'>
            <label htmlFor="valueprop" className='cursor-pointer'>Provide Value Proposition</label>
            <textarea name="value_proposition" required id="valueprop" cols={60} rows={10} className='rounded focus:outline-none focus:border-[#c0c0c0] focus:border-[1px] p-4' placeholder='What is your unique expertise that makes you deserve the role?'></textarea>
        </div>

        <div className='flex flex-col gap-4'>
            <label htmlFor="contact" className='cursor-pointer'>External Contact Method</label>
            <input name="contact" required id="contact" className='rounded focus:outline-none focus:border-[#c0c0c0] focus:border-[1px] p-4' placeholder='Drop social usernames or links for chat with super admin' />
        </div>

        <button type="submit" className="text-white bg-slate-800 hover:bg-slate-900 mt-10 h-12 py-2 text-lg">Send Request</button>
        <span className={` ${state.success ? "text-green-700" : "text-red-700"} `}>{state.message}</span>
    </form>
  )
}

export default RoleRequestForm