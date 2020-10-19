import fs from 'fs'
import express from 'express'

const router: express.Router = express.Router()

fs.readdirSync(__dirname).forEach(file => {
    if(fs.statSync(`${__dirname}/${file}`).isDirectory()){
        // router.use(`/${file}`, require(`./${file}/routes.js`));
        router.use(`/${file}`, require(`./${file}/routes`).default)
    }
})

export default router