const puppeteer = require('puppeteer');
const delay = require("./delay");

const ipRanges = [
    '103.21.244.0/22',
    '103.22.200.0/22',
    '103.31.4.0/22',
    '104.16.0.0/13',
    '104.24.0.0/14',
    '108.162.192.0/18',
    '131.0.72.0/22',
    '141.101.64.0/18',
    '162.158.0.0/15',
    '172.64.0.0/13',
    '173.245.48.0/20',
    '188.114.96.0/20',
    '190.93.240.0/20',
    '197.234.240.0/22',
    '198.41.128.0/17'
];

async function fillIpAddress(appFrame, index, ipaddress) {
    console.log(index, 'address', ipaddress)
    await appFrame.click('.oui-icon.oui-icon-add')
    // await appFrame.click('div > button.ui-select-match')
    // await appFrame.click(`button[id="ui-select-choices-row-0-${index}"]`)
    await appFrame.select('td > span.oui-select > select[id="actionSelect"]', 'string:permit')
    await appFrame.select('td > span.oui-select > select[id="protocolSelect"]', 'string:tcp')
    await appFrame.type('input[id="source"]', ipaddress);
    await appFrame.click('td > button[title="Validate"]')
}

async function main() {
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
    const url = 'https://ca.ovh.com/manager/#/dedicated/ip/148.113.171.178/firewall?ip=148.113.171.178'

    await page.goto(
        url,
        {waitUntil: "load"}
    );

    await page.setViewport({width: 1260, height: 1024});

    console.log('wait iframe')
    await delay(10000)
    const frameHandle = await page.waitForSelector('iframe[title="app"]')
    const appFrame = await frameHandle.contentFrame()
    for (let i = 0 ; i < ipRanges.length; i++) {
        await fillIpAddress(appFrame, i, ipRanges[i])
        await delay(30000)
    }
    await fillIpAddress(appFrame, 3, '')
    await delay(120000)

    await browser.close();
}

main()
