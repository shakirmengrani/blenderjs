import {config as AppConfig} from '../config/app'
import * as knex from 'knex'

const db = knex({
  debug: process.env.NODE_ENV == "production" ? false : true,
  client: AppConfig.db.dialect,
  connection: {
    host : AppConfig.db.host,
    user : AppConfig.db.username,
    password : AppConfig.db.password,
    database : AppConfig.db.database
  },
  log: {
      warn(message: any) {
        console.log(`warn: ${JSON.stringify(message)}`);
      },
      error(message: any) {
        console.log(`error: ${JSON.stringify(message)}`);
      },
      deprecate(message: any) {
        console.log(`deprecate: ${JSON.stringify(message)}`);
      },
      debug(message: any) {
        console.log(`debug: ${JSON.stringify(message)}`);
      }
  }
});

export default db