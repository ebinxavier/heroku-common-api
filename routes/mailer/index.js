const nodemailer = require('nodemailer');
const express = require('express');
const { google } = require("googleapis");
const bodyParser = require('body-parser');

let router = express.Router();

router.use((req, res, next)=>{
    next();
});

router.use(bodyParser.json());

const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  "91088613789-7jairrnb7an7195olqejnu48gjerkbvu.apps.googleusercontent.com", // ClientID
  "fRw4L2I_gvdV_yatJFKu_riW", // Client Secret
  "https://developers.google.com/oauthplayground" // Redirect URL
);

const sendMail = (params)=>{
  return new Promise((resolve,reject)=>{
    const {from,to,sub,body} = params;
    let parsedToAddress;
    try{
      parsedToAddress = (typeof to == 'string'? JSON.parse(to): to).join(',')
    } catch(e){
      parsedToAddress = to;
    }
    oauth2Client.setCredentials({
              refresh_token: "1/FuFItnb9PKlUG6ox89dNG8n0euLHp1GQgRQXCkerQFg"
        });
    const accessToken = oauth2Client.getAccessToken();
    const smtpTransport = nodemailer.createTransport({
      service: "gmail",
      auth: {
           type: "OAuth2",
           user: "mailfromebinxavier@gmail.com", 
           clientId: "91088613789-7jairrnb7an7195olqejnu48gjerkbvu.apps.googleusercontent.com",
           clientSecret: "fRw4L2I_gvdV_yatJFKu_riW",
           refreshToken: "1/FuFItnb9PKlUG6ox89dNG8n0euLHp1GQgRQXCkerQFg",
           accessToken: accessToken
      }
    });

    const mailOptions = {
      from: from+" <donotreply@bar.com>",
      to:parsedToAddress,
      subject:sub,
      html: body
    };
    
    smtpTransport.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log('Failure: An Error occured'+ error);
          resolve({status:"failure"});
        } else {
          console.log('Success: Email sent: ' + info.response);
          resolve({status:"success"});
        }
      });
  })
}


router.get('/', (req,res)=>{
    res.sendFile(__dirname+'/index.html')
})

router.post('/send',async (req,res)=>{
  res.send(await sendMail(req.body));
})

router.get('/send', async (req,res)=>{
  res.send(await sendMail(req.query));
})

module.exports = router;