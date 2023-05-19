import { serveResume } from "./server.ts";

const dataFile = Deno.args[0]
const data = JSON.parse(await Deno.readTextFile(dataFile))
await serveResume({
  ...data,
  domain: "http://localhost:1337"
})