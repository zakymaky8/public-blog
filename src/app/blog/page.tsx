"use client"

import { useEffect, useState } from "react";
import BlogCard from "../_lib/BlogCard"
// import ItemAndPaginations from "../_lib/ItemAndPaginations";
import ItemPerPage from "../_lib/ItemPerPage";
import Pagination from "../_lib/Pagination";
import { getData } from "../_lib/aa";

export interface Post {
    id: number,
    title: string,
    content: string,
    commentAmt: number
}
//  consider errors while fetching

const Blogs =  () => {
    const [ipp, setIpp] = useState(8);
    const [posts, setPosts] = useState<{sliced: Post[], allData: Post[]}>({sliced: [], allData: []});
    const [err, setErr] = useState<Post | string>("");
    const [currentPageData, setCurrentPageData] = useState<Post[]>([]);
    useEffect(() => {
        async function getDat() {
            try {
                const res = await getData(ipp);
                setPosts(res)
            } catch {
                setErr("error");
            }
        }
        getDat()
    }, [ipp])

  return (
    <div className="flex flex-col">
        {err && <h1>{""}</h1>}
        <div className="text-slate-700 p-5 flex flex-wrap gap-4 justify-center">
            {
                currentPageData.map((post:Post) => {
                    return <BlogCard id={post.id} key={post.id} content={post.content} title={post.title} commentAmt={post.commentAmt}/>
                })
            }
        </div>
        {/* <ItemAndPaginations posts={posts} /> */}
        <Pagination setCurrentPageData = {setCurrentPageData} posts={posts.allData} ipp= {ipp}/>
        <ItemPerPage setIpp = {setIpp}/>

        {/* FETCH BLOG HERE AND SEE ALL OF M GET M WAY TO SEE SPECIFIC POSTS AS WELL */}
        {/* FIRST CREATE CARDS WHICH REVEALS WHAT ON THE POST WITH COMMENT INFORMATION */}
        {/* SECOND MAKE SOME KIND CONSTRAINT THAT ALLOWS ONLY MEMEBERS TO SEE WHO THE AUTHOR IS AND WHEN THE POST IS LIVE */}
        {/* DO THAT CONSTRAINT THING ON CLICKING READ MORE BUTTON REDIRECT THEM TO LOGIN PAGE SIGNUP OTHERWISE */}
        {/* padination here according to the amoount of items fetched */}
        {/* do some mind teser algorithm here with considering time and space complexity */}
    </div>
  )
}

export default Blogs