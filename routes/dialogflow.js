let express = require('express');
let router = express.Router();

router.use((req, res, next) => {
    console.log('Middleware execuited');
    next();
});

router.get('/', (req, res) => {
    console.log('dialogflow root');
    res.send('Success!!');
})


router.post('/handleInput', (req, res) => {
    console.log(req.body.queryResult.parameters);
    let response = {
        "payload": {
            "google": {
                "expectUserResponse": true,
                "richResponse": {
                    "items": [
                        {
                            "simpleResponse": {
                                "textToSpeech": "this is a simple response"
                            }
                        }
                    ]
                }
            },
            "telegram": {
                "text": "Successfully turned "
                    + req.body.queryResult.parameters.operation
                    + " the "
                    + req.body.queryResult.parameters.device
                    + " in "
                    + req.body.queryResult.parameters.room
            },
            "slack": {
                "text": "This is a text response for Slack."
            }
        }
    }
    res.send(response);

})
module.exports = router;
