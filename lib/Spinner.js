const ora = require('ora')

const Spinner = new ora({
  text: 'Verifying key ...\n',
  color: 'white'
})

module.exports = Spinner
