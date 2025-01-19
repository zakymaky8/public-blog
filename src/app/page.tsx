import Image from "next/image";
import Link from "next/link";
import blogIllustration from "../../public/blog-post_f68f.svg"


export default function Home() {
  return (
    <div className="flex items-center flex-col justify-between gap-1 mb-20 p-10">
      <h2 className="text-center text-yellow-700 text-4xl mb-20 mt-20 font-bold">Welcome to Tip Logger!</h2>
      <Image  src={blogIllustration} className="border-gray-900 border-b-2 pb-1 p-4 rounded-md round shadow-lg"  alt="blog immlustarion"/>
      <p className="italic text-yellow-900 text-center text-sm mt-20">
        This is the hub where you can see personal observations of mine.
      </p>
      <Link className="self-center text-yellow-600 hover:text-gray-100 mt-16" href="/blog"><button>See Posts</button></Link>
    </div>
  );
}
