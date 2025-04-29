import { TAuthor, TSuggestions } from "@/app/_lib/type"
import SuggestionCard from "./SuggestionCard"
import Link from "next/link"



const SuggestionLists = ({ suggestions, users, type }: {suggestions: TSuggestions[], users: TAuthor | TAuthor[], type: "self" | "others"}) => {
  return (
    <div className="flex flex-col gap-4 mb-20">
        {
          suggestions.length > 0 ?
          suggestions.map(suggestion => {
            const user = type === "self" ? users as TAuthor : (users as TAuthor[]).find(user => user.users_id === suggestion.user_id);
            return <SuggestionCard key={suggestion.suggns_id} suggestion={suggestion} user={user!} type={type} />
          }) :
          <div className="ml-auto text-center flex flex-col  gap-4 p-10 text-black italic mb-32">
            <p className="text-center opacity-70 text-[14px]">No Suggestions {type==="others" && "by others"} yet!</p>
            {type === "self" && <Link href="/suggestions/new-suggestion"><button className="text-[13px] hover:opacity-80 hover:text-yellow-500">Create One</button></Link>}
      </div>
        }
    </div>
  )
}

export default SuggestionLists