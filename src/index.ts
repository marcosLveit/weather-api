import bodyParser from "body-parser";
import express from "express";
import { getBasicData } from './handler';

const app = express();
const port = process.env.PORT || 3333;

app.use(express.json());
app.use(bodyParser.raw({ type: "application/vnd.custom-type" }));
app.use(bodyParser.text({ type: "text/html" }));

app.get("/", async (req, res) => {
  let response = await getBasicData();
  res.send("Hola");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
