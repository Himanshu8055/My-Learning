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
        headless: false,  // Keep browser open for debugging
        devtools: true,   // Open DevTools
        args: ['--disable-blink-features=AutomationControlled'] // Prevent bot detection
    });

    const page = await browser.newPage();

    // Step 1: Navigate to URL
    try {
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
    } catch (error) {
        console.error('❌ Page load timeout:', error.message);
        await browser.close();
        return;
    }

    // Step 2: Get final redirected domain
    const finalUrl = page.url();
    const urlObj = new URL(finalUrl);
    cookie.domain = urlObj.hostname;
    console.log(`✅ Final redirected domain: ${cookie.domain}`);

    // Step 3: Set cookie
    await page.setCookie(cookie);
    console.log(`🍪 Cookie set for ${cookie.domain}`);

    // Step 4: Refresh page to apply cookie
    await page.reload({ waitUntil: 'networkidle2', timeout: 60000 });
    console.log(`🔄 Page refreshed for ${cookie.domain}`);

    // Step 5: Click on the 2nd "Save to Terabox" button
    try {
        await page.waitForSelector('.action-bar-save', { timeout: 10000 });
        const elements = await page.$$('.action-bar-save');

        if (elements.length >= 2) {
            await elements[1].click(); // Click the 2nd button
            console.log('✅ Clicked on the second "Save to Terabox" button');

            // Step 6: Wait for the "Yes" confirmation button to appear
            await page.waitForSelector('.create-confirm.btn', { visible: true, timeout: 10000 });

            // ✅ Old Puppeteer version fix: Wait for 1 second before clicking
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Find the element and click
            const confirmYes = await page.$('.create-confirm');
            if (confirmYes) {
                await confirmYes.click(); // Click the confirmation button
                console.log('✅ Clicked on the "Yes" confirmation button after 1 second');
            } else {
                console.log('⚠️ Confirm button not found');
            }
        } else {
            console.log('⚠️ Less than 2 "Save to Terabox" buttons found');
        }
    } catch (error) {
        console.error('❌ Error during interaction:', error.message);
    }

    // Keep the browser open for debugging (remove this for automation)
}

const url = "https://teraboxlink.com/s/1KDxMoG2aTjjX_Ko3NeLomg";
app(url);
