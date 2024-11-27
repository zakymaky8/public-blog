// "use client"

import { Dispatch, SetStateAction } from "react"

const ItemPerPage = ({setIpp}: {setIpp: Dispatch<SetStateAction<number>>}) => {

  return (
    <div className="text-black self-center p-5">
        <label htmlFor="ipp">Items Per Page: </label>
        <select name="items_per_page" id="ipp" onChange={(e) => setIpp(+e.target.value)} defaultValue={8}>
            <option value="" disabled>select amount</option>
            <option value="8">8</option>
            <option value="12">12</option>
            <option value="16">16</option>
        </select>
    </div>
  )
}

export default ItemPerPage