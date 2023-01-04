export const Base_URL = 'https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-PT/Posts'

export const apiCall = async ({ url, method, token, body }) => {
    console.log("apiCall: ", {url, method, token, body });

    try {
        const options ={
            method: method ? method.toUpperCase() : 'GET',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        };
        if (token) {
            options.headers["Authorization"] = `Bearer ${token}`;
        }
        console.log("Call API Request URL: ", Base_URL + url);
        console.log("Call API Options: ", options);
        const response = await fetch(Base_URL + url, options);
        const data = await response.json();
        console.log("data: ", data);
        if (data.error) throw data.error;
        return data;
    } catch (error) {
        console.error('ERROR: ', error);
    }
};