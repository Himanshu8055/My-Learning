import puppeteer from "puppeteer";

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto("https://1024terabox.com", { waitUntil: 'domcontentloaded' });

    // Set the cookie correctly
    await page.setCookie({
        name: 'ndus',
        value: 'Yf7eDeyteHuiCS_vPrZK1as2XqV3zi9-J-4DLnHN',
        domain: 'www.1024terabox.com', // Corrected domain
        path: '/', // Ensure it applies site-wide
        httpOnly: false, // Set based on need
        secure: true // If using HTTPS
    });

    // Set required headers
    await page.setExtraHTTPHeaders({
        "Accept": "application/json, text/plain, */*",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
        "Cookie": "ndus=Yf7eDeyteHuiCS_vPrZK1as2XqV3zi9-J-4DLnHN;",  // Use your own cookies here
        "Referer": "https://www.1024terabox.com/play/video",
        "X-Requested-With": "XMLHttpRequest"
    });

    // Navigate to the TeraBox page first (ensures proper session cookies)
    await page.goto("https://www.1024terabox.com/play/video", { waitUntil: "networkidle2" });

    // Fetch video metadata using API
    const videoData = await page.evaluate(async () => {
        const response = await fetch("https://www.1024terabox.com/api/filemetas?app_id=250528&web=1&channel=dubox&clienttype=0&jsToken=A60D6D9F5C5983FDD97EFB2D69D06B862C53F54C569058A48F72A2267C507FF98F4BAD35296AA22B3B299A91CD19BE2B56BE597F5F6307048AE08A31CB4A9CD5&dp-logid=28993000835493050012&dlink=1&target=%5B%22%2F%5BSearch-%20%40VQLSE_Bot%5D%20S01E13%20Dragon%20Ball%20Daima%20480p.mkv%22%5D");
        
        return await response.json();  // Get JSON response
    });

    console.log("Response Data:", videoData);

    // Extract the direct video URL (Check API response structure)
    const directVideoUrl = videoData.info.dlink || videoData.video_url || videoData.download_url;
    console.log("Direct Video URL:", directVideoUrl);

    // Browser stays open for inspection
})();
