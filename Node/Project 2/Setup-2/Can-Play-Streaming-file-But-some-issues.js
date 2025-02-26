const express = require('express');
const axios = require('axios');
const cors = require('cors');
const stream = require('stream');
const { Transform } = require('stream');

const app = express();
const PORT = 3000;
const port = 3000; // Or your desired port

// Enable CORS for all requests
app.use(cors({ origin: '*' }));

// Streaming URL
const STREAM_URL = "https://www.1024terabox.com/api/streaming?path=%2F%5BSearch-%20%40VQLSE_Bot%5D%20S01E13%20Dragon%20Ball%20Daima%20480p.mkv&app_id=250528&clienttype=0&type=M3U8_FLV_264_480&vip=0";

// **IMPORTANT:** Replace with your valid and up-to-date cookie!
const COOKIE = "ndus=Yf7eDeyteHuiCS_vPrZK1as2XqV3zi9-J-4DLnHN"; // Replace with your actual cookie

app.get('/stream', async (req, res) => {
    try {
        console.log("Request received at /stream"); // Log when /stream is hit
        const response = await axios.get(STREAM_URL, {
            headers: {
                'User-Agent': 'Mozilla/5.0',
                'Referer': 'https://www.1024terabox.com/',
                'Cookie': COOKIE
            },
            responseType: 'stream',
        });

        console.log("M3U8 Response Headers:", response.headers); // Log M3U8 headers
        res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
        res.setHeader('Content-Disposition', 'inline; filename="video.m3u8"');

        // Step 3: Modify chunk url v4.freeterabox.com to localhost (temporary)
        const modifyToLocalhostStream = new Transform({
            transform(chunk, encoding, callback) {
                let modifiedChunk = chunk.toString('utf8');
                console.log("Original M3U8 Chunk:\n", modifiedChunk.substring(0, 200) + "..."); // Log first 200 chars of original M3U8
                modifiedChunk = modifiedChunk.replace(/https:\/\/v4\.freeterabox\.com/g, `http://localhost:${port}/chunk-proxy`);
                console.log("Modified M3U8 Chunk:\n", modifiedChunk.substring(0, 200) + "..."); // Log first 200 chars of modified M3U8
                callback(null, modifiedChunk);
            }
        });

        response.data.pipe(modifyToLocalhostStream).pipe(res);
        console.log("Piping M3U8 stream to response");

    } catch (error) {
        console.error('Error fetching stream:', error.message);
        if (error.response) {
            console.error('Error Response Status:', error.response.status);
            console.error('Error Response Data:', error.response.data);
        }
        res.status(500).json({ error: 'Failed to fetch stream' });
    }
});

// Step 4: Chunk Proxy - Fetch original chunk and modify if needed (Step 4 & 5 combined for proxy and playability)
app.get('/chunk-proxy/*', async (req, res) => {
    try {
        console.log("Request received at /chunk-proxy", req.params[0]); // Log chunk proxy request and path
        const chunkPath = req.params[0]; // Get the path after /chunk-proxy/
        const originalChunkUrl = `http://${chunkPath}`; // Reconstruct original URL.  **IMPORTANT: Removed v4.freeterabox.com here and assumed path is already full path from M3U8 after replacement**
        console.log("Fetching original chunk from:", originalChunkUrl);

        const chunkResponse = await axios.get(originalChunkUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0',
                'Referer': 'https://www.1024terabox.com/',
                'Cookie': COOKIE // You might need to adjust cookie if chunk request needs different cookie or none
            },
            responseType: 'stream'
        });

        console.log("Chunk Response Headers:", chunkResponse.headers); // Log chunk headers
        res.setHeader('Content-Type', chunkResponse.headers['content-type']);

        chunkResponse.data.pipe(res); // Pipe the original chunk stream directly to the client
        console.log("Piping chunk stream to response");


    } catch (error) {
        console.error('Error fetching chunk from original source:', error.message);
        if (error.response) {
            console.error('Chunk Error Response Status:', error.response.status);
            console.error('Chunk Error Response Data:', error.response.data);
        }
        res.status(500).send('Error fetching video chunk.'); // Or send error as JSON
    }
});


app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

