let express = require('express');
let router = express.Router();
const TelegramBot = require('node-telegram-bot-api');

router.use((req, res, next)=>{
    next();
});

router.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html');
})

// replace the value below with the Telegram token you receive from @BotFather
const token = '692564636:AAFPToeWo4-f132zRNalvT88dOjJhfGJJjU';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});



// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
console.log('msg', msg)
  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, "Got it");
  bot.sendMessage('-396480277', "Got Message");
});




// bot.sendVideo('-396480277', "./video1.mp4").then(res=>{
//         console.log('res', res);
// })

router.get('/send-text',(req,res)=>{
    try{
    const {to='-396480277',text} = req.query;
    bot.sendMessage(to, text).then(response=>{
        console.log('res', response);
        res.send(response);
    },(err=>{
        res.send(err);
    }))
}
catch(e){
    res.send(e);
}
})



module.exports = router;