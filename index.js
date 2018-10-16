let express = require('express');
let cors = require('cors')
let bodyParser = require('body-parser')

let dialogflow = require('./routes/dialogflow');

let app = express();
let port = process.env.PORT || 3030

app.use(cors())
app.use(bodyParser.json());

app.listen(port, () => {
    console.log("Listening to port : ",port);
})
app.get("/",(req,res)=>{
    res.send("Success");
})

app.use('/dialogflow',dialogflow);




