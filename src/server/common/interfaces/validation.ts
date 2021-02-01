import { Validator, validate } from "joiful";

export abstract class IValidation{
    constructor(params){
        for(let param of Object.keys(params)){
            this[param] = params[param]
        }
    }

    process(){
        let { error } = validate(this)
        if(error){
            return error.details.map(detail => detail.message)
        }else{
            return []
        }
    }
}