const { fileSize, fileSource } = require('../lib/Utils')
const Banner = require('../lib/Banner')
const chalk = require('chalk')
const clipboard = require('clipboardy')

const Base64 = async fileStr => {
  await Banner()
  const size = await fileSize(fileStr) / 1000
  if (size > 1024) {
    console.log(`\n  ${chalk.red('Error: convert base64, maximum file size cannot exceed 1MB.')} \n`)
    process.exit(0)
  } else {
    const data = await fileSource(fileStr)
    const base64 = data.toString('base64')
    clipboard.writeSync(`data:image/png;base64,${base64}`)
    console.log(`\n  ${chalk.green('Copyed to the clipboard')}`)
    console.log(`\n  data:image/png;base64,${base64.substr(0, 40)}...\n`)
  }
}

module.exports = {
  Base64
}