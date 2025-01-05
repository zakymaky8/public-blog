import { ReactNode } from "react"

const BlogWrapper = ({ children }: {
    children: ReactNode
}) => {
  return (
    <>
        {children}
    </>
  )
}

export default BlogWrapper