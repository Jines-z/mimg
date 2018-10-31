const ui    = require('cliui')()
const chalk = require('chalk')

const Div = list => {
    list.forEach(item => {
        const { name, defaultSize, resultSize, result } = item

        ui.div({
            text: name,
            padding: [0, 0, 0, 1],
            width: 25
        }, {
            text: defaultSize + 'KB → ' + resultSize + 'KB',
            width: 25
        }, {
            text: chalk.green(result)
        })
    })

    console.log(ui.toString())
}

module.exports = Div
