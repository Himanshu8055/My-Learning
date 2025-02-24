import puppeteer from "puppeteer";

const url = "https://teraboxlink.com/s/1O18S34W7Wi3dFxeN7AHSrA";

async function scrapeData(url) {
    const browser = await puppeteer.launch({
        devtools: true,
        headless: false
    });

    const page = await browser.newPage();

    // Navigate to the domain before setting the cookie
    await page.goto("https://1024terabox.com", { waitUntil: 'domcontentloaded' });

    // Set the cookie correctly
    await page.setCookie({
        name: 'ndus',
        value: 'YyV1ACyteHuiVb778NYj-GH9_sawpXVjmzI7G25N',
        domain: 'www.terabox.com', // Corrected domain
        path: '/', // Ensure it applies site-wide
        httpOnly: false, // Set based on need
        secure: true // If using HTTPS
    });

    // Now navigate to the target URL
    try {
        await page.goto(url, { waitUntil: 'networkidle2' });

        // Wait for some time (optional) to manually inspect the page
        await page.waitForTimeout(5000);
    } catch (err) {
        console.log("Error navigating to URL:", err);
    }
}

scrapeData(url);
