import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
const port = 3000;
const app = express();

// app.use(express.json());
// app.use(express.urlencoded({extended:true}))

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/login.html");
});
app.get("/index", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});
app.get("/signup", (req, res) => {
  res.sendFile(__dirname + "/public/signup.html");
});
app.get("/signin", (req, res) => {
  res.sendFile(__dirname + "/public/login.html");
});
app.get("/booking", (req, res) => {
  res.sendFile(__dirname + "/public/booking.html");
});
app.get("/favourite", (req, res) => {
  res.sendFile(__dirname + "/public/favourite.html");
});
app.get("/massage", (req, res) => {
  res.sendFile(__dirname + "/public/massage.html");
});
app.get("/ratings", (req, res) => {
  res.sendFile(__dirname + "/public/ratings.html");
});
app.get("/searchResult", (req, res) => {
  res.sendFile(__dirname + "/public/searchResult.html");
});
app.get("/service", (req, res) => {
  res.sendFile(__dirname + "/public/service.html");
});
app.get("/spd", (req, res) => {
  res.sendFile(__dirname + "/public/spd.html");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
