const figlet = require('figlet')

const Banner = () => {
    return new Promise((resolve, reject) => {
        figlet.text('MIMG', {font: 'Cyberlarge'}, function (err, data) {
            if (err) {
                reject(err)
                console.log('Something went wrong...')
                process.exit(0)
                return
            }
            console.log(data)
            resolve()
        })
    })
}

module.exports = Banner
