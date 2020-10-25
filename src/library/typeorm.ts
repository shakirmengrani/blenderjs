import "reflect-metadata";
import {config as AppConfig} from '../config/app'
import {createConnection, Connection} from "typeorm";

export function connection (): Promise<Connection>{
    return createConnection({
        type: "postgres",
        host: AppConfig.db.host,
        database: AppConfig.db.database,
        username: AppConfig.db.username,
        password: AppConfig.db.password,
        port:5432,
        synchronize: process.env.NODE_ENV == "development" ? true : false,
        logging: process.env.NODE_ENV == "development" ? true : false,
        entities: [
            `${__dirname}/../entity/**/*.ts`
        ]
    })
}
