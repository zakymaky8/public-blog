import Link from "next/link"
import tg from "../../../public/telegram.png"
import yt from "../../../public/youtube_icon.png"
import lin from "../../../public/2024254_linedin_media_network_social_icon.png"
import gh from "../../../public/github_icon.png"
import gl from "../../../public/gitlab_logo_logos_icon.png"
import Image from "next/image"

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
            <Link href="https://zachfolio.vercel.app/" className="text-white hover:text-yellow-400">Work With me</Link >
          </div>

          <div className="flex flex-col gap-2">
          <Link href="/blog" className="text-white hover:text-yellow-400">Blogs</Link >
            <Link href="https://zachfolio.vercel.app/about" className="text-white hover:text-yellow-400">About Me</Link >
            <Link href="https://github.com/zakymaky8/public-blog?tab=readme-ov-file" className="text-white hover:text-yellow-400">About This Blog</Link >
          </div>

          <div className="flex flex-col gap-2">

            <Link href="https://t.me/eur9k4" className="text-white hover:text-yellow-400 flex gap-2 items-center">
              <Image src={tg} alt="telegram" className="h-[14px] w-[14px] rounded-[50%]"/>
              <span>Telegram</span>
            </Link>

            <Link href="https://www.youtube.com/@demystified-tech" className="text-white hover:text-yellow-400 flex gap-2 items-center">
              <Image src={yt} alt="youtube" className="h-[14px] w-[14px] rounded-[50%]"/>
              <span>Youtube</span>
            </Link>

            <Link href="https://www.linkedin.com/in/zechariah-m-a41a57247/" className="text-white hover:text-yellow-400 flex gap-2 items-center">
              <Image src={lin} alt="linkedin" className="h-[14px] w-[14px] rounded-[50%]"/>
              <span>LinkedIn</span>
            </Link>

            <Link href="https://github.com/zakymaky8" className="text-white hover:text-yellow-400 flex gap-2 items-center">
              <Image src={gh} alt="github" className="h-[14px] w-[14px] rounded-[50%]"/>
              <span>Github</span>
            </Link>

            <Link href="https://gitlab.com/zakydev" className="text-white hover:text-yellow-400 flex gap-2 items-center">
              <Image src={gl} alt="gitlab" className="h-[14px] w-[14px] rounded-[50%]"/>
              <span>GitLab</span>
            </Link>

          </div>
          <div className="flex flex-col gap-2">
            <Link href="https://zachfolio.vercel.app/contact" className="text-white hover:text-yellow-400">Ask Help</Link >
            <Link href="https://github.com/zakymaky8/public-blog" className="text-white hover:text-yellow-400">Contribute</Link >
          </div>
      </ul>
      <p className="text-center text-white">By Zechariah @All rights reserved!</p>
    </div>
  )
}

export default Footer