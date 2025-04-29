import { redirect } from "next/navigation"
import Pagination from "@/app/_lib/Pagination"
import SuggestionLists from "../_lib/SuggestionsLists"
import { fetchSelfSuggestions } from "@/actions/fetches";
import { Metadata } from "next";

export  const metadata:Metadata = {
  title: "My Suggestions"
}

const YourSuggestionsPage = async ({searchParams}: { searchParams: Promise<{search: string, page: number, limit: number}> }) => {

  const { search, page, limit } = await searchParams;

  const { suggestions, success, redirectUrl, meta, user, message } = await fetchSelfSuggestions(search, page, limit)

  if (!["", null].includes(redirectUrl) && !success) {
      redirect(redirectUrl!)
  }

  if (!success) {
    return <div className="text-center flex flex-col items-center p-10 text-black italic ">
              <p className="opacity-60">{message}!</p>
          </div>
  }

  return (
    <div className="self-center flex flex-col gap-6 mt-6">
        <h3 className="text-center">Your Suggestions</h3>
        <SuggestionLists suggestions={suggestions} users={user} type="self" />
        <Pagination
            type="suggestion"
            currentPage={+meta.current_page}
            currentPageItems={+meta.current_page_items}
            itemsPerPage={+meta.items_per_page}
            totalPages={+meta.total_pages}
            totalItems={+meta.total_items}
            limit={limit? +limit : limit}
        />
    </div>
  )
}

export default YourSuggestionsPage