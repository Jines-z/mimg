#!/usr/bin/env node

const program = require('commander')
const { setKey } = require('../packages/Key')
const { compress } = require('../packages/Tiny')
const { Base64 } = require('../packages/Base64')
const { version } = require('../package')

program
  .version(version, '-v, --version')
  .command('set <key>')
  .description('Set your key')
  .action(function (dir, cmd) {
    setKey(dir)
  })

program
  .option('-a, --all', 'Compress all images in the folder', compress)
  .option('-f, --files  [file,file]', 'Single image compression, also bulk compression', compress)
  .option('-b, --base64 [file]', 'convert your images to base64', Base64)

program.parse(process.argv)

if (process.argv.slice(2).length === 0) {
  program.help()
}
