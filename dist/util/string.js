"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringUtil = void 0;
class StringUtil {
    static camelCase(str) {
        let words = str.split("-");
        if (words.length === 1) {
            words = str.split("_");
        }
        const capitalized = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
        return capitalized.join("");
    }
    static lowerCase(str) {
        str = this.camelCase(str);
        return str.charAt(0).toLowerCase() + str.slice(1);
    }
    static snakeCase(str) {
        return str.replace(/([A-Z])/g, "_$1").toLowerCase();
    }
    static kebabCase(str) {
        return str.replace(/([A-Z])/g, "-$1").toLowerCase();
    }
}
exports.StringUtil = StringUtil;
//# sourceMappingURL=string.js.map