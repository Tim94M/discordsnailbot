var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var axios = require('axios');
var http = require('http');
http.createServer(function (req, res){
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Snailbot to rescue the world!');
}).listen(80);

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});

logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

var counter = 0;
bot.on('message', function (user, userID, channelID, message, evt) {
    if(userID == bot.id){
        return;
    }

    if (message.substring(0, 1) == '!') {
       var args = message.substring(1).split(' ');
       var cmd = args[0];
       
       args = args.splice(1);
        switch(cmd) {
            // !ping
            case 'snail':
                sendSnailVideo(channelID);
                counter = 0;
                return;
            case 'bob':
                sendBobRoss(channelID);
                return;
            default:
                sendMessage(channelID, 'Damit kann SnailBot nichts anfangen 🐌');
                return;
         }
     }

    if(++counter == 5){
        sendSnailVideo(channelID);
        counter = 0;
    }
});

function sendBobRoss(channelID){
    sendMessage(channelID, 'Mal schauen ob Bob Ross gerade online ist...');

    axios.defaults.headers.common['Client-ID'] = auth.twitchId;
    axios.get('https://api.twitch.tv/helix/streams?user_login=bobross', )
    .then(response => {
        return response.data.data[0];
    }).then(data => {
        if(data.type == 'live'){
            sendMessage(channelID, 'Glück gehabt, hier ist er!');
            sendMessage(channelID, 'https://www.twitch.tv/bobross');    
        }else {
            sendMessage(channelID, 'Bob Ross ist gerade nicht online :(');    
        }
    }).catch(error => {
        logger.error(error.message);
        sendMessage(channelID, 'Twitch scheint gerade nicht erreichbar zu sein :/');
    });  
}

function sendSnailVideo(channelID){
    sendMessage(channelID, 'Das Schneckenvideo ist viel zu lange her... bitte sehr!');
    sendMessage(channelID, 'https://www.youtube.com/watch?v=Sg_lJ4k1yY0');
}

function sendMessage(channelID, message){
    bot.sendMessage({
        to: channelID,
        message: message
    });
}