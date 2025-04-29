/* eslint-disable @next/next/no-img-element */
import { TAuthor, TSuggestions } from "@/app/_lib/type"
import { cap, decideWhichFormat } from "@/app/_lib/utils"
import Link from "next/link"
import UpdateSugg from "./UpdateSugg"
import DeleteSugg from "./DeleteSugg";
import pp from  "../../../../../public/person_icon.svg"

const SuggestionCard = ({suggestion, user, type}: {suggestion: TSuggestions, user: TAuthor, type: "self" | "others"}) => {
  return (
    <div
        className="gap-3 bg-[#c8daff] min-h-fit max-h-max text-[#111827] rounded-md px-10 flex flex-col py-3 pb-4 max-w-[700px] mx-6"
        style={{boxShadow: "inset 0 0 18px 0 #111827"}}>
        <div className={`flex justify-between items-center gap-6  mt-2`}>
            {(type === "self" || (type === "others" && suggestion.isVisible)) ?
            <div className="flex gap-2 items-center">
              <img src={user.profilePic ? JSON.parse(user.profilePic).secure_url : pp.src} alt="profile picture" className="w-12 h-12 rounded-[50%]" />
              <h3 className="m-1">{cap(user.firstname??"--") + " " + cap(user.lastname ?? "--")}</h3>
            </div> :  <span className="opacity-70 italic my-2">Anonymouse User</span>
            }
            <span className="text-green-500">{cap(suggestion.status)}</span>
        </div>
        <div className="flex flex-col gap-0">
          <span className={`-mb-2 italic text-[10px] ${suggestion.priority === "HIGH" ? "text-green-500" : suggestion.priority === "MEDIUM" ? "text-yellow-600" : "text-red-500"}`}>{ cap(suggestion.priority) } priority</span>
          <p className="text-[15px]">{ suggestion.content }</p>
        </div>
        <div className="flex justify-between gap-6 items-end flex-wrap">
            <div className="flex gap-4 text-[12px] italic opacity-80">
                <span>Created: { decideWhichFormat(suggestion.createdAt) }</span>
                {suggestion.createdAt !== suggestion.updatedAt &&  <span className="text-green-600">Updated: {decideWhichFormat(suggestion.updatedAt)}</span>}
            </div>
            <div className="flex gap-2">
              { type ==="self" && (suggestion.status !== "ADDRESSED") && <UpdateSugg suggestion={suggestion} />}
              {type==="self" && <DeleteSugg suggestion={suggestion} />}
            </div>
            { suggestion.status === "ADDRESSED" &&
              <Link
                href={`/blog/${suggestion.postsToSugg.length === 1 ? suggestion.postsToSugg[0]: `/suggestions/posts-to-suggestion?suggetion_id=${suggestion.suggns_id}`}`}
                  ><button
                    className="text-yellow-500 hover:text-white py-[5px] px-2 text-[13px] w-max"
                     >See the Post
                  </button>
              </Link> }
        </div>
    </div>
  )
}

export default SuggestionCard