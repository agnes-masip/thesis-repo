var synthetics = require('Synthetics');
const log = require('SyntheticsLogger');

const recordedScript = async function () {
  let page = await synthetics.getPage();

let syntheticsConfiguration = synthetics.getConfiguration();

syntheticsConfiguration.withVisualCompareWithBaseRun(true);

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
  
  const navigationPromise = page.waitForNavigation()
  
  await synthetics.executeStep('Goto_0', async function() {
    await page.goto("https://main.d1ranocpeacs6g.amplifyapp.com/", {waitUntil: 'domcontentloaded', timeout: 60000})
  })
  
  await page.setViewport({ width: 1536, height: 714 })
  
  await synthetics.executeStep('Click_1', async function() {
    await page.waitForSelector('.MuiGrid-root > .MuiPaper-root > .MuiBox-root > .signInClass > .MuiFormControl-root:nth-child(1)')
    await page.click('.MuiGrid-root > .MuiPaper-root > .MuiBox-root > .signInClass > .MuiFormControl-root:nth-child(1)')
  })
  
  await synthetics.executeStep('Type_2', async function() {
    await page.type('.MuiBox-root #email', "canary@gmail.com")
  })
  
  await synthetics.executeStep('Type_3', async function() {
    await page.type('.MuiBox-root #password', "canary")
  })
  
  await synthetics.executeStep('Click_4', async function() {
    await page.waitForSelector('.MuiGrid-root > .MuiPaper-root > .MuiBox-root > .signInClass > .MuiButtonBase-root')
    await page.click('.MuiGrid-root > .MuiPaper-root > .MuiBox-root > .signInClass > .MuiButtonBase-root')
  })
  
  await navigationPromise

  await sleep(10000) // wait for list load

  await synthetics.executeStep('Click_5', async function() {
    await page.waitForSelector('.MuiDataGrid-actionsCell > a > #seecanaryList > .MuiSvgIcon-root > path')
    await page.click('.MuiDataGrid-actionsCell > a > #seecanaryList > .MuiSvgIcon-root > path')
  })

  await sleep(10000) // wait for details load

  await synthetics.takeScreenshot("list details page")
  
};
exports.handler = async () => {
    return await recordedScript();
};