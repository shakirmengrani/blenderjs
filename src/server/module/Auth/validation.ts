import * as jf from 'joiful'
import { IValidation } from '../../common/interfaces/validation'

export class RegisterValidation extends IValidation {
    
    @jf.string().required()
    name: string

    @jf.string().required().email()
    email: string

    @jf.string().required()
    mobile: string 

    @jf.string().required().min(6)
    password: string

    @jf.number().required()
    role_id: number

    constructor(params){
        super(params)
    }

}

export class LoginValidation extends IValidation {
    
    @jf.string().required()
    mobile: string 

    @jf.string().required().min(6)
    password: string

    constructor(params){
        super(params)
    }

}