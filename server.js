const express = require('express')
const bodyParser = require('body-parser')
const scripts = require('./scriptManager')

const app = express()
app.use(bodyParser.json())

const PORT = process.env.PORT || 8080
const TOKEN = process.env.TOKEN

const listeners = {}

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
})

app.get('/index.html', function (req, res) {
    res.sendFile(__dirname + './index.html')
})

app.post('/register', function (req, res) {
    if (req.body.os && req.body.script && req.body.name) {
        let script = scripts[req.body.os.toLowerCase()][req.body.script.toLowerCase()]

        if (!script) req.sendStatus(404) // Script not found

        listeners[req.body.name] = {
            script: script,
            active: false
        } // Register listener

        res.sendStatus(201) // Created successfully
    } else res.sendStatus(400)
})

app.post('/listen', function (req, res) {
    if (req.body.name) {
        let listener = listeners[req.body.name]

        if (!listener) {
            res.sendStatus(404) // No listener registered
        } else if (!listener.active) {
            res.send(null) // Nothing to send
        } else {
            res.sendFile(listener.script)
            listeners[req.body.name].active = false 
        }
    } else res.sendStatus(400)
})


app.post('/getListeners', function (req, res) {
    if (req.body.token === TOKEN) {
        res.send(listeners)
    } else res.sendStatus(403)
})

app.post('/activateListener', function (req, res) {
    if (req.body.token === TOKEN) {
        if (listeners[req.body.name]) {
            listeners[req.body.name].active = true
            res.sendStatus(200)
        } else res.sendStatus(404)
    } else res.sendStatus(403)
})

app.post('/deactivateListener', function (req, res) {
    if (req.body.token === TOKEN) {
        if (listeners[req.body.name]) {
            listeners[req.body.name].active = false
            res.sendStatus(200)
        } else res.sendStatus(404)
    } else res.sendStatus(403)
})

app.post('/deleteListener', function (req, res) {
    if (req.body.token === TOKEN) {
        if (listeners[req.body.name]) {
            delete listeners[req.body.name]
            res.sendStatus(200)
        } else res.sendStatus(404)

    } else res.sendStatus(403)
})


app.listen(PORT, function () {
    console.log('Started on port ' + PORT)
})