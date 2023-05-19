import puppeteer from "https://deno.land/x/puppeteer@16.2.0/mod.ts"

console.log("Generating PDF...")
const browser = await puppeteer.launch()
const page = await browser.newPage()
await page.goto("http://localhost:8000", {
  waitUntil: "networkidle2",
})
await page.pdf({ path: "resume.pdf", format: "letter" })

await browser.close()
