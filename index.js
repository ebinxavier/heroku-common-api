let express = require('express');
let app = express();
let port = process.env.PORT || 3030
app.listen(port, () => {
    console.log("Listening to port",port);
})
app.get("/",(req,res)=>{
    res.send("Success");
})
