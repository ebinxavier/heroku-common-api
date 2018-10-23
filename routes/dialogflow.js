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
    let requiredFields = "";
    let responseTg = "Successfully turned "
        + req.body.queryResult.parameters.operation
        + " the "
        + req.body.queryResult.parameters.device
        + " in "
        + req.body.queryResult.parameters.room;

    if (!req.body.queryResult.parameters.operation)
        requiredFields += 'Turn it ON or OFF';
    if (!req.body.queryResult.parameters.device)
        requiredFields += 'Which device';
    if (!req.body.queryResult.parameters.room)
        requiredFields += 'Which room';
    if (requiredFields.length)
        responseTg = "Please specify " + requiredFields.join(',');


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
                "text": responseTg
            },
            "slack": {
                "text": "This is a text response for Slack."
            }
        }
    }
    res.send(response);

})
module.exports = router;
