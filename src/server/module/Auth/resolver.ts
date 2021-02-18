import { Resolver, Query, Arg, Mutation, Ctx } from "type-graphql";
import { Context } from '../../common/interfaces/context'
import { AuthService } from './service'
import { User } from '../../../entity/User'
import { LoginResponse, UserRequest } from './type'
import * as messages from '../../../constant/message'

@Resolver()
export class AuthResolver {
    private authService: AuthService = new AuthService()

    @Query(() => LoginResponse, {description: "Get user auth token"})
    async login(@Arg("mobile") mobile: string, @Arg("password") password: string): Promise<LoginResponse | Error>{
        return await this.authService.login({mobile, password})
    }

    @Mutation(() => User, {description: "Register new user"})
    async register(@Arg("data") params: UserRequest, @Arg("role_id") role_id: number): Promise<User | Error>{
        return await this.authService.register(params, role_id)
    }

    @Query(() => User, {description: "Get logged-in user details"})
    async profile(@Ctx() ctx: Context): Promise<User | Error>{
        if(ctx.user){
            return await this.authService.me(ctx.user.id || 0)
        }else{
            throw new Error(messages.ErrorMsg.ACCESS_DENIED)
        }
    }

}