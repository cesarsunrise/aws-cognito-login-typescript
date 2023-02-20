import "dotenv/config";
import app from "./server";

const PORT = parseInt(String(process.env.API_PORT)) || 9090;
app.listen(PORT, () => console.log("RUNNING ON PORT: ", PORT));
