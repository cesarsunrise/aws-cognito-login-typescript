"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Model = void 0;
var sequelize_1 = require("sequelize");
Object.defineProperty(exports, "Model", { enumerable: true, get: function () { return sequelize_1.Model; } });
__exportStar(require("./data/interfaces"), exports);
__exportStar(require("./models"), exports);
__exportStar(require("./connection"), exports);
function ValidateUserName(name) {
    return name !== undefined && name.length > 10;
}
exports.default = ValidateUserName;
//# sourceMappingURL=index.js.map