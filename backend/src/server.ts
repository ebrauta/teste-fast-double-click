import express from "express";
import router from "./routes";
import cors from "cors";

const app = express();
const url = process.env.URL || "http://localhost";
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

app.use("/", router);

app.listen(port, () => {
  console.log(`Servidor rodando em  ${url}:${port}`);
});
