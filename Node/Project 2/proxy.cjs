const express = require("express");
const request = require("request");
const cors = require("cors");

const app = express();
app.use(cors()); // Enable CORS

app.use("/proxy", (req, res) => {
    // const videoUrl = "YOUR_TERABOX_VIDEO_URL_HERE"; 
    const videoUrl = "https://www.1024terabox.com/api/streaming?path=%2F%5BSearch-%20%40VQLSE_Bot%5D%20S01E13%20Dragon%20Ball%20Daima%20480p.mkv&app_id=250528&clienttype=0&type=M3U8_FLV_264_480&vip=0";

    const options = {
        url: videoUrl,
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)", // Spoof browser request
            "Referer": "https://terabox.com/", // Required for TeraBox authentication
        },
    };

    request(options).pipe(res);
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));
