#!/usr/bin/env node

const program = require('commander')
const { setKey } = require('../packages/Key')
const { compress } = require('../packages/Tiny')

program
    .version('1.0.0', '-v, --version')
    .command('set <key>')
    .description('Set your key')
    .action(function (dir, cmd) {
        setKey(dir)
    })

program
    .option('-a, --all', 'Compress all images in the folder', compress)
    .option('-f, --files [file,file]', 'Single image compression, also bulk compression', compress)

program.parse(process.argv)

if (process.argv.slice(2).length === 0) {
    program.help()
}
