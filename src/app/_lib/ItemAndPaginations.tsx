"use client"

import Pagination from "./Pagination"
import { Post } from "../blog/page"
import { useState } from "react"
import ItemPerPage from "./ItemPerPage"
const ItemAndPaginations = ({posts}:
        {
            posts:Post[]
        }) => {

    const [ipp, setIpp] = useState(8);
    return (
        <div className="self-center flex flex-col items-center">
            <Pagination  posts={posts} ipp= {ipp}/>
            <ItemPerPage setIpp = {setIpp}/>
        </div>
    )
}

export default ItemAndPaginations