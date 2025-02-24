"use server"

import { getAccessToken } from "@/utils/server-only"


export const fetchWithNoCache = async (url: string, token: string | undefined) => {
    return await fetch(url, {
        cache: "no-cache",
        headers: {
            "Content-Type": "Application/json",
            "Authorization": `Bearer ${token}`
        }
    })
}


export const fetchPublishedPosts = async () => {

    const token = await getAccessToken()
    const url = `${process.env.API_URL}/api/posts`

    try {
        const response = await fetchWithNoCache(url, token);
        const { success, message, posts } = await response.json()
        return {
            success,
            message,
            status: response.status,
            redirectUrl: [400, 401, 403].includes(response.status) ? "/login" : null,
            posts
        }
    } catch {
        return {
            success: false,
            status: false,
            message: "Failed to fetch blog information!",
            redirectUrl: null,
            posts: null
        }
    }
}


export const fetchPostsComments = async (postId: string) => {
    const token = await getAccessToken()
    const url = `${process.env.API_URL}/api/posts/${postId}/comments`;

    try {
        const response = await fetchWithNoCache(url, token);

        const { success, message, data } = await response.json()
        return {
            success,
            message,
            redirectUrl: [400, 401, 403].includes(response.status) ? "/login" : null,
            data
        }
    } catch {
        return {
            success: false,
            message: "Failed to fetch blog information!",
            redirectUrl: null,
            data: null
        }
    }
}



//  single published post

export const fetchSinglePost = async (postId: string) => {

    const token = await getAccessToken()
    const url = `${process.env.API_URL}/api/posts/${postId}`

    try {
        const response = await fetchWithNoCache(url, token);

        const { success, message, data } = await response.json()
        return {
            success,
            message,
            status: response.status,
            redirectUrl: [400, 401].includes(response.status) ? "/login" : null,
            data
        }
    } catch {
        return {
            success: false,
            message: "Failed to fetch blog information!",
            status: null,
            redirectUrl: null,
            data: null
        }
    }
}