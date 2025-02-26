const express = require('express');
const axios = require('axios');
const cors = require('cors');
const { Transform } = require('stream');

const app = express();
const PORT = 3000;

// Enable CORS
app.use(cors({ origin: '*', methods: ['GET'], allowedHeaders: ['Content-Type'] }));

// Streaming URL & Cookie
const STREAM_URL = "https://www.1024terabox.com/api/streaming?path=%2F%5BSearch-%20%40VQLSE_Bot%5D%20S01E13%20Dragon%20Ball%20Daima%20480p.mkv&app_id=250528&clienttype=0&type=M3U8_FLV_264_480&vip=0";
const COOKIE = "ndus=Yf7eDeyteHuiCS_vPrZK1as2XqV3zi9-J-4DLnHN"; // Replace with your actual cookie

// Route to serve modified M3U8 file
app.get('/stream', async (req, res) => {
    try {
        console.log("Fetching M3U8 file...");

        // Fetch M3U8 file from Terabox
        const response = await axios.get(STREAM_URL, {
            headers: {
                'User-Agent': 'Mozilla/5.0',
                'Referer': 'https://www.1024terabox.com/',
                'Cookie': COOKIE
            },
            responseType: 'stream'
        });

        res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
        res.setHeader('Content-Disposition', 'inline; filename="video.m3u8"');

        // Modify M3U8 to replace original URLs with our proxy
        const modifyM3U8Stream = new Transform({
            transform(chunk, encoding, callback) {
                let modifiedChunk = chunk.toString('utf8');

                console.log("Original M3U8 Content:", modifiedChunk.substring(0, 200) + "...");

                // Replace chunk URLs with local proxy
                modifiedChunk = modifiedChunk.replace(/https:\/\/v4\.freeterabox\.com/g, `http://localhost:${PORT}/chunk-proxy`);

                console.log("Modified M3U8 Content:", modifiedChunk.substring(0, 200) + "...");

                callback(null, modifiedChunk);
            }
        });

        response.data.pipe(modifyM3U8Stream).pipe(res);
        console.log("M3U8 file sent to client.");

    } catch (error) {
        console.error("Error fetching M3U8:", error.message);
        res.status(500).json({ error: "Failed to fetch M3U8 file." });
    }
});

// Route to proxy video chunks (.ts files)
app.get('/chunk-proxy/*', async (req, res) => {
    try {
        const chunkPath = req.params[0]; // Get the chunk path
        const queryString = req.url.split('?')[1]; // Get the query string

        if (!chunkPath) {
            console.error("Invalid chunk request, no path found");
            return res.status(400).json({ error: "Invalid chunk path" });
        }

        // Construct the full `.ts` URL with security tokens
        const originalChunkUrl = `https://v4.freeterabox.com/${chunkPath}${queryString ? '?' + queryString : ''}`;
        console.log("Requesting chunk from:", originalChunkUrl);

        // Fetch chunk with full headers
        const chunkResponse = await axios.get(originalChunkUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Mobile Safari/537.36 Edg/133.0.0.0',
                'Referer': 'https://www.1024terabox.com/',
                'Origin': 'https://www.1024terabox.com',
                'DNT': '1',
                'Accept': '*/*',
                'Accept-Encoding': 'gzip, deflate, br, zstd',
                'Accept-Language': 'en-US,en;q=0.9,en-IN;q=0.8',
                'Cookie': COOKIE // Make sure your COOKIE is valid!
            },
            responseType: 'stream'
        });

        // Set the correct MIME type
        res.setHeader('Content-Type', chunkResponse.headers['content-type'] || 'video/mp2t');

        // Pipe the response
        chunkResponse.data.pipe(res);
        console.log("Chunk sent to client.");

    } catch (error) {
        console.error("Error fetching chunk:", error.message);
        if (error.response) {
            console.error("Response Status:", error.response.status);
            console.error("Response Data:", error.response.data);
        }
        res.status(500).send('Error fetching video chunk. Hotlinking might be blocked.');
    }
});



// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
