//initialize params
const { Client, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const { EmbedClass } = require('./embed.js');
const { WebScraper } = require('./scraper.js');

const prefix = '!';

//initialize classes
const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
const embed = new EmbedClass();
const scrape = new WebScraper();

//initialize arrays
let charArr = scrape.characterScrape(); 
let weaponArr = scrape.weaponScrape(); 
let ascLvl = [20, 30, 40, 50, 60, 70, 80, 90]; 

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

//values
let title = 'Heizou';
let url = 'https://discord.js.org/';
let desc = 'bleh';
let thumb = 'https://i.imgur.com/AfFp7pu.png'; //weapon/character img
let img = 'https://static.wikia.nocookie.net/gensin-impact/images/b/b1/Character_Shikanoin_Heizou_Full_Wish.png/revision/latest?cb=20220713042711.png'; //ascension material image?
let asc = 3;
let lvlvalue = 'meh';
let type = 'char';

//create new client instance
client.on('ready', () => {
    console.log('pls work');
    client.user.setActivity('Yanfei supremacy');
});

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
        const plswork = embed.emBuild(title, url, desc, thumb, img, asc, lvlvalue, type);
        message.channel.send({ embeds: [plswork] });
    }

    //return list of possible commands
    if (cmd === 'help'){
        message.channel.send({ embeds: [embed.helpBuild()] });
    }

    if (charArr.includes(cmd)){
        scrape.characterMaterials();
        //either scrape here and pass the results through to emBuild
        //or call the scrape in embed class and pass it through immediately...

        type = 'weapon';
        message.channel.send(cmd + ' found');
    }

    if (weaponArr.includes(cmd)){
        scrape.weaponMaterials();

        type = 'char';
        message.channel.send(cmd + ' found');
    }
});

//logging in ( END OF FILE) //config in gitignore
client.login(token);

//learn webscraping
    //https://www.youtube.com/watch?v=-3lqUHeZs_0&ab_channel=CodewithAniaKub%C3%B3w
    //https://www.npmjs.com/package/crawler