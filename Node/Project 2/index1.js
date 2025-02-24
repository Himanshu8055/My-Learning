import puppeteer from 'puppeteer';

async function scrapePay4FansData() {

  const browser = await puppeteer.launch({
    headless: false, // Use "new" for the latest headless mode
    
  });
  const page = await browser.newPage();

  try {
    await page.goto('https://pay4fans.com/videoShare?surl=q8mr6GYNCtlDEfeDwc646w', { waitUntil: 'networkidle2' });

    // Extract video details
    const videoDetails = await page.evaluate(() => {
      const videoTitleElement = document.querySelector('.video-info .title');
      const videoDateElement = document.querySelector('.video-info .other span:nth-child(1)');
      const videoSizeElement = document.querySelector('.video-info .other span:nth-child(2)');
      const videoDurationElement = document.querySelector('.video-info .other span:nth-child(3)');

      return {
        title: videoTitleElement ? videoTitleElement.textContent : '',
        date: videoDateElement ? videoDateElement.textContent : '',
        size: videoSizeElement ? videoSizeElement.textContent : '',
        duration: videoDurationElement ? videoDurationElement.textContent : '',
      };
    });

    // Log and return the scraped data
    console.log('Video Details:', videoDetails);

    return videoDetails;

  } catch (error) {
    console.error('Scraping failed:', error);
    return null;
  } finally {
    await browser.close();
  }
}

// Run the scraper
scrapePay4FansData();
