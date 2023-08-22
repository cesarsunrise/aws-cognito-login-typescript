import { Sequelize } from "sequelize";
export interface IConfigDBManager {
    dbName: string;
    dbUsername: string;
    dbPassword: string;
    dbHost: string;
    dbPort: number;
    dbRegion?: string;
    isRDS?: boolean;
}
export declare class DBConnection {
    private static instance;
    private static configManager;
    private constructor();
    static config(): void;
    static getInstance(): Sequelize;
    private static dbOptions;
    private static signer;
    private static getSignedToken;
}
