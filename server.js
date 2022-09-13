const express = require("express");
const app = express();

const MongoClient = require("mongodb").MongoClient;
app.set("view engine", "ejs");

var db;

MongoClient.connect(
  "mongodb+srv://admin:qwer1234@cluster0.qesibq1.mongodb.net/?retryWrites=true&w=majority",
  function (err, client) {
    db = client.db("todoapp");

    if (err) {
      return console.log(err);
    }

    app.listen(3000, function () {
      console.log("listening on port 3000!");
    });
  }
);

// body-parser = 요청 데이터 해석
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/write", function (req, res) {
  res.sendFile(__dirname + "/write.html");
});

app.post("/add", function (req, res) {
  db.collection("post").insertOne(
    { 제목: req.body.title, 날짜: req.body.date },
    function (err, res) {
      console.log("저장완료");
    }
  );

  res.send("전송완료");
});

app.get("/list", function (req, res) {
  res.render("list.ejs");
});
