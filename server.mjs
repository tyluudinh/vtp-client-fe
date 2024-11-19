import axios from "axios";
import compression from "compression";
import cors from "cors";
import express from "express";
import path from "path";

const app = express();
const __dirname = path.resolve();
const port = 80;

app.use(cors());

app.use(compression());
// Static files middleware with Cache-Control headers and exclusions
app.use(express.static("dist"));

app.get("*", async (req, res) => {
  return res.sendFile(__dirname + "/dist/index.html");
});

app.listen(port, () => {
  console.log("App listening on port " + port);
});
