//initialize params
const { Client, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const { EmbedClass } = require('./embed.js');
const { InfoScraper } = require('./genshindb.js');

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
    const second_cmd = args[0];

    if (cmd === 'ping'){    
        message.channel.send('pong!');

    }

    else if (cmd === 'shutdown'){
        message.channel.send('shutting down...').then(() => {
            client.destroy();
        })
    }

    //return list of possible commands
    else if (cmd === 'help'){
        message.channel.send({ embeds: [embed.helpBuild()] });
    }

    //return characters
    else if (charArr.includes(cmd)){
        let search = cmd;
        let lvl;

        if (args[1] == null){
            if (ascLvl.includes(second_cmd)){
                lvl = second_cmd;
            }
            else if (second_cmd == null){
                lvl = '7';
            }
            else{
                lvl = 'bad';
            }
        }
        else{
            lvl = 'bad';
        }

        if (lvl != 'bad'){
            scrape.searchInfo(search, 'char').then((arr) => {
                let charInfo = arr[0];
                let matArr = scrape.ascensionMaterials(search, lvl, 'char');
    
                const plswork = embed.emBuild(charInfo['title'], charInfo['url'], charInfo['description'], charInfo['image'], matArr);
                message.channel.send({ embeds: [plswork] });
            
            });
        }
        else{
            message.channel.send("Invalid argument");
        }
        
        
    }

    //return weapons
    else if (weaponArr.includes(cmd)){
        let search = cmd;
        let lvl;

        if (args[1] == null){
            if (ascLvl.includes(second_cmd)){
                lvl = second_cmd;
            }
            else if (second_cmd == null){
                lvl = '7';
            }
            else{
                lvl = 'bad';
            }
        }
        else{
            lvl = 'bad';
        }

        if (lvl != 'bad'){
            scrape.searchInfo(search, 'weapon').then((arr) => {
                let weaponInfo = arr[0];
                let matArr = scrape.ascensionMaterials(search, lvl, 'weapon');
    
                const plswork = embed.emBuild(weaponInfo['title'], weaponInfo['url'], weaponInfo['description'], weaponInfo['image'], matArr);
                message.channel.send({ embeds: [plswork] });
            
            });
        }
        else{
            message.channel.send("Invalid argument");
        }

    }

});

//logging in ( END OF FILE) //config in gitignore
client.login(token);