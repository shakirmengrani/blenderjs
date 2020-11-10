import "reflect-metadata";
import {config as AppConfig} from '../config/app'
import {createConnection, Connection, Logger, QueryRunner} from "typeorm";

class MyLogger implements Logger{
    logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner) {
        throw new Error("Method not implemented.");
    }
    logQueryError(error: string, query: string, parameters?: any[], queryRunner?: QueryRunner) {
        throw new Error("Method not implemented.");
    }
    logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: QueryRunner) {
        throw new Error("Method not implemented.");
    }
    logSchemaBuild(message: string, queryRunner?: QueryRunner) {
        throw new Error("Method not implemented.");
    }
    logMigration(message: string, queryRunner?: QueryRunner) {
        throw new Error("Method not implemented.");
    }
    log(level: "warn" | "info" | "log", message: any, queryRunner?: QueryRunner) {
        throw new Error("Method not implemented.");
    }
    
}

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
