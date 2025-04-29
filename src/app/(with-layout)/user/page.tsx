import { currentUser } from '@/actions/authAction'
import React from 'react'
import ProfilePic from './_lib/ProfilePic';
import EditProfileInfo from './_lib/EditProfileInfo';
import ChangePassword from './_lib/ChangePassword';
import DeleteAccount from '@/app/_lib/DeleteAccount';
import { fetchUserActionFeed } from '@/actions/fetches';
import { Post, TComment, TSuggestions } from '@/app/_lib/type';
import Link from 'next/link';
import { decideWhichFormat } from '@/app/_lib/utils';

export async function generateMetadata() {
  const { user, message, success } = await currentUser();
  if (!success ) return { title: message}
  else {
    return {title: user.firstname + " " + user.lastname}
  }
}



const UserProfilePage = async () => {
  const { success, user, message } = await currentUser();
  const results = await fetchUserActionFeed();



  if (success === false || results.success === false) {
    return (
      <div className="ml-auto text-center p-20 text-black italic">
        <p className="opacity-60">{!success ? message : results.message}!</p>
      </div>
    )
  }

  return (
    <div className='flex flex-col items-center p-10'>
      <div className='flex flex-col gap-24'>

        <div className='self-center'>
          <ProfilePic user={user}/>
          <div className='flex flex-col items-center'>
            <h3 className='m-0 mb-2 mt-6 text-[22px]'>{(user.firstname ?? "--") + " " + (user.lastname ?? "--")}</h3>
            <strong className='text-center italic font-light'>{user.username ?? "--"}</strong>
          </div>
        </div>
        <div className='flex flex-col gap-3 self-center'>
          <EditProfileInfo user={user} />
          <ChangePassword />
        </div>
        <div className='self-center flex flex-col gap-4'>
          <h3 className='text-[22px] self-center'>Recent Activities</h3>
          <div className='flex flex-col gap-4'>
            <div>
              <h4>Recent comments on Posts</h4>
              <ul className='flex flex-col gap-4 max-w-[680px]'>
                {
                  results.data.commentsWithPosts.length > 0 ?
                  results.data.commentsWithPosts.slice(0, 3).map(({post, comment}: { post: Post, comment: TComment }) => {
                    return <li key={post.posts_id + comment.comments_id}>
                            You commented <em className='text-[15px]'>&quot;{comment.content}&quot;</em> on
                            post <Link href={`/blog/${post.posts_id}`} className='hover:underline'>{post.title}</Link>.
                            </li>
                  }) :
                  <li className="text-center flex flex-col  gap-4 p-10 text-black italic">
                    <p className="text-center opacity-70 text-[14px]">No comment on posts yet!</p>
                    <Link href="/blog" className="text-[13px] hover:opacity-80 hover:text-yellow-500 bg-black py-2 text-white w-max self-center px-5 rounded">Explore</Link>
                  </li>
                }
              </ul>
            </div>
            <div>
              <h4>Likes of Recent Posts</h4>
              <ul className='flex flex-col gap-4 max-w-[680px]'>
                {
                  results.data.likedPosts.length > 0 ?
                  results.data.likedPosts.slice(0, 3).map((post: Post) => {
                    return <li key={post.posts_id+"likes"}>
                              <Link href={`/blog/${post.posts_id}`} className='hover:underline'>{post.title}</Link>.
                            </li>
                    }) :
                      <li className="self-center text-center flex flex-col  gap-4 p-10 text-black italic">
                        <p className="text-center opacity-70 text-[14px]">No Likes on posts yet!</p>
                        <Link href="/blog" className="text-[13px] hover:opacity-80 hover:text-yellow-500 bg-black py-2 text-white w-max self-center px-5 rounded">Explore</Link>
                      </li>
                }
              </ul>
            </div>
            <div>
              <h4>Recent Suggestions</h4>
              <ul className='flex flex-col gap-4 max-w-[680px]'>
                {
                  results.data.suggestions.length > 0 ?

                  results.data.suggestions.slice(0, 3).map((sugg: TSuggestions) => {
                    return <li className='italic text-[15px] opacity-85' key={sugg.suggns_id}>
                              <strong className='underline mb-1'>{decideWhichFormat(sugg.createdAt)} </strong><br />
                              {sugg.content.length > 100 ? sugg.content.slice(0, 100) + "..." : sugg.content}
                            </li>
                  }) :
                  <li className="text-center flex flex-col  gap-4 p-10 text-black italic">
                    <p className="text-center opacity-70 text-[14px]">No Suggestions yet!</p>
                    <Link href="/suggestions/new-suggestion"><button className="text-[13px] hover:opacity-80 hover:text-yellow-500">Create One</button></Link>
                  </li>
                }
              </ul>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <h3>Danger Zone</h3>
          <div className='flex flex-col items-start'>
            <DeleteAccount userId={user.users_id}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfilePage