"use server"

import { getAccessToken } from "@/utils/server-only"

type TFormState = {
    success: boolean,
    message: string
}
export const createSuggestionAction = async (prev:TFormState , formData: FormData) => {
    const token = await getAccessToken()
    const url = `${process.env.API_URL}/api/suggestions`

    const suggData = {
        content: formData.get("content") as string,
        priority: formData.get("priority") as string,
        visibility: formData.get("visibility") as string === "on" ? "hide" : "show"
    }

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "Application/json"
            },
            body: JSON.stringify(suggData)
        })
        const { success, message } = await response.json();
        return {
                success: success,
                message: message,
                redirectUrl: [401, 403].includes(response.status) ?  "/login" :  null,
               }

    } catch {
        return {
                success: false,
                message: "Error Occured!",
                redirectUrl: null,
                comment: null,
            }
    }
}