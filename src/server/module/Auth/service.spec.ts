import 'mocha'
import { expect } from 'chai'
import { AuthService } from './service'
import { RegisterValidation, LoginValidation } from './validation'
import { connection } from '../../../library/typeorm'
import { ROLES } from '../../../constant/module'

describe("Test Auth Service", () => {
    let authService = new AuthService()
    
    // it("Register User", () => {
    //     return connection().then(() => {
    //         let payload = { name: "Shakir Mengrani", email: "shakir@example.com", password: "Shakir@786", mobile: "+921231234567", role_id: ROLES.CUSTOMER }
    //         const isValid = new RegisterValidation(payload).process()
    //         expect(isValid.length).eq(0, isValid.join(", "))
    //         return authService.register(payload, ROLES.CUSTOMER).then(user => {
    //             expect(user).ownProperty("name", "Shakir Mengrani")
    //         }, err => expect(err.message).to.eq(null || undefined))
    //     }, err => expect(err.message).to.eq(null || undefined))
    // })

    // it("Login User", () => {
    //     return connection().then(() => {
    //         let payload = { password: "Shakir@786", mobile: "+921231234567" }
    //         const isValid = new LoginValidation(payload).process()
    //         expect(isValid.length).eq(0, isValid.join(", "))
    //         return authService.login(payload).then(token => {
    //             console.log(token)
    //         }, err => expect(err.message).to.eq(null || undefined))
    //     }, err => expect(err.message).to.eq(null || undefined))
    // })
})