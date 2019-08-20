const cwd           = process.cwd()
const tinify        = require('tinify')
const chalk         = require('chalk')
const path          = require('path')
const Banner        = require('../lib/Banner')
const Spinner       = require('../lib/Spinner')
const Div           = require('../lib/Div')
const { Key }       = require('./Key')
const { writeFile } = require('fs')
const { readDir, fileSize, fileSource, toPercent } = require('../lib/Utils')

const setKey = () => {
    tinify.key = Key
    // KvNz2HlAeLRh8IAC2C1La7QahI2crBzL
}

const compressionCount = () => {
    return 500 - tinify.compressionCount
}

const validate = () => {
    return new Promise((resolve, reject) => {
        Spinner.start()
        setKey()
        tinify.validate((err) => {
            if (err) {
                reject()
                throw err
                process.exit(0)
            }
            resolve()
        })
    })
}

const compressBF = (sourceData, file) => {
    return new Promise((resolve, reject) => {
        tinify.fromBuffer(sourceData).toBuffer(function(err, resultData) {
            if (err) {
                throw err
                process.exit(0)
            }
            writeFile(file, resultData, async err => {
                if(err){
                    throw err
                    process.exit(0)
                }
                const resultSize = await fileSize(file)
                resolve(resultSize)
            })
        })
    })
}

const compress = async fileStr => {
    await Banner()
    await validate()
    let files = fileStr ? fileStr.split(',') : await readDir(cwd)
    if (files.length === 0) {
        Spinner.stop()
        console.log(` ${chalk.red('Error: not found image')} \n`)
        process.exit(0)
    }
    let result = []
    for (let i = 0; i < files.length; i++) {
        Spinner.text = files[i] + ' \n'
        const size =  await fileSize(files[i])
        const defaultSize = size
        let resultObj = {
            name: path.basename(files[i]),
            defaultSize
        }
        const sourceData = await fileSource(files[i])
        const resultSize = await compressBF(sourceData, files[i])
        result.push({
            ...resultObj,
            resultSize: resultSize,
            result: '-' + toPercent(resultSize, defaultSize)
        })
        if (i == files.length -1) {
            Spinner.stop()
            Div(result)
            const count = parseInt(compressionCount()) < 50 ? chalk.red(compressionCount()) : chalk.green(compressionCount())
            console.log(`\n ${chalk.green('Succeed ! ')}Remaining amount: ${count} \n`)
        }
    }
}

module.exports = {
    compress
}
