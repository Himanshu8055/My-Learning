import express from "express";
// import request from "request";

const app = express();

app.get("/proxy", (req, res) => {
    const url = "https://www.1024terabox.com/api/streaming?path=%2F%5BSearch-%20%40VQLSE_Bot%5D%20S01E13%20Dragon%20Ball%20Daima%20480p.mkv&app_id=250528&clienttype=0&type=M3U8_FLV_264_480&vip=0";
    
    request(url).pipe(res); // Forward the request
});

app.listen(3000, () => console.log("Proxy running at http://localhost:3000"));
