const nodemailer = require('nodemailer');
const express = require('express');
const { google } = require("googleapis");

let router = express.Router();

router.use((req, res, next)=>{
    next();
});

const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  "91088613789-7jairrnb7an7195olqejnu48gjerkbvu.apps.googleusercontent.com", // ClientID
  "fRw4L2I_gvdV_yatJFKu_riW", // Client Secret
  "https://developers.google.com/oauthplayground" // Redirect URL
);



router.get('/', (req,res)=>{
    res.sendFile(__dirname+'/index.html')
})

router.get('/send', (req,res)=>{
    console.log('req', req.query);
    const {from,to,sub,body} = req.query;

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
      to,
      subject:sub,
      text: body
    };
    
    smtpTransport.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log('Failure: An Error occured'+ error);
          res.send({status:"failure"});
        } else {
          console.log('Success: Email sent: ' + info.response);
          res.send({status:"success"});
        }
      });

    

})

module.exports = router;