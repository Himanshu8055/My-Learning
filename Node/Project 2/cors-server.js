import cors_proxy from "cors-anywhere";

const PORT = 8080;

cors_proxy.createServer({
    originWhitelist: [], // Allow all origins
    requireHeader: ["origin", "x-requested-with"],
    removeHeaders: ["cookie", "cookie2"],
}).listen(PORT, function () {
    console.log(`CORS Anywhere running on port ${PORT}`);
});
