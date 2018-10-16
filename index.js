let express = require('express');
let app = express();
console.log(process.env.port);
let port = 3000|process.env.port;
app.listen(port, () => {
    console.log("Listening to port",port);
})
app.get("/",(req,res)=>{
    res.send("Success");
})
