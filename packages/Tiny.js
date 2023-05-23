const cwd = process.cwd()
const tinify = require('tinify')
const chalk = require('chalk')
const path = require('path')
const Banner = require('../lib/Banner')
const Spinner = require('../lib/Spinner')
const ProgressBar = require('../lib/ProgressBar')
const Div = require('../lib/Div')
const { Key } = require('./Key')
const { writeFile } = require('fs')
const { readDir, fileSize, fileSource, toPercent, clear } = require('../lib/Utils')

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
      Spinner.stop()
      resolve()
    })
  })
}

const compressBF = (sourceData, file) => {
  return new Promise((resolve, reject) => {
    tinify.fromBuffer(sourceData).toBuffer(function (err, resultData) {
      if (err) {
        throw err
        process.exit(0)
      }
      writeFile(file, resultData, async err => {
        if (err) {
          throw err
          process.exit(0)
        }
        const resultSize = await fileSize(file)
        resolve(resultSize)
      })
    })
  })
}

const compressFile = async (file, progress) => {
  const defaultSize = await fileSize(file)
  const name = path.basename(file)
  const sourceData = await fileSource(file)
  const resultSize = await compressBF(sourceData, file)
  progress.tick();
  return {
    name,
    defaultSize,
    resultSize,
    result: '-' + toPercent(resultSize, defaultSize)
  }
}

const compress = async fileStr => {
  await Banner()
  await validate()
  let files = fileStr ? fileStr.split(',') : await readDir(cwd)
  if (files.length === 0) {
    Spinner.stop()
    console.log(` ${chalk.red('Error: no images found')} \n`)
    process.exit(0)
  }
  const progress = ProgressBar({ title: 'In compression', total: files.length })
  const promiseCompress = files.map(file => {
    console.log(` ${file}`);
    return compressFile(file, progress)
  })
  console.log();
  progress.tick(0);
  const result = await Promise.all(promiseCompress)
  clear()
  await Banner()
  Div(result)
  const count = parseInt(compressionCount()) < 50 ? chalk.red(compressionCount()) : chalk.green(compressionCount())
  console.log(`\n ${chalk.green('Compression completed ! ')}Remaining amount: ${count} \n`)
}

module.exports = {
  compress
}
