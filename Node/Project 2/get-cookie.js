
async function getCookie() {
    const url = 'https://tera.backend.live/cookies-list';

    try {
        const response = await fetch(url, {
            method: "GET",
            credentials: "include" // Important if cookies are involved
        });

        const cookiesArray = await response.json(); // Convert response to JSON
        console.log("Raw Cookies Array:", cookiesArray);

        // Extract only the cookie values
        const extractedTokens = cookiesArray.map(cookie => {
            // const match = cookie.match(/ndus=([^;]+)/); // Extracts value after 'ndus='
            const match = cookie.match(/ndus([^;]+)/); // Extracts value after 'ndus='
            // const cookieValue =  match ? match[1] : null;
           const cookieObj = match ? { name: "ndus", value: match[1] } : null;
            return cookieObj
        }).filter(Boolean); // Remove null values

        console.log("Extracted Tokens:", extractedTokens);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}



app();


