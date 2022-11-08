//initialize params
const { Client, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const { EmbedClass } = require('./embed.js');
//const { WebScraper } = require('./scraper.js');
const { InfoScraper } = require('./genshindb.js');

const genshindb = require('genshin-db');

const prefix = '!';

//initialize classes
const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
const embed = new EmbedClass();
const scrape = new InfoScraper();

//initialize arrays
let charArr = scrape.characterScrape(); 
let weaponArr = scrape.weaponScrape(); 
let ascLvl = ['1', '2', '3', '4', '5', '6']; 

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

    //return characters
    else if (charArr.includes(cmd)){
        let search;
        let lvl;
        let type = 'char';

        if (ascLvl.includes(args[0])){
            search = cmd;
            lvl = args[0];
        }
        else{
            search = cmd;
            lvl = '7';
        }

        scrape.characterInfo(search).then((arr) => {
            let charInfo = arr[0];
            let matArr = scrape.characterMaterials(search, lvl);

            const plswork = embed.emBuild(charInfo['title'], charInfo['url'], charInfo['description'], charInfo['image'], type, matArr);
            message.channel.send({ embeds: [plswork] });
        
        });
        
    }

    //return weapons
    else if (weaponArr.includes(cmd)){ //oh fuck me weapons like primordial WINGED jade spear exist -,-
        let weapon = '';
        let lvlasc = 0;
        let type = 'weapon';

        /* if (con1 || con2 || con3){
            scrape.weaponMaterials(weapon, lvlasc);
        } */

        type = 'weapon';
        message.channel.send(cmd + ' found');
    }

});

//logging in ( END OF FILE) //config in gitignore
client.login(token);