let express = require('express');
let app = express();
let port = process.ENV.PORT || 3000
app.listen(port, () => {
    console.log("Listening to port",port);
})
app.get("/",(req,res)=>{
    res.send("Success");
})
