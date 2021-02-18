import { number } from "joiful";
import {InputType, ObjectType, Field } from "type-graphql";

@ObjectType()
export class LoginResponse{

    @Field(() => String)
    token: String | Error
    
    @Field(() => String)
    refreshToken: String | Error
}

@InputType()
export class UserRequest{
    
    @Field(() => String, {nullable: true})
    name: string

    @Field(() => String, {nullable: true})
    email: string

    @Field(() => String, {nullable: true})
    mobile: string

    @Field(() => String, {nullable: true})
    password: string

    @Field(() => Boolean, {defaultValue: true, nullable: true})
    isActive: boolean 
}