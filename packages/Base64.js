const { fileSize, fileSource } = require('../lib/Utils')
const { exec } = require('child_process')
const chalk    = require('chalk')

const Base64 = async fileStr => {
    const size = await fileSize(fileStr) / 1000
    if (size > 1024) {
        console.log(`\n  ${chalk.red('Error: file is too big. Max. 1 MB per file.')} \n`)
        process.exit(0)
    } else {
        const data = await fileSource(fileStr)
        const base64 = data.toString('base64')
        console.log(`\n  ${chalk.green('Copyed to the clipboard')}`)
        console.log(`\n  data:image/png;base64,${base64.substr(0, 40)}...\n`)
        exec('clip').stdin.end(`data:image/png;base64,${base64}`)
    }
}

module.exports = {
    Base64
}