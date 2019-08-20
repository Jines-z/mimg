const ora      = require('ora')
const spinners = require('cli-spinners')

const Spinner = new ora({
    text: 'Verifying key ...\n',
    spinner: spinners.dots,
    color: 'white'
})

module.exports = Spinner
