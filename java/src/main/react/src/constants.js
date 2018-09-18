let apiBaseUrl = "";
try {
    if (process.env.NODE_ENV === 'development') {
        apiBaseUrl = "http://localhost";
    }
} catch (e) {
}

export const CONTEXT = apiBaseUrl;

// TODO Talvez nao use mais o node
export const CONTEXT_BLOCKCHAIN = "http://localhost:8084";
