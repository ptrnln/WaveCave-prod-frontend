async function csrfFetch(url, options = {}) {
    options.headers ||= {};
    options.method ||= 'GET'
    

    if(options.method.toUpperCase() !== 'GET' ) {
        if(!(options.body?.constructor?.name === 'FormData')) options.headers['Content-Type'] ||= 'application/json'
        options.headers['X-CSRF-Token'] = sessionStorage.getItem('X-CSRF-Token')/* || 
            (await restoreCSRF()).headers.get('X-CSRF-Token'); */
    }

    try {
        const res = await fetch(url, options);
    
        return res;
    } catch(err) {
        return(err);
    }

    }

export async function restoreCSRF() {
    const response = await csrfFetch('https://api.ph4se.dev/wavecave/session')
    storeCSRFToken(response)
    return response;
}

export function storeCSRFToken(response) {
    const csrfToken = response.headers.get('X-CSRF-Token')
    if (csrfToken) sessionStorage.setItem('X-CSRF-Token', csrfToken)
}

export default csrfFetch;