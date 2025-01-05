// "use client"
import { Dispatch, SetStateAction } from "react";
import { Post } from "../blog/page"

const Pagination = ({posts, ipp, setCurrentPageData}: {
    posts:Post[],
    ipp: number,
    setCurrentPageData: Dispatch<SetStateAction<Post[]>>
}) => {

  return (
    <ul className="flex gap-3 self-center text-black p-1">

        <li>{"<"}</li>
        {Array(Math.ceil(posts.length / ipp)).fill("").map((_item,index) => {
            return <li onClick={()=> {
                                const page = index + 1;
                                const start  = ((page - 1 ) * ipp);
                                const end = page * ipp;
                                const curatedPosts = posts.slice(start, end);
                                setCurrentPageData(curatedPosts)

            }} style={{background: ""}} key={index} className="underline cursor-pointer">{index+1}</li>; {/*this fetches with the amount set on ipp*/}
        })}
        <li>{">"}</li>
</ul>
  )
}

export default Pagination