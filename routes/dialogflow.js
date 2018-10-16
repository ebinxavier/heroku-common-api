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
router.get('/getUsers',(req,res)=>{
    console.log('dialogflow users');
    res.send('Users are ready...');
})
module.exports = router;