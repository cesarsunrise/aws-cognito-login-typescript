export { Model, ModelStatic } from "sequelize";
export * from "./data/interfaces";
export * from "./models";
export * from "./connection";

export default function ValidateUserName(name: string): boolean {
  return name !== undefined && name.length > 10;
}
