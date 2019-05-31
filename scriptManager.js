const fs = require('fs')
const path = require('path')

const scripts = {}

function getMainScript (dir) {
  let file = path.join(dir, 'main.txt')
  let main = fs.readFileSync(file, 'utf8')
  return path.join(dir, main)
}

function getLastChild (dir) {
  return dir.split(path.sep).pop().toLowerCase()
}

function isDirectory (dir) {
  return fs.lstatSync(dir).isDirectory()
}

function isntHidden (dir) {
  return !/(^|\/|\\|\\\\)\./.test(dir)
}

function getSubDirs (dir) {
  dir = !path.isAbsolute(dir) ? path.join(__dirname, dir) : dir

  return fs.readdirSync(dir).map(name => path.join(dir, name)).filter(isDirectory).filter(isntHidden)
}

function readScripts () {
  let OSs = getSubDirs('DuckyScripts/')

  OSs.forEach(OS => {
    scripts[getLastChild(OS)] = {}

    let subdirs = getSubDirs(OS)
    subdirs.forEach(res => {
      scripts[getLastChild(OS)][getLastChild(res)] = getMainScript(res)
    })
  })
}

readScripts()

module.exports = scripts
