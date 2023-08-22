import { Options, Sequelize } from "sequelize";
import AWS from "aws-sdk";
import { Signer, SignerConfig } from "@aws-sdk/rds-signer";

export interface IConfigDBManager {
  dbName: string;
  dbUsername: string;
  dbPassword: string;
  dbHost: string;
  dbPort: number;
  dbRegion?: string;
  isRDS?: boolean;
}

export class DBConnection {
  private static instance: Sequelize;
  private static configManager: IConfigDBManager;

  private constructor() {}

  public static config() {
    this.configManager = {
      dbHost: "localhost",
      dbName: "test",
      dbPassword: "",
      dbUsername: "root",
      dbPort: 3306,
    };
    //return this;
  }

  public static getInstance(): Sequelize {
    this.config();
    if (!DBConnection.instance) {
      const { dbPassword, connectionOptions } = this.dbOptions();
      DBConnection.instance = new Sequelize(
        this.configManager.dbName,
        this.configManager.dbUsername,
        dbPassword,
        connectionOptions
      );
    }

    return DBConnection.instance;
  }

  private static dbOptions(): {
    dbPassword: string;
    connectionOptions: Options;
  } {
    let dbPassword = this.configManager.dbPassword;

    let connectionOptions: Options = {
      host: this.configManager.dbHost,
      dialect: "mysql",
      port: this.configManager.dbPort,
      logging: false,
    };

    const requireSignature = this.configManager.isRDS || false;

    /*if (requireSignature) {
      dbPassword = await this.getSignedToken();
      connectionOptions = {
        ...connectionOptions,
        dialectOptions: {
          ssl: "Amazon RDS",
          authPlugins: {
            mysql_clear_password: () => () => Buffer.from(dbPassword + "\0"),
          },
        },
      };
    }*/

    return { dbPassword, connectionOptions };
  }

  private static signer(): Signer {
    const signerOptions: SignerConfig = {
      region: this.configManager.dbRegion,
      hostname: this.configManager.dbHost,
      port: this.configManager.dbPort,
      username: this.configManager.dbUsername,
    };
    return new Signer(signerOptions);
  }

  private static async getSignedToken(): Promise<string> {
    const signer = this.signer();
    return await signer.getAuthToken();
  }
}
