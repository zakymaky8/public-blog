import { TAuthor } from './type'
import prp from "../../../public/person_icon.svg"

const InlineUserProfileInfo = ({ user }: { user: TAuthor }) => {
    const pp = user.profilePic ? JSON.parse(user.profilePic).secure_url : prp.src;
  return (
    <>
    <div className='flex flex-col w-[290px] sm:w-[340px] md:w-[400px] gap-4 bg-slate-900 text-gray-300 px-10 py-8 rounded fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30'>
        <div className="self-center">
            <img
                src={pp}
                alt="user pofile picture"
                className="h-[170px] cursor-pointer w-[190px] rounded-[50%] border-slate-700 border-[2px]"
            />
        </div>
        <div className='flex flex-col items-center'>
            <h3 className='m-0 mb-2 mt-6 text-[22px]'>{(user.firstname ?? "--") + " " + (user.lastname ?? "--")}</h3>
            <strong className='text-center italic font-light'>{user.username ?? "--"}</strong>
        </div>
    </div>
    </>
  )
}

export default InlineUserProfileInfo