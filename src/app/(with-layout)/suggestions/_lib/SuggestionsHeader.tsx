"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const SuggestionsHeader = () => {
  const pathname = usePathname();
  const isActive = (str: string) => pathname.includes(str)
  return (
    <ul
      className={`flex justify-center flex-col items-center
                  sm:flex-row gap-6 sm:gap-20 mt-16`}>
        <Link
          className={`${isActive("your-suggestions") ? "border-b-2 border-yellow-500" : ""} pb-2 text-[18px] text-blue-950 font-bold hover:opacity-60`}
          href="/suggestions/your-suggestions">Yours</Link>
        <Link
          className={`${isActive("other-suggestions") ? "border-b-2 border-yellow-500" : ""} pb-2 text-[18px] text-blue-950 font-bold hover:opacity-60`}
          href="/suggestions/other-suggestions">Other&apos;s</Link>
        <Link
          className={`${isActive("new-suggestion") ? "border-b-2 border-yellow-500" : ""} pb-2 text-[18px] text-blue-950 font-bold hover:opacity-60`}
          href="/suggestions/new-suggestion">Create New</Link>
    </ul>
  )
}

export default SuggestionsHeader