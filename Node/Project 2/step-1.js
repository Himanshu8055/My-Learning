const puppeteer = require('puppeteer');

const cookie = {
    name: 'ndus',
    value: 'Yf7eDeyteHuiCS_vPrZK1as2XqV3zi9-J-4DLnHN',
    path: '/',
    httpOnly: true,
    secure: true
};

async function app(url) {
    const browser = await puppeteer.launch({
        headless: false,  // Run with a visible browser
        devtools: true,   // Open DevTools
        args: ['--disable-blink-features=AutomationControlled'] // Prevent bot detection
    });

    const page = await browser.newPage();

    // Step 1: Set higher timeout and go to the URL
    try {
        await page.goto(url, {
            waitUntil: 'networkidle0', // Wait for the network to be idle
            timeout: 60000  // Increase timeout to 60 seconds
        });
    } catch (error) {
        console.error('❌ Page load timeout:', error.message);
        await browser.close();
        return;
    }

    // Step 2: Get the final redirected domain
    const finalUrl = page.url();
    const urlObj = new URL(finalUrl);
    cookie.domain = urlObj.hostname;
    console.log(`✅ Final redirected domain: ${cookie.domain}`);

    // Step 3: Set cookie for the final domain
    await page.setCookie(cookie);
    console.log(`🍪 Cookie set for ${cookie.domain}`);

    // Step 4: Refresh page to apply the cookie
    await page.reload({ waitUntil: 'networkidle0' });
    console.log(`🔄 Page refreshed for ${cookie.domain}`);


    // Write code for "save to terabox"

    // Keep the browser open for debugging

}

const url = "https://teraboxlink.com/s/1KDxMoG2aTjjX_Ko3NeLomg";
app(url);
