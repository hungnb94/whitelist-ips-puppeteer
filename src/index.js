const puppeteer = require('puppeteer');
const delay = require("./delay");


async function main(){
    const userDataDir = "/Users/hung/Library/Application Support/Google/Chrome for Testing"

    const browser = await puppeteer.launch({
        headless: false,
        browser: 'chrome',
        userDataDir: userDataDir,
        args: [
            '--profile-directory=Default',
            `--user-data-dir=${userDataDir}`
        ]
    });
    const page = await browser.newPage();

    await page.goto('https://ca.ovh.com/manager/#/dedicated/ip/148.113.171.178/firewall?ip=148.113.171.178');

    await page.setViewport({width: 1080, height: 1024});

    console.log('wait for load done')
    await page.waitForSelector('::-p-text(Manage Edge Network Firewall rules)')
    console.log('click add')
    await page.locator('.oui-icon .oui-icon-add').click();
    // await page.locator('::-p-text(Add a rule)').click();
    // await page.locator('text/My text').click();


    // Locate the full title with a unique string
    // const textSelector = await page.waitForSelector(
    //     'text/Customize and automate',
    // );
    // const fullTitle = await textSelector?.evaluate(el => el.textContent);

    await browser.close();
}

main()
