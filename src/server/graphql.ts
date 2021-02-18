import { ApolloServer } from 'apollo-server-express'
import { buildSchema, NonEmptyArray } from 'type-graphql'
import { GraphQLSchema } from 'graphql'
import { config as AppConfig } from '../config/app'

export class graphqlServer{
    private _schema: Promise<GraphQLSchema>

    constructor(resolvers: NonEmptyArray<Function> | NonEmptyArray<string>){
        console.log("dirname", __dirname)
        this._schema = buildSchema({resolvers: resolvers})
    }

    async build(){
        const schema = await this._schema
        const server = new ApolloServer({
            schema,
            context: (ctx) => {
                return {
                    take: ctx.req.body.variables.take ? ctx.req.body.variables.take : AppConfig.pagination.limit,
                    skip: ctx.req.body.variables.skip ? ctx.req.body.variables.skip : 0,
                    user: ctx.req.user
                }
            }
        })
        return server
    }

}