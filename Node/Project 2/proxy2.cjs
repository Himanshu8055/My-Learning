const express = require("express");
const request = require("request");
const cors = require("cors");

const app = express();
app.use(cors()); // Enable CORS for all requests

app.get("/proxy", (req, res) => {
    const targetUrl = req.query.url;

    if (!targetUrl) {
        return res.status(400).send("Missing 'url' parameter.");
    }

    request({
        url: targetUrl,
        headers: {
            "Cookie": "ndus=Yf7eDeyteHuiCS_vPrZK1as2XqV3zi9-J-4DLnHN", // Add your cookie here
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36"
        }
    }).pipe(res);
});

app.listen(8080, () => console.log("CORS Proxy running on port 8080"));
