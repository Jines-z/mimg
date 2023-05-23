const progress = require('progress')

const ProgressBar = ({ total, title }) => {
  return new progress(` ${title} [:bar] :current/:total`, {
    complete: '=',
    incomplete: ' ',
    width: 50,
    total: total
  })
}

module.exports = ProgressBar
