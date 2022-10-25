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
let ascLvl = [20, 40, 50, 60, 70, 80]; 

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

    const args = message.content.slice(prefix.length);
    const cmd = args.toLowerCase();

    if (cmd === 'ping'){    
        message.channel.send('pong!');

    }

    else if (cmd === 'shutdown'){
        message.channel.send('shutting down...').then(() => {
            client.destroy();
        })
    }

    else if (cmd === 'embed'){
        const plswork = embed.emBuild(title, url, desc, thumb, img, asc, lvlvalue, type);
        message.channel.send({ embeds: [plswork] });
    }

    //return list of possible commands
    else if (cmd === 'help'){
        message.channel.send({ embeds: [embed.helpBuild()] });
    }

    else if (charArr.includes(cmd)){ //use includes to check for lvl
        let search = cmd.replace(/ /g, '-');

        title = cmd;
        type = 'char';

        //need to figure out how to get this in order ffs....
        //const plswork = embed.emBuild(title, url, desc, thumb, img, 20, type); //crashes bc js FUCKING SUCKS
        
        //message.channel.send({ embeds: [plswork] });
        console.log(scrape.characterMaterials(search));
    }

    else if (weaponArr.includes(cmd)){ //oh fuck me weapons like primordial WINGED jade spear exist -,-
        let weapon = '';
        let lvlasc = 0;

        /* if (con1 || con2 || con3){
            scrape.weaponMaterials(weapon, lvlasc);
        } */

        type = 'weapon';
        message.channel.send(cmd + ' found');
    }

});

//logging in ( END OF FILE) //config in gitignore
client.login(token);