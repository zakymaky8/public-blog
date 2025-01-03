import Link from "next/link";


export default function Home() {
  return (
    <div className="text-red-400 flex flex-col justify-between gap-6 ">
      <h1 className="text-center text-5xl m-8">Welcome to web log!</h1>
      <p className="italic text-black text-center text-sm mb-5">
        This is the hub where you can see personal observations of mine.
      </p>
      <Link className="self-center" href="/blog"><button>See Posts</button></Link>
    </div>
  );
}
