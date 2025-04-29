"use server"

import { formatApiUrl } from "@/app/_lib/utils"
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


export const fetchPublishedPosts = async (search?: string, page?: number, limit?: number) => {

    const token = await getAccessToken()
    const url = formatApiUrl(`${process.env.API_URL}`, "/api/posts", page, search, limit, undefined)

    try {
        const response = await fetchWithNoCache(url, token);
        const { success, message, posts, meta } = await response.json()
        return {
            success,
            message,
            status: response.status,
            redirectUrl: [400, 401, 403].includes(response.status) ? "/login" : null,
            posts,
            meta
        }
    } catch {
        return {
            success: false,
            status: false,
            message: "Failed to fetch blog information!",
            redirectUrl: null,
            posts: null,
            meta: null
        }
    }
}


export const fetchPostsComments = async (postId: string, search?: string, limit?: number, page?: number) => {
    const token = await getAccessToken();

    const url = formatApiUrl(process.env.API_URL, `/api/posts/${postId}/comments`, page, search, limit, undefined)

    try {
        const response = await fetchWithNoCache(url, token);

        const { success, message, data, meta } = await response.json()
        return {
            success,
            message,
            redirectUrl: [400, 401, 403].includes(response.status) ? "/login" : null,
            data,
            meta
        }
    } catch {
        return {
            success: false,
            message: "Failed to fetch blog information!",
            redirectUrl: null,
            data: null,
            meta: null
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



export const fetchFeaturedPosts = async (search?: string, page?: number, limit?: number) => {

    const token = await getAccessToken()
    const url = formatApiUrl(`${process.env.API_URL}`, "/api/posts/featured", page, search, limit ?? 3, undefined)

    try {
        const response = await fetchWithNoCache(url, token);
        const { success, message, posts, meta } = await response.json()
        return {
            success,
            message,
            status: response.status,
            redirectUrl: [400, 401, 403].includes(response.status) ? "/login" : null,
            posts,
            meta
        }
    } catch {
        return {
            success: false,
            status: false,
            message: "Failed to fetch blog information!",
            redirectUrl: null,
            posts: null,
            meta: null
        }
    }
}



export const fetchSelfSuggestions = async (search?: string, page?: number, limit?: number) => {
    const token = await getAccessToken();
    const url = formatApiUrl(`${process.env.API_URL}`, `/api/suggestions/user-suggestions`, page ?? 1, search, limit ?? 4, undefined);
    try {
        const response = await fetchWithNoCache(url, token);
        const { success, message, suggestions, meta, user } = await response.json();
        return {
            success,
            message,
            status: true,
            redirectUrl: [400, 401, 403].includes(response.status) ? "/login" : null,
            suggestions,
            user,
            meta
        }
    } catch {
        return {
            success: false,
            status: false,
            message: "Failed to fetch suggestions!",
            redirectUrl: null,
            suggestions: null,
            users: null,
            meta: null
        }
    }
}



export const fetchOthersSuggestion = async (search?: string, page?: number, limit?: number) => {
    const token = await getAccessToken();
    const url = formatApiUrl(`${process.env.API_URL}`, `/api/suggestions/others-suggestions`, page ?? 1, search, limit ?? 4, undefined);
    try {
        const response = await fetchWithNoCache(url, token);
        const { success, message, suggestions, meta, users } = await response.json()
        return {
            success,
            message,
            status: response.status,
            redirectUrl: [400, 401, 403].includes(response.status) ? "/login" : null,
            suggestions,
            users,
            meta
        }
    } catch {
        return {
            success: false,
            status: false,
            message: "Failed to fetch suggestions!",
            redirectUrl: null,
            suggestions: null,
            users: null,
            meta: null
        }
    }
}



export const fetchUserActionFeed = async () => {
    const token = await getAccessToken()
    const url = `${process.env.API_URL}/api/user/user-profile/action-feeds`
    try {
        const response = await fetchWithNoCache(url, token);
        const { success, message, data } = await response.json();
        console.log(data)
        return {
            success,
            message,
            status: response.status,
            data,
            redirectUrl: [401, 403].includes(response.status) ? "/login" : null,

        }
    } catch {
        return {
            success: false,
            status: false,
            data: null,
            message: "Failed to fetch user action feeds!",
            redirectUrl: null,
        }
    }
}



export const fetchSingleSuggestion = async (suggId: string) => {
    const token = await getAccessToken();
    const url = formatApiUrl(`${process.env.API_URL}`, `/api/suggestions/${suggId}`);
    try {
        const response = await fetchWithNoCache(url, token);
        const { success, message, data } = await response.json();
        return {
            success,
            message,
            status: true,
            redirectUrl: [400, 401, 403].includes(response.status) ? "/admin-login" : null,
            data
        }
    } catch {
        return {
            success: false,
            status: false,
            message: "Failed to fetch suggestions!",
            redirectUrl: null,
            data: null
        }
    }
}