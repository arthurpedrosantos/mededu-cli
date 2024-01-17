"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Log = void 0;
const color_1 = require("../colors/color");
class Log {
    static info(message) {
        console.log(`${color_1.Color.BgYellow}${color_1.Color.Reset}`, message);
    }
    static error(message) {
        console.log(`${color_1.Color.BgRed}${color_1.Color.Reset}`, message);
    }
    static success(message) {
        console.log(`${color_1.Color.BgGreen}${color_1.Color.Reset}`, message);
    }
}
exports.Log = Log;
//# sourceMappingURL=log.js.map