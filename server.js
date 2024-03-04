const express = require('express')
const app = express()
const port = process.env.APP_PORT || 3000

app.set("view engine", "pug")
app.set('views', './views')
app.use(express.json())

const randomDelay = () => Math.floor(Math.random() * 3000) + 1
const errStatus = () => Math.random() < 0.1

app.use((req, res, next) => {
    if (errStatus()) {
        res.status(500)
        res.render('500', { delay: randomDelay() })
    } else {
        setTimeout(next, randomDelay())
    }
})

app.get('/', (req, res) => {
    res.status(200).send('Hello!')
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
