"use server"

import { getAccessToken } from "@/utils/server-only"


export const deleteCommentAction = async (postId: string, commentId: string) => {
    const token = await getAccessToken()
    const url = `${process.env.API_URL}/api/posts/${postId}/comments/${commentId}`

    try {
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            },
        })
        const { success, message, comment } = await response.json();
        return {
                success: success,
                status: response.status,
                message: message,
                redirectUrl: [400, 401, 403].includes(response.status) ?  "/login" :  null,
                comment
               }

    } catch {
        return {
                success: false,
                status: null,
                message: "Error Occured!",
                redirectUrl: null,
                comment: null
            }
    }
}
