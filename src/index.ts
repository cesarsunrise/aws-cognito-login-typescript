import "dotenv/config";
import app from "./server";
// import { DBConnection, IConfigDBManager } from "@sunrise/validatorhelper";

// const config: IConfigDBManager = {
//   dbHost: "localhost",
//   dbName: "test",
//   dbPassword: "",
//   dbUsername: "root",
//   dbPort: 3306,
// };
// DBConnection.config(config);

const PORT = parseInt(String(process.env.API_PORT)) || 9090;
app.listen(PORT, () => console.log("RUNNING ON PORT: ", PORT));
