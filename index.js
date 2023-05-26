require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const axios = require("axios");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/create-card", (req, res) => {
  const {title}  = req.body;
const {desc} = req.body;
const {start_date} = req.body;
const {due_date} = req.body;
  
  axios
    .post(
      `https://api.trello.com/1/cards?key=${process.env.apikey}&token=${process.env.token}&idList=${process.env.id_list}`,
      {
        title,
        desc: desc,
        due: new Date(due_date).toISOString(),
        start: new Date(start_date).toISOString(),
      }
    )
    .then((response) => {
      res.status(200).json({ success: true, cardId: response.data.id });
    })
    .catch((error) => {
      
      res
        .status(500)
        .json({ success: false, message: "Failed to add Trello card." });
    });
});


app.listen(process.env.PORT, () => {
  console.log(`Server is running....`);
});
