const { readFileSync, writeFileSync } = require('fs')
const path     = require('path')
const chalk    = require('chalk')
const KEY_PATH = path.resolve(__dirname, '../', '.key')
const Key      = readFileSync(KEY_PATH, 'utf-8')

const setKey = key => {
    writeFileSync(KEY_PATH, key)
    console.log(chalk.green('\n Succeed ! \n'))
}

module.exports = {
    Key,
    setKey
}
