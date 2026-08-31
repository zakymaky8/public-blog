import { Metadata } from "next"
import SuggestionForm from "../_lib/SuggestionForm"
import { getAccessToken } from "@/utils/server-only"
import { redirect } from "next/navigation"

export  const metadata:Metadata = {
  title: "Create New Suggestion"
}

const NewSuggestionsPage = async () => {

  const token = await getAccessToken()

  if (!token) {
    redirect("/login")
  }

  return (
    <div className="self-center flex flex-col gap-6 mt-8">
        <span className="italic mb-3 mx-2 text-center">Put your topic suggestions you want to appear in posts.</span>
        <SuggestionForm type="create" />
    </div>
  )
}

export default NewSuggestionsPage