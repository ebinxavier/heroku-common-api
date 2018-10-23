let express = require('express');
let router = express.Router();

router.use((req, res, next)=>{
    next();
});

router.get('/',(req,res)=>{
    console.log('personal details root');
    res.send('personal details page');
})


router.post('/handleInput',(req,res)=>{
    console.log(req.body);
    res.send(req.body)

})
module.exports = router;