import 'mocha'
import { expect } from 'chai'
import { Cryptor, aesEncryption } from './crypto'
import {config} from '../config/app'

describe("Cryptor", () => {
    it("make AES encryption", () => {
        let aes: aesEncryption = Cryptor.makeAES(config.auth.encryptKey)
        console.log(aes.encrypt("Shakir@786"))
    })
})