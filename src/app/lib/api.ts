const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const TEST_URL = process.env.NEXT_PUBLIC_TEST_URL;
const USER_URL = process.env.NEXT_PUBLIC_USER_URL;
const SESSION_URL = process.env.NEXT_PUBLIC_SESSION_URL;

async function fetchAPI(url: string|undefined, method: string = 'POST', headers: any = { 'Content-Type': 'application/json' }, body: any = {}) {
    try {
        if (url) {
            const response = await fetch(url, {
                method: method,
                headers: headers,
                body: body
            })
            if (!response.ok) {
                throw new Error(`${response.status}: ${response.url}, ${response.statusText}.`)
            } else {
                const data = await response.json()
                return data
            }
        } else {
            throw new Error('API URL is not set')
        }
    } catch (error: any) {
        console.log(error.message)
        throw new Error(`${error.message}.`)
    }
}

async function checkBackend() {
    try {
        return await fetchAPI(`${BASE_URL}${TEST_URL}`, 'GET', undefined, null)
    } catch (error: any) {
        console.log(error.message)
        throw new Error(`${error.message}.`)
    }
}

async function fetchUserList() {
    try {
        return await fetchAPI(`${BASE_URL}${USER_URL}`, 'GET', undefined, null)
    } catch (error: any) {
        console.log(error.message)
        throw new Error(`${error.message}.`)
    }
}

async function fetchUserDetails(id: string) {
    try {
        return await fetchAPI(`${BASE_URL}${USER_URL}${id}/`, 'GET', undefined, null)
    } catch (error: any) {
        console.log(error.message)
        throw new Error(`${error.message}.`)
    }
}

async function fetchSessions(id: string) {
    try {
        return await fetchAPI(`${BASE_URL}${SESSION_URL}`, 'GET', undefined, null)
    } catch (error: any) {
        console.log(error.message)
        throw new Error(`${error.message}.`)
    }
}

export {checkBackend, fetchUserList, fetchUserDetails, fetchSessions}