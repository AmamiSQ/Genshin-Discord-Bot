//initialize params
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
const { token } = require('./config.json');

const { EmbedClass } = require('./embed.js');
const embed = new EmbedClass();

const prefix = '!';

let charArr = ['yanfei', 'albedo']; //use genshin.gg
let weaponArr = []; //use https://www.genshinlab.com/genshin-impact-weapon-list/

//push possible searches into arrays
    /*
        insert code
        might make this a function idk
        its aids but im lowkey having fun lmao
    */


//create new client instance
client.on('ready', () => {
    console.log('pls work');
    client.user.setActivity('Yanfei supremacy');
});

function searchCommand(search)
{
    return search;
    //function to loop through web search, probably
    //should also make an array for characters and weapons
        //DONT HARDCODE
        //also set to lower case when putting into the array

    /* 
    to take in !weapon lvl x y
    you need to write it like cmd === 'help' && args[0] === 'me'
    figure something out/make a function to make it easier
    especially for the ascension nums
    */
};


//commands
client.on('messageCreate', (message) =>
{
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    if (cmd === 'ping'){    
        message.channel.send('pong!');
    }

    if (cmd === 'shutdown'){
        message.channel.send('shutting down...').then(() => {
            client.destroy();
        })
    }

    if (searchCommand(cmd) === 'embed'){
        const plswork = embed.emBuild();
        message.channel.send({ embeds: [plswork] });
    }

    if (cmd === 'help'){
        message.channel.send('wassup');
        //return list of possible commands
        //also return description
            //i.e. how the bot works
    }

    if (charArr.includes(cmd)){
        message.channel.send(cmd + ' found');
    }

    if (weaponArr.includes(cmd)){
        message.channel.send(cmd + ' found');
    }
});

//logging in ( END OF FILE) //config in gitignore
client.login(token);

//learn webscraping
// https://medium.com/codex/learn-web-scraping-the-fun-way-with-a-discord-bot-704d3422a6a2
//installed requests, find an equivalent for beautifulsoup