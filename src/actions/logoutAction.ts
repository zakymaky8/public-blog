"use server"

import { cookies } from "next/headers"


export const logUserOutAction = async () => {
    (await cookies()).delete("accessToken")
}