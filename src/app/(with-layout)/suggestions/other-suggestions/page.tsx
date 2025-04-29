
import { redirect } from "next/navigation";
import SuggestionLists from "../_lib/SuggestionsLists";
import Pagination from "@/app/_lib/Pagination";
import { fetchOthersSuggestion } from "@/actions/fetches";
import { Metadata } from "next";

export  const metadata:Metadata = {
  title: "Others Suggestions"
}

const OthersSuggestionsPage = async ({searchParams}: { searchParams: Promise<{search: string, page: number, limit: number}> }) => {
    const { search, page, limit } = await searchParams;
  
    const { suggestions, success, redirectUrl, meta, users, message } = await fetchOthersSuggestion(search, page, limit)
  
    if (!["", null].includes(redirectUrl) && !success) {
        redirect(redirectUrl!)
    }
  
    if (!success) {
      return <div className="ml-auto text-center pt-40 p-20 text-black italic min-h-[70vh]">
                <p className="opacity-60">{message}!</p>
            </div>
    }

  return (
    <div className="self-center flex flex-col gap-6 mt-6">
        <h3 className="text-center">Others Suggestions</h3>
        <SuggestionLists type="others" suggestions={suggestions} users={users}/>
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

export default OthersSuggestionsPage