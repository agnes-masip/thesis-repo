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
    await page.goto("https://main.d1ranocpeacs6g.amplifyapp.com/login", {waitUntil: 'domcontentloaded', timeout: 60000})
  })
  
  await page.setViewport({ width: 1536, height: 714 })
  
  await synthetics.executeStep('Select email field', async function() {
    await page.waitForSelector('form #email-signin-input')
    await page.click('form #email-signin-input')
  })
  
  await synthetics.executeStep('Enter email', async function() {
    await page.type('form #email-signin-input', "canary@gmail.com")
  })

  await synthetics.executeStep('Select password field', async function() {
    await page.waitForSelector('form #password-signin-input')
    await page.click('form #password-signin-input')
  })

  await synthetics.executeStep('Enter password', async function() {
    await page.type('form #password-signin-input', 'canary')
  })
  
  await synthetics.executeStep('Login', async function() {
    await page.waitForSelector('.MuiBox-root:nth-child(1) > .MuiPaper-root > .MuiCardContent-root > form > .MuiButtonBase-root')
    await page.click('.MuiBox-root:nth-child(1) > .MuiPaper-root > .MuiCardContent-root > form > .MuiButtonBase-root')
  })
  
  await navigationPromise

  await sleep(10000) // wait for list load

  await synthetics.executeStep('Click_1', async function() {
    await page.waitForSelector('form #title')
    await page.click('form #title')
  })
  
  await synthetics.executeStep('Type_2', async function() {
    await page.type('form #title', "1TestList")
  })
  
  await synthetics.executeStep('Click_3', async function() {
    await page.waitForSelector('.MuiBox-root > .MuiPaper-root > form > .MuiFormGroup-root > .MuiButtonBase-root')
    await page.click('.MuiBox-root > .MuiPaper-root > form > .MuiFormGroup-root > .MuiButtonBase-root')
  })

  await sleep(10000)
  
  await synthetics.executeStep('Click_4', async function() {
    await page.waitForSelector('.MuiDataGrid-row:nth-child(1) > .MuiDataGrid-cell--withRenderer > .MuiDataGrid-actionsCell > a > .MuiButtonBase-root > .MuiSvgIcon-root')
    await page.click('.MuiDataGrid-row:nth-child(1) > .MuiDataGrid-cell--withRenderer > .MuiDataGrid-actionsCell > a > .MuiButtonBase-root > .MuiSvgIcon-root')
  })
  
  await synthetics.executeStep('Click_5', async function() {
    await page.waitForSelector('.MuiBox-root > .MuiBox-root > .MuiBox-root > .MuiButtonBase-root > .Link')
    await page.click('.MuiBox-root > .MuiBox-root > .MuiBox-root > .MuiButtonBase-root > .Link')
  })
  
  await synthetics.executeStep('Click_6', async function() {
    await page.waitForSelector('.MuiBox-root #title')
    await page.click('.MuiBox-root #title')
  })
  
  await synthetics.executeStep('Type_7', async function() {
    await page.type('.MuiBox-root #title', "canarytest")
  })
  
  await synthetics.executeStep('Type_8', async function() {
    await page.type('.MuiBox-root #author', "canarytest")
  })

  await synthetics.executeStep('Enter year', async function(){
    await page.type('.MuiBox-root #year', '2023')
  })
  
  await synthetics.executeStep('Click_10', async function() {
    await page.waitForSelector('#add-submit-btn')
    await page.click('#add-submit-btn')
  })

  await sleep(10000)
  
  await synthetics.executeStep('Click_11', async function() {
    await page.waitForSelector('.MuiDataGrid-actionsCell > a > .MuiButtonBase-root > .MuiSvgIcon-root > path')
    await page.click('.MuiDataGrid-actionsCell > a > .MuiButtonBase-root > .MuiSvgIcon-root > path')
  })

  await sleep(3000)
  
  await synthetics.executeStep('Click_12', async function() {
    await page.waitForSelector('.MuiBox-root #title')
    await page.click('.MuiBox-root #title')
  })
  
  await synthetics.executeStep('Click_13', async function() {
    await page.waitForSelector('#edit-submit-btn')
    await page.click('#edit-submit-btn')
  })

  await sleep(10000)
  
  await synthetics.executeStep('Click_14', async function() {
    await page.waitForSelector('.MuiDataGrid-cell--withRenderer > .MuiDataGrid-actionsCell > #likefef30c7f-eb83-4cd8-8e40-c91fbfddf118 > .MuiSvgIcon-root > path')
    await page.click('.MuiDataGrid-cell--withRenderer > .MuiDataGrid-actionsCell > #likefef30c7f-eb83-4cd8-8e40-c91fbfddf118 > .MuiSvgIcon-root > path')
  })

  await sleep(10000)
  
  await synthetics.executeStep('Click_15', async function() {
    await page.waitForSelector('.MuiDataGrid-row > .MuiDataGrid-cell--withRenderer > .MuiDataGrid-actionsCell > .MuiButtonBase-root:nth-child(3) > .MuiSvgIcon-root')
    await page.click('.MuiDataGrid-row > .MuiDataGrid-cell--withRenderer > .MuiDataGrid-actionsCell > .MuiButtonBase-root:nth-child(3) > .MuiSvgIcon-root')
  })
  
  await synthetics.executeStep('Click_16', async function() {
    await page.waitForSelector('.Content > .Title > .MuiBox-root > .MuiButtonBase-root > .Link')
    await page.click('.Content > .Title > .MuiBox-root > .MuiButtonBase-root > .Link')
  })

  await sleep(10000)
  
  await synthetics.executeStep('Click_17', async function() {
    await page.waitForSelector('.MuiDataGrid-row:nth-child(1) > .MuiDataGrid-cell--withRenderer > .MuiDataGrid-actionsCell > .MuiButtonBase-root > .MuiSvgIcon-root')
    await page.click('.MuiDataGrid-row:nth-child(1) > .MuiDataGrid-cell--withRenderer > .MuiDataGrid-actionsCell > .MuiButtonBase-root > .MuiSvgIcon-root')
  })
  
  await sleep(10000) // wait for list load

  await synthetics.takeScreenshot("list page")
  
};
exports.handler = async () => {
    return await recordedScript();
};