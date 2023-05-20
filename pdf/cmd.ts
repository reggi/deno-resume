import { pdf } from "./mod.ts";
import { commandInput } from "../src/util.ts";
import theme from '../theme.json' assert { type: 'json' }

const { props, flags } = await commandInput()

await pdf({theme, ...props}, typeof flags.pdf == 'string' ? flags.pdf : 'resume.pdf')