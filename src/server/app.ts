import express from 'express'
import bodyParser from 'body-parser'

const App: express.Application = express()
App.use(bodyParser.json())
App.get("/", (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(200).json({"message": "Hello World !"})
})

App.use(require("./routes").default)

export default App