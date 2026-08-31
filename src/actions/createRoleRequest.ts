"use server"

import { getAccessToken } from "@/utils/server-only"


type TRoleRequestState = {
    success: boolean,
    message: string,
    redirectUrl: string | null,
}

export const createRoleRequest = async ( prevState: TRoleRequestState, formData: FormData) => {

    const token = await getAccessToken();
    const url = `${process.env.API_URL}/api/roles/role-requests`

    const commentData = {
        role: formData.get("role")?.toString(),
        contact: formData.get("contact")?.toString(),
        value_proposition: formData.get("value_proposition")?.toString(),
    }

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "Application/json"
            },
            body: JSON.stringify(commentData)
        })
        const { success, message } = await response.json();
        return {
                success: success,
                message: message,
                redirectUrl: [401, 403].includes(response.status) ?  "/login" :  null
               }

    } catch {
        return {
                success: false,
                message: "Error Occured!",
                redirectUrl: null,
                
            }
    }
}