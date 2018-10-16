let express = require('express');
let router = express.Router();

router.use((req, res, next)=>{
    console.log('Middleware execuited');
    next();
});

router.get('/',(req,res)=>{
    console.log('dialogflow root');
    res.send('Success!!');
})


router.post('/handleInput',(req,res)=>{
    
console.log(req.body.queryResult.parameters);
    res.send(req.body)

})
module.exports = router;
