import Image from "next/image";
import Link from "next/link";
import blogIllustration from "../../../public/blog-post_f68f.svg"
import { getAccessToken } from "@/utils/server-only";
import NewestPosts from "../_lib/NewestPosts";
import FeaturedPosts from "../_lib/FeaturedPosts";



export default async function Home() {

  const token = await getAccessToken();

  return (
    <div className="flex items-center flex-col justify-between gap-3 mb-20 p-10">
      <h2 className="text-center text-yellow-700 text-4xl mb-20 mt-20 font-bold">Welcome to Tip Logger!</h2>
      <Image priority src={blogIllustration} className="border-gray-900 border-b-2 pb-1 p-4 rounded-md round shadow-lg"  alt="blog immlustarion"/>
      <p className="italic text-yellow-900 text-center text-sm mt-20">
        This is the hub where you can find personal observations of mine.
      </p>

      {
        token &&
        <div>
          <h3 className="text-center mb-14 mt-28 text-2xl">Featured Posts</h3>
          <FeaturedPosts />
        </div>
      }

      {
        token &&
        <div>
          <h3 className="text-center mb-14 mt-28 text-2xl">Latest Posts</h3>
          <NewestPosts />
        </div>
      }


      <Link
        className="self-center mt-40"
        href={`${token ? "/blog" : "/login"}`}
        > <button
            className="py-4 px-8 text-yellow-500 hover:opacity-70 hover:text-gray-100 text-[18px]"
          >{token ? "See All Posts" : "Log in"}
        </button>
      </Link>

      {
        !token &&
        <div className="flex text-[14px] items-center gap-2 opacity-70 mt-10">
          <p>No Account Yet?</p>
          <Link href="/register" className="hover:underline hover:opacity-100">Register Here!</Link>
        </div>
      }

    </div>
  );
}
