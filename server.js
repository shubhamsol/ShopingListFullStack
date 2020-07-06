const express = require('express')
const mongoose = require('mongoose')
const config = require('config')


const app = express()
app.use(express.json())

const db = config.get('mongoURI')
mongoose.set('useUnifiedTopology', true);
mongoose.connect(db, { useNewUrlParser: true, useCreateIndex: true }).then(() => console.log('sucessful')).catch((err) => console.log(err))

app.use('/api/items', require('./Routes/api/items'))
app.use('/api/users', require('./Routes/api/users'))
app.use('/api/auth', require('./Routes/api/auth'))

const port = process.env.port || 5000


app.listen(port, () => { console.log('server started') })