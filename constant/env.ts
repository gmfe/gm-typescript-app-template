import { resolve } from 'path'
import { argv } from 'yargs'

const PROJECT_NAME = 'react typescript babel demo'
const PROJECT_ROOT = resolve(__dirname, '../')

const IS_DEV = process.env.NODE_ENV !== 'production'
const IS_ANALYZE = !!argv.analyze

export { PROJECT_ROOT, PROJECT_NAME, IS_DEV, IS_ANALYZE }
