import express from 'express'
import bodyParser from 'body-parser'
import routes from './routes/index.js'

const app = express()
const PORT = process.env.PORT || 3000


app.set('port', PORT)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public'))
routes(app)

app.listen(PORT, (req) => console.log('Server is started and running on port ' + PORT))
