"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBConnection = void 0;
const sequelize_1 = require("sequelize");
const aws_sdk_1 = __importDefault(require("aws-sdk"));
class DBConnection {
    constructor() { }
    static config() {
        this.configManager = {
            dbHost: "localhost",
            dbName: "test",
            dbPassword: "",
            dbUsername: "root",
            dbPort: 3306,
        };
        //return this;
    }
    static getInstance() {
        this.config();
        if (!DBConnection.instance) {
            const { dbPassword, connectionOptions } = this.dbOptions();
            DBConnection.instance = new sequelize_1.Sequelize(this.configManager.dbName, this.configManager.dbUsername, dbPassword, connectionOptions);
        }
        return DBConnection.instance;
    }
    static dbOptions() {
        let dbPassword = this.configManager.dbPassword;
        let connectionOptions = {
            host: this.configManager.dbHost,
            dialect: "mysql",
            port: this.configManager.dbPort,
            logging: false,
        };
        const requireSignature = this.configManager.isRDS || false;
        if (requireSignature) {
            dbPassword = this.getSignedToken();
            connectionOptions = {
                ...connectionOptions,
                dialectOptions: {
                    ssl: "Amazon RDS",
                    authPlugins: {
                        mysql_clear_password: () => () => Buffer.from(dbPassword + "\0"),
                    },
                },
            };
        }
        return { dbPassword, connectionOptions };
    }
    static signer() {
        const signerOptions = {
            region: this.configManager.dbRegion,
            hostname: this.configManager.dbHost,
            port: this.configManager.dbPort,
            username: this.configManager.dbUsername,
        };
        return new aws_sdk_1.default.RDS.Signer(signerOptions);
    }
    static getSignedToken() {
        return this.signer().getAuthToken({
            username: this.configManager.dbUsername,
        });
    }
}
exports.DBConnection = DBConnection;
//# sourceMappingURL=connection.js.map