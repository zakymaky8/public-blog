import Link from "next/link"

const Footer = () => {
  return (
    <div className="bg-[#181b6b] w-full text-[11px]">
      <ul className="flex gap-5 flex-wrap p-8 self-center justify-around footer mb-10">

          <div className=" font-medium text-white flex gap-2 items-center">
            <strong className="text-lg"> Tip Logger</strong>
            <span className="text-[13px] mt-1">grab something you might not know</span>
          </div>

          <div className="flex flex-col gap-2">
            <Link href="https://zachfolio.vercel.app/contact" className="text-white hover:text-yellow-400">Contact me</Link >
            <Link href="/somewhere" className="text-white hover:text-yellow-400">Work With me</Link >
          </div>

          <div className="flex flex-col gap-2">
          <Link href="/blog" className="text-white hover:text-yellow-400">Blogs</Link >
            <Link href="https://zachfolio.vercel.app/about" className="text-white hover:text-yellow-400">About Me</Link >
            <Link href="/somewhere" className="text-white hover:text-yellow-400">About This Blog</Link >
          </div>

          <div className="flex flex-col gap-2">
            <Link href="" className="text-white hover:text-yellow-400">Telegram</Link>
            <Link href="" className="text-white hover:text-yellow-400">Youtube</Link>
            <Link href="" className="text-white hover:text-yellow-400">LinkedIn</Link>
          </div>
          <div className="flex flex-col gap-2">
            <Link href="/somewhere" className="text-white hover:text-yellow-400">Ask Help</Link >
            <Link href="/somewhere" className="text-white hover:text-yellow-400">Contribute</Link >
          </div>
      </ul>
      <p className="text-center text-white">By Zechariah @All rights reserved!</p>
    </div>
  )
}

export default Footer