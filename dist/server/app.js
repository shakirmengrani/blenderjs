"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var App = express_1.default();
App.use(body_parser_1.default.json());
App.get("/", function (req, res, next) {
    res.status(200).json({ "message": "Hello World !" });
});
App.use(require("./routes").default);
exports.default = App;
