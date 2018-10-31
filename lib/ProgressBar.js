const progress = require('progress')

const ProgressBar = total => {
    return new progress(' [:bar]  :file', {
        complete: '\u001b[47m \u001b[0m',
        incomplete: '\u001b[37m \u001b[0m',
        width: 30,
        total: total
    })
}

module.exports = ProgressBar
