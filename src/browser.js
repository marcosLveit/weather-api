import puppeteer from 'puppeteer';

export async function start(){
    let browser;
    browser = await puppeteer.launch({
        headless: true,
        args: ["--disable-setuid-sandbox"],
        'ignoreHTTPSErrors': true
    });
    return browser;
}