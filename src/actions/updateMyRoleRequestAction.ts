"use server"

import { getAccessToken } from "@/utils/server-only";

export const updateMyRoleRequestAction = async ( requestId: string, formdata: FormData) => {

    const updatedRoleRequestData = {
        role: formdata.get("role")?.toString(),
        value_proposition: formdata.get("value_proposition")?.toString(),
        contact: formdata.get("contact")?.toString(),
    }

    const url = `${process.env.API_URL}/api/roles/role-request/${requestId}`;
    const token = await getAccessToken()

    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "Application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(updatedRoleRequestData)
        })
        const { success, message } = await response.json();
        return {
                success: success,
                message: message,
                redirectUrl: [400, 401, 403].includes(response.status) ?  "/admin-login" : null,
               }

    } catch {
        return {
                success: false,
                message: "Error Occured!",
                redirectUrl: null,
               }
    }
}
