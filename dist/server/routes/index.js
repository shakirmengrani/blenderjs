"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
fs_1.default.readdirSync(__dirname).forEach(function (file) {
    if (fs_1.default.statSync(__dirname + "/" + file).isDirectory()) {
        // router.use(`/${file}`, require(`./${file}/routes.js`));
        router.use("/" + file, require("./" + file + "/routes").default);
    }
});
exports.default = router;
