"use client"

import Image from "next/image";
import editBtn from "../../../public/edit_icon.svg"
import Link from "next/link";


const EditButton = () => {
  return (
    <Link href="">
    <button type="submit" className="bg-slate-300 p-0 w-fit">
        <Image title="edit comment" src={editBtn} alt="edit button"  className="h-[20px] w-[20px] rounded-[50%]"/>
    </button>
  </Link>
  )
}

export default EditButton