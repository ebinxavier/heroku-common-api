let express = require("express");
let cors = require("cors");
let bodyParser = require("body-parser");

let dialogflow = require("./routes/dialogflow");
let personal = require("./routes/personal");
let mailer = require("./routes/mailer");
let tg = require("./routes/tg");
let jsChat = require("./routes/tg-js-chat");
let youtubeClone = require("./routes/youtube-clone");
let {
  handleSocketConnectionWhatsapp,
  apis: whatsappClone,
} = require("./routes/whatsapp-clone");

let app = express();
let port = process.env.PORT || 3030;

const server = require("http").createServer(app);
const io = require("socket.io")(server);
handleSocketConnectionWhatsapp(io);

server.listen(port, () => {
  console.log("Listening to port : ", port);
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.use("/dialogflow", dialogflow);
app.use("/personal", personal);
app.use("/mailer", mailer);
app.use("/tg", tg);
app.use("/js-chat", jsChat);
app.use("/youtube-clone", youtubeClone);
app.use("/whatsapp-clone", whatsappClone);
