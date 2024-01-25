const puppeteer = require('puppeteer')
const fs = require('fs')

const objectArray = []

const scrapper = async (url) => {
  console.log(url)

  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()

  await page.goto(url)
  await page.setViewport({ width: 1080, height: 1024 })

  try {
    await repeat(page, browser)

    const validObjects = objectArray.filter(
      (obj) => obj.title && obj.price && obj.img
    )

    await write(validObjects)
  } catch (error) {
    console.error('Error:', error)
  } finally {
    await browser.close()
  }
}

const repeat = async (page, browser) => {
  try {
    let shouldContinue = true

    while (shouldContinue) {
      const arrayDiv = await page.$$('.js-product-miniature-wrapper')

      for (const objectDiv of arrayDiv) {
        let img = await objectDiv.$eval('img', (el) => el.src)
        let title = await objectDiv.$eval(
          '.product-title a',
          (el) => el.textContent
        )
        let price = await objectDiv.$eval('.product-price', (el) =>
          parseFloat(el.textContent.replace('€', '').replace(',', '.'))
        )

        const object = {
          title,
          price,
          img
        }
        objectArray.push(object)
      }

      shouldContinue = await page.evaluate(() => {
        window.scrollBy(0, window.innerHeight)
        return document.body.scrollHeight > window.innerHeight
      })

      await page.waitForTimeout(1000)
    }
  } catch (error) {
    console.error('Error:', error)
  } finally {
    await write(objectArray)
    await browser.close()
  }
}

const write = async (objectArray) => {
  try {
    await fs.writeFile('objectStarWars.json', JSON.stringify(objectArray))
    console.log('Archivo escrito')
  } catch (error) {
    console.error('Error al escribir el archivo:', error)
  }
}

module.exports = { scrapper }
