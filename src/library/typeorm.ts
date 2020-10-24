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
        synchronize: true,
        logging: true,
        entities: [
            `${__dirname}/../entity/**/*.ts`
        ]
    })
}



// .then(async connection => {

//     console.log("Inserting a new user into the database...");
//     const user = new User();
//     user.firstName = "Timber";
//     user.lastName = "Saw";
//     user.age = 25;
//     await connection.manager.save(user);
//     console.log("Saved a new user with id: " + user.id);

//     console.log("Loading users from the database...");
//     const users = await connection.manager.find(User);
//     console.log("Loaded users: ", users);

//     console.log("Here you can setup and run express/koa/any other framework.");

// }).catch(error => console.log(error));
