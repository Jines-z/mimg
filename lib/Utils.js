const { readdir, readFile, stat } = require("fs")

const isImage = fileName => {
    const reg = new RegExp(/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/)
    return reg.test(fileName)
}

const toPercent = (re, de) => {
    return (100 -((re / de) * 100)).toFixed(2) + '%'
}

const readDir = dir => {
    return new Promise((resolve, reject) => {
        readdir(dir, (err, files) => {
            if (err) {
                reject(err)
                throw err
                process.exit(0)
            }
            const imageFiles = files.filter(item => {
                return isImage(item)
            })
            resolve(imageFiles)
        })
    })
}

const fileSize = file => {
    return new Promise((resolve, reject) => {
        stat(file, (err, stats) => {
            if (err) {
                reject(err)
                throw err
                process.exit(0)
            }
            resolve(stats.size / 1024)
        })
    })
}

const fileSource = file => {
    return new Promise((resolve, reject) => {
        readFile(file, (err, sourceData) => {
            if (err) {
                reject(err)
                throw err
                process.exit(0)
            }
            resolve(sourceData)
        })
    })
}

module.exports = {
    readDir,
    fileSize,
    fileSource,
    isImage,
    toPercent
}
