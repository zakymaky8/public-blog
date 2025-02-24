import Link from "next/link"


const Inconvienence = ({ message }: { message: string }) => {
  return (
    <div className="ml-auto text-center pt-40 p-20 text-black italic min-h-[70vh]">
        <p className="opacity-60">{message}!</p>
        <Link href="/blog" className="hover:opacity-60">See other posts</Link>
    </div>
  )
}

export default Inconvienence