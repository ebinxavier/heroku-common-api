let express = require('express');
let cors = require('cors')
let bodyParser = require('body-parser')

let dialogflow = require('./routes/dialogflow');
let personal = require('./routes/personal');
let mailer = require('./routes/mailer');
let tg = require('./routes/tg');

let app = express();
let port = process.env.PORT || 3030

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log("Listening to port : ",port);
})
app.get("/",(req,res)=>{
    res.sendFile(__dirname+'/index.html');
})

app.use('/dialogflow',dialogflow);
app.use('/personal',personal);
app.use('/mailer',mailer);
app.use('/tg',tg);




