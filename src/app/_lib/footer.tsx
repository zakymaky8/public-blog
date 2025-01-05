import Link from "next/link"

const Footer = () => {
  return (
    <ul className="flex gap-5 bg-[#181b6b] p-5 -mb-2 text-[11px] self-center w-full justify-center">
        <Link href="https://zachfolio.vercel.app/contact" className="text-white hover:text-yellow-400">Contact me</Link >
        <Link href="/somewhere" className="text-white hover:text-yellow-400">Ask Help</Link >
        <Link href="/somewhere" className="text-white hover:text-yellow-400">Work With me</Link >
        <Link href="https://zachfolio.vercel.app/about" className="text-white hover:text-yellow-400">About Me</Link >
        <Link href="/somewhere" className="text-white hover:text-yellow-400">About This Blog</Link >
        <Link href="/somewhere" className="text-white hover:text-yellow-400">Contribute</Link >
    </ul>
  )
}

export default Footer