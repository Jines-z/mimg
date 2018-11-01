const { readFile, stat } = require("fs")
const walk = require('walk')
const path = require('path')

const isImage = fileName => {
    const reg = new RegExp(/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/)
    return reg.test(fileName)
}

const toPercent = (re, de) => {
    return (100 -((re / de) * 100)).toFixed(2) + '%'
}

const formatSize = limit => {
    if (limit === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    const i = Math.floor(Math.log(limit) / Math.log(k))
    return (limit / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i]
}

const readDir = async dir => {
    const files = []
    return new Promise((resolve, reject) => {
        const walker = walk.walk(dir, {followLinks: false})
        walker.on('file', function (roots, stat, next) {
            files.push(path.resolve(roots, stat.name))
            next()
        })
        walker.on('end', function () {
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
            resolve(stats.size)
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
    toPercent,
    formatSize
}
