/* eslint-disable @next/next/no-img-element */
"use client"
import ppplaceholder from "../../../../../public/person_icon.svg"

import { TAuthor } from "@/app/_lib/type"
import { updateProfileAction } from "@/actions/updateProfile"
import { useRouter } from "next/navigation"

const ProfilePic = ({ user }: { user: TAuthor }) => {
    const router = useRouter()

    const handleProfilePic = async (e: React.ChangeEvent<HTMLInputElement>) => {

          const formdata = new FormData(e.target.form!);

          const { success } = await updateProfileAction(formdata);

          if (typeof success === "boolean") {
            router.refresh()
          }
      };
      const pp = user.profilePic ?  JSON.parse(user.profilePic) : null;

  return (
    <form encType="multipart/form-data">
        <label htmlFor="user_profile" className="bg-slate-600" title="Update Avatar">
            <img
                src={pp ? pp.secure_url : (ppplaceholder.src)}
                alt="user pofile picture"
                className="h-[160px] cursor-pointer w-[180px] rounded-[50%] border-slate-700 border-[2px] hover:border-none hover:opacity-70"
            />
        </label>
        <input onChange={handleProfilePic} type="file"  accept=".jpg, .jpeg, .png" name="profilePic" id="user_profile" className="hidden" />
    </form>
  )
}

export default ProfilePic