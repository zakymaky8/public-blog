// const BlogDetail = ({params}: {
//     params: {
//         blogId: string
//     }
// }) => {
//   console.log(params);
//   // fetch specific posts with comments from the api
//   return (
//     <div className="text-black flex flex-col w-full items-center gap-5 p-5">
//       <div className="flex flex-col gap-3">
//         <h1 className="text-2xl font-bold" style={{maxWidth: "450px"}}>lastUpdate DateTime updated Atlast Update DateTime updatedAt</h1>
//         <div className="flex gap-4 justify-start text-xs italic flex-wrap">
//           <cite>Author: somebody</cite>
//           <p>Created On: this day</p>
//           <p>Updated on: This day</p>
//         </div>
//       </div>

import AddCommentSec from "@/app/_lib/AddCommentSec";
import CommentsCard from "@/app/_lib/CommentsCard";
import LikeButton from "@/app/_lib/LikeButton";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

//       <div className="p-4">
//         <p className="text-sm text-justify" style={{maxWidth: "600px"}}>y we’re just doing it like this to </p>
//       </div>

//       <div>
//         <h2 className="font-bold text-xl mb-5">Comments: 40</h2>
//         <div className="flex flex-col gap-3">
//           <div className="flex flex-col  p-3 rounded-xl " style={{maxWidth: "550px"}}>
//             <h1 className="text-sm text-gray-600 underline">@zakymak</h1>
//             <p className="pt-1 text-xs italic">Using checks like typeof wind in your rendering logic
//                Using browser-only APIs like window or localStorage in your rendering logic</p>
//             <div className="self-end">
//               <span className="text-xs mr-1">33</span><button className="text-red-400 bg-slate-600 h-5 w-8 text-xs p-0">like</button><button className="text-red-400 bg-slate-600 h-5 w-8 text-xs p-0 ml-1">Reply</button>
//             </div>
//           </div>

//           <div className="flex flex-col  p-3 rounded-xl " style={{maxWidth: "550px"}}>
//             <span className="text-sm text-gray-600 underline">user user</span>
//             <p className="pt-1 text-xs italic">Publish your posts. Why are we setting it up like this? Because we can! The important Publish your posts. Why are we setting it up like this? Because we can! The important Publish your posts </p>

//             <div className="self-end">
//              <span className="text-xs mr-1">33</span> <button className="text-red-400 bg-slate-600 h-5 w-8 text-xs p-0">like</button><button className="text-red-400 bg-slate-600 h-5 w-8 text-xs p-0 ml-1">Reply</button>
//             </div>
//           </div>

//           <div className="flex flex-col  p-3 rounded-xl " style={{maxWidth: "550px"}}>
//             <span className="text-sm text-gray-600 underline">user user</span>
//             <p className="pt-1 text-xs italic">Publish your posts. Why are we setting it up like this? Because we can! The important Publish your posts. Why are we setting it up like this? Because we can! The important Publish your posts </p>

//             <div className="self-end">
//              <span className="text-xs mr-1">33</span> <button className="text-red-400 bg-slate-600 h-5 w-8 text-xs p-0">like</button><button className="text-red-400 bg-slate-600 h-5 w-8 text-xs p-0 ml-1">Reply</button>
//             </div>
//           </div>

//           <div className="flex flex-col  p-3 rounded-xl " style={{maxWidth: "550px"}}>
//             <span className="text-sm text-gray-600 underline">user user</span>
//             <p className="pt-1 text-xs italic">Publish your posts. Why are we setting it up like this? Because we can! The important Publish your posts. Why are we setting it up like this? Because we can! The important Publish your posts </p>

//             <div className="self-end">
//              <span className="text-xs mr-1">33</span> <button className="text-red-400 bg-slate-600 h-5 w-8 text-xs p-0">like</button><button className="text-red-400 bg-slate-600 h-5 w-8 text-xs p-0 ml-1">Reply</button>
//             </div>
//           </div>

//           <div className="flex flex-col  p-3 rounded-xl " style={{maxWidth: "550px"}}>
//             <span className="text-sm text-gray-600 underline">user user</span>
//             <p className="pt-1 text-xs italic">Publish your posts. Why are we setting it up like this? Because we can! The important Publish your posts. Why are we setting it up like this? Because we can! The important Publish your posts </p>

//             <div className="self-end">
//              <span className="text-xs mr-1">33</span> <button className="text-red-400 bg-slate-600 h-5 w-8 text-xs p-0">like</button><button className="text-red-400 bg-slate-600 h-5 w-8 text-xs p-0 ml-1">Reply</button>
//             </div>
//           </div>
//         </div>
//       </div>

//     </div>
    
//   )
// }

// export default BlogDetail

function cap(word: string):string {
  return word[0].toUpperCase() + word.slice(1,).toLowerCase()
}

const BlogDetail = async ({params}: {
  params: {
      blogId: string
  }
}) => {
    const { blogId } = await params;
    const cookieStore = cookies();
    const token = (await cookieStore).get("token")?.value;

    const res = await fetch(`http://localhost:3456/posts/${blogId}`, {
      headers: {
        "authorization": `Bearer ${token}`,
        "content-type": "application/json",
      }
    });
    if (!res.ok) {
      if (res.status === 401) redirect("/login")
        else if (res.status === 404) {
            const { error } = await res.json()
            return (
                    <div className="ml-auto text-center pt-40 p-20 text-black italic">
                      <p className="opacity-60">{error}!</p>
                      <Link href="/blog" className="hover:opacity-60">See other posts</Link>
                    </div>
                  )
        }
        else {
          redirect("/login")
        }
    }
    else {
      const {data} = await res.json();
      const [post, author, currentUser] = data
      const postIsLiked = post?.likes?.includes(currentUser.users_id) ? true : false
      return (
        <div className="text-black flex flex-col w-full items-center gap-5 p-5">
          <div className="flex flex-col gap-3">
            <h1 className="text-3xl font-bold text-center font-serif italic" style={{maxWidth: "450px"}}>{post.title.toUpperCase()[0] + post.title.slice(1,)}</h1>
            <div className="flex gap-4 justify-start text-[10px] italic flex-wrap items-center">
              <cite className="">Author: <strong><em>{`${cap(author.firstname)} ${cap(author.lastname)}`}</em></strong></cite>
              <p> Created at:  {post.createdAt.split("T")[0] + ' ' + post.createdAt.split("T")[1].split(".")[0]}</p>
              <p> Last update: {post.lastUpdate.split("T")[0] + ' ' + post.lastUpdate.split("T")[1].split(".")[0]}</p>
            </div>
          </div>
    
          <div className="p-4">

          <div 
            style={{lineHeight: "1.5", scrollbarWidth: "none", boxShadow: "inset 1px 1px 5px 0px "}}
            className="main-cont max-w-[700px] overflow-auto bg-[#e5eff9] px-6  py-3 my-10 border-y-[25px] border-slate-800 text-[15px] text-justify rounded-xl"
            dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>

          <div className='flex gap-2 items-center'>
                <span className="text-[14px] -mt-1 cursor-pointer">{post.likes?.length}</span>
                <LikeButton replyId="" bg={postIsLiked ? "bg-red-500" : "bg-none"} type='post' postId={blogId}/>
                <span className=' text-[11px] bg-black text-white p-1 rounded-sm font-light ml-2'>{postIsLiked ? "You liked this post 🎉" :  "Like this Post!"} </span>
            </div>
          <hr className="w-full border-[1px] border-black opacity-50"/>
    
          <div className="mb-16 mt-5">
            <AddCommentSec postId={blogId}/>
            <CommentsCard postId={blogId}/>
          </div>
    
        </div>
      )
    }
}

export default BlogDetail