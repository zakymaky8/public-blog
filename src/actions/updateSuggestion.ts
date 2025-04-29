"use server"

import { getAccessToken } from "@/utils/server-only";

export const updateSuggestionAction = async ( suggId: string, formdata: FormData) => {

    const suggData = {
        content: formdata.get("content") as string,
        priority: formdata.get("priority") as string,
        visibility: formdata.get("visibility") as string === "on" ? "hide" : "show"
    }
    const url = `${process.env.API_URL}/api/suggestions/${suggId}`;
    const token = await getAccessToken()

    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "Application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(suggData)
        })
        const { success, message } = await response.json();
        return {
                success: success,
                message: message,
                redirectUrl: [400, 401, 403].includes(response.status) ?  "/login" : null,
               }

    } catch {
        return {
                success: false,
                message: "Error Occured!",
                redirectUrl: null,
            }
    }
}
