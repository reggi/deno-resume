import { pdf } from "./mod.ts"
import { commandInput } from "../src/util.ts"

const { props, flags } = await commandInput()

await pdf(props, typeof flags.pdf == "string" ? flags.pdf : "resume.pdf")
