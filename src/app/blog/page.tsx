// "use client"

// import BlogsWrapper from "../_lib/BlogsWrapper"

// import { useEffect, useState } from "react";
// import BlogCard from "../_lib/BlogCard"
// // import ItemAndPaginations from "../_lib/ItemAndPaginations";
// import ItemPerPage from "../_lib/ItemPerPage";
// import Pagination from "../_lib/Pagination";
// import { getData } from "../_lib/aa";

// export interface Post {
//     id: number,
//     title: string,
//     content: string,
//     commentAmt: number
// }

// // export const metadata = {
// //     title: "Blogs"
// // }
// //  consider errors while fetching

// const Blogs =  () => {
//     const [ipp, setIpp] = useState(8);
//     const [posts, setPosts] = useState<{sliced: Post[], allData: Post[]}>({sliced: [], allData: []});
//     const [err, setErr] = useState<Post | string>("");
//     const [currentPageData, setCurrentPageData] = useState<Post[]>([]);
//     useEffect(() => {
//         async function getDat() {
//             try {
//                 const res = await getData(ipp);
//                 setPosts(res)
//             } catch {
//                 setErr("error");
//             }
//         }
//         getDat()
//     }, [ipp])

//   return (
//     <div className="flex flex-col">
//         {err && <h1>{""}</h1>}
//         <div className="text-slate-700 p-5 flex flex-wrap gap-4 justify-center">
//             {
//                 currentPageData.map((post:Post) => {
//                     return <BlogCard id={post.id} key={post.id} content={post.content} title={post.title} commentAmt={post.commentAmt}/>
//                 })
//             }
//         </div>
//         {/* <ItemAndPaginations posts={posts} /> */}
//         <Pagination setCurrentPageData = {setCurrentPageData} posts={posts.allData} ipp= {ipp}/>
//         <ItemPerPage setIpp = {setIpp}/>

//         {/* FETCH BLOG HERE AND SEE ALL OF M GET M WAY TO SEE SPECIFIC POSTS AS WELL */}
//         {/* FIRST CREATE CARDS WHICH REVEALS WHAT ON THE POST WITH COMMENT INFORMATION */}
//         {/* SECOND MAKE SOME KIND CONSTRAINT THAT ALLOWS ONLY MEMEBERS TO SEE WHO THE AUTHOR IS AND WHEN THE POST IS LIVE */}
//         {/* DO THAT CONSTRAINT THING ON CLICKING READ MORE BUTTON REDIRECT THEM TO LOGIN PAGE SIGNUP OTHERWISE */}
//         {/* padination here according to the amoount of items fetched */}
//         {/* do some mind teser algorithm here with considering time and space complexity */}
//     </div>
//   )
// }

// export default Blogs

// const BlogsPage = () => {
//   return (
//     <>
//         <BlogsWrapper />
//     </>
//   ) 
// }



// export default BlogsPage





import { redirect } from "next/navigation";
import BlogCard from "../_lib/BlogCard"
import { cookies } from "next/headers";
import Search from "../_lib/Search";

export interface Post {
    posts_id: string,
    title: string,
    content: string,
    likes: string[],
    excerpt: string,
    readTime: number
}


const Blogs =  async () => {
    const cookieStore = cookies();
    const token = (await cookieStore).get("token")?.value;
    
    const res = await fetch("http://localhost:3456/posts", {
        method: "GET",
        headers: {
            "content-type": "application/json",
            "authorization": `Bearer ${token}`
        },
    });
    if (!res.ok) {
        redirect("/login")
    }
    const { posts } = await res.json();
    return (
        <div className="flex flex-col items-center gap-10 mt-5">
            <Search />
            <div className="text-slate-700 mb-20 p-5 flex flex-col items-center gap-8 justify-center">
                {
                    posts.length ? posts.map((post:Post) => {
                        return <BlogCard excerpt={post.excerpt} readTime={post.readTime} post={post} id={post.posts_id} key={post.posts_id} content={post.content} title={post.title}/>
                    }) : <span>No posts available!</span>
                }
            </div>
        </div>
        )
}



export default Blogs