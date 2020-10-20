"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var app_1 = __importDefault(require("../config/app"));
var default_1 = /** @class */ (function () {
    function default_1(port) {
        this.app = express_1.default();
        this.port = port;
        this.app.use(body_parser_1.default.json());
        this.initModules();
    }
    default_1.prototype.initModules = function () {
        var _this = this;
        this.app.get("/", function (req, res) {
            res.status(200).json({ message: "Hello World" });
        });
        app_1.default.modules.forEach(function (module) {
            _this.app.use('/', module === null || module === void 0 ? void 0 : module.routes);
        });
    };
    default_1.prototype.listen = function () {
        this.app.listen(this.port);
    };
    return default_1;
}());
exports.default = default_1;
