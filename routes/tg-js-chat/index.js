let express = require("express");
let router = express.Router();
const TelegramBot = require("node-telegram-bot-api");
const { VM } = require("vm2");

const vm = new VM({
  // console: "inherit",
  timeout: 1000,
  // sandbox: {},
  // require: {
  //   external: true,
  //   builtin: ["fs", "path"],
  //   root: "./",
  //   mock: {
  //     fs: {
  //       readFileSync() {
  //         return "Nice try!";
  //       },
  //     },
  //   },
  // },
});

router.use((req, res, next) => {
  next();
});

const execute = (code) => {
  try {
    let log = vm.run(`
    var log = [];
    console.log = function() {
        log.push(arguments);
    };
    ${code}
    log
    `);
    let ret = vm.run(`
    console.log = function() {};
    ${code}
    `);
    const ans = { log, ret };
    return ans;
  } catch (error) {
    return { error };
  }
};

router.get("/exe", (req, res) => {
  const ans = execute(req.query.code);
  if (ans.error) {
    console.log("Error in Code!");
    res.send("" + ans.error);
  } else {
    console.log("ans", ans);
    ans.log = ans.log
      .map((e) => {
        let line = "";
        for (let i in e) line += (i !== "0" ? " " : "") + e[i];
        return line;
      })
      .join("\n");
    res.send(JSON.stringify(ans, null, 2));
  }
});
router.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// replace the value below with the Telegram token you receive from @BotFather
const token = "1295680736:AAHbr39fczYF6HYcNQenqhBbs5cZXCM-qos";

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

// Listen for any kind of message. There are different kinds of
// messages.
bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  console.log("jsChatBot:", msg.text);
  if (msg.text === "/start") {
    bot.sendMessage(chatId, "Welcome to jsChat by Ebin Xavier\n https://ebinxavier.github.io");
    return;
  }
  const ans = execute(msg.text);
  if (ans.error) {
    console.log("Error in Code!");
    bot.sendMessage(chatId, "" + ans.error);
  } else {
    ans.log = ans.log
      .map((e) => {
        let line = "";
        for (let i in e) line += (i !== "0" ? " " : "") + e[i];
        return line;
      })
      .join("\n");

    bot.sendMessage(chatId, ans.log + (ans.ret ? "\n" + ans.ret : ""));
  }
});

module.exports = router;
