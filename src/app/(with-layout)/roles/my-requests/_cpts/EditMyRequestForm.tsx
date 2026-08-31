import { updateMyRoleRequestAction } from '@/actions/updateMyRoleRequestAction'
import { useRouter } from 'next/navigation'
import React, { Dispatch, SetStateAction, useActionState, useEffect, useState } from 'react'


type TProps = {
    contact: string,
    valueProp: string,
    role: string | ("ADMIN" | "EDITOR" | "CREATOR"),
    requestId: string,
    setIsShow: Dispatch<SetStateAction<boolean>>,
}



const EditMyRequestForm = ({ contact, valueProp, role, requestId, setIsShow }: TProps) => {

    const [cntct, setContact] = useState(contact ? contact : "")
    const [valProp, setValueProp] = useState(valueProp ? valueProp : "")
    const [rl, setRole] = useState(role ? role : "")

    const updateActionWrapper = (prevState: { success: boolean, message: string, redirectUrl: string | null }, formData: FormData) => {
        return updateMyRoleRequestAction(requestId, formData)
    }
        
    const [state, action] = useActionState(updateActionWrapper, { success: "", message: "", redirectUrl: "" })
    const router = useRouter()
    

    if(state.success === false && state.redirectUrl === null ) {
        alert(state.message)
    }

    useEffect(() => {
        if (state.success === true) {
            router.refresh();
            setIsShow(false)
        }
        state.success = ""
    }, [state, router]);


    
  return (
        <form
            action={action}
            className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 shadow-lg flex flex-col gap-8 bg-[#c8daf2] p-4 rounded w-[380px] sm:w-[500px] md:w-[600px] max-h-[90vh] overflow-y-scroll`}
        >

        <div className='flex flex-col gap-4'>
            <label htmlFor="role">Requested Role</label>
            <select
                required
                name="role"
                id="role"
                className='self-center p-2 rounded bg-[#b8cdea] w-full'
                value={rl}
                onChange={(e) => setRole(e.target.value)}
            >
                <option value="ADMIN">Admin</option>
                <option value="EDITOR">Editor</option>
                <option value="CREATOR">Creator</option>
            </select>
        </div>


        <div className='flex flex-col gap-4'>
            <label htmlFor="valueprop" className='cursor-pointer'>Value Proposition</label>
            <textarea
                name="value_proposition"
                required
                id="valueprop"
                cols={60}
                rows={10}
                value={valProp}
                onChange={(e) => setValueProp(e.target.value)}
                className='rounded focus:outline-none focus:border-[#c0c0c0] focus:border-[1px] p-4'
                placeholder='What is your unique expertise that makes you deserve the role?'
            ></textarea>
        </div>

        <div className='flex flex-col gap-4'>
            <label htmlFor="contact" className='cursor-pointer'>External Contact Method</label>
            <input
                name="contact"
                required
                id="contact"
                value={cntct}
                onChange={(e) => setContact(e.target.value)}
                className='rounded focus:outline-none focus:border-[#c0c0c0] focus:border-[1px] p-4'
                placeholder='Drop social usernames or links for chat with super admin'
            />
        </div>

        <button type="submit" className="text-white bg-slate-800 hover:bg-slate-900 mt-10 h-12 py-2 text-lg">Comfirm Edit</button>
        <span className={` ${state.success ? "text-green-700" : "text-red-700"} `}>{state.message}</span>

    </form>




  )
}

export default EditMyRequestForm