import React, { ReactNode } from 'react'
import SuggestionsHeader from './_lib/SuggestionsHeader'

const  SuggestionLayout = ({children}: { children: ReactNode }) => {
  return (
    <div className='flex flex-col gap-4'>
        <SuggestionsHeader />
        {/* <hr className='border-[1px] border-gray-500' /> */}
        {children}
    </div>
  )
}

export default SuggestionLayout