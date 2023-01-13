//initialize params
const { Client, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const { EmbedClass } = require('./classes/embed.js');
const { InfoScraper } = require('./classes/genshindb.js');
const { Wheel } = require('./classes/spinWheel.js');

const prefix = '!';

//initialize classes
const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
const embed = new EmbedClass();
const scrape = new InfoScraper();
const wheel = new Wheel();

//initialize arrays
let charArr = scrape.arrayScrape('char'); 
let weaponArr = scrape.arrayScrape('weapon'); 
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

    let search = cmd;
    let lvl;

    //default function
    var wrongInput = () => message.channel.send("Invalid argument, use !help to see valid commands");

    switch(true)
    {
        case cmd === 'ping':
            message.channel.send('pong!');
            break;
        //returns a list of possible commands
        case cmd === 'help':
            message.channel.send({ embeds: [embed.helpBuild()] });
            break;
        //LMAO
        case (charArr.includes(cmd) && args[0] === 'artifacts'):
            message.channel.send('not yet implemented');
            break;
        //return characters
        case charArr.includes(cmd):

            switch(true){
                case ascLvl.includes(second_cmd):
                    lvl = second_cmd;
                    break;
                case second_cmd == null:
                    lvl = '7';
                    break;
                default: 
                    lvl = 'bad';
                    break;
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
                wrongInput();
            }
            break;
        //return weapons
        case weaponArr.includes(cmd):

            switch(true){
                case ascLvl.includes(second_cmd):
                    lvl = second_cmd;
                    break;
                case second_cmd == null:
                    lvl = '7';
                    break;
                default: 
                    lvl = 'bad';
                    break;
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
                message.channel.send("Invalid argument, use !help to see valid commands");
            }
            break;
        //returns a random character or boss
        case cmd === 'random':
            const accepted = ['boss', 'character'];

            if (!accepted.includes(args[0])) {
                wrongInput();

            }
            else{
                let url;

                if (args[0] === 'character') {
                    url = wheel.capUrl('char');
                }
                else {
                    url = wheel.capUrl('boss');

                }

                wheel.wheelSpin(url).then((result) => {

                    const plswork = embed.spinBuild(result);
                    message.channel.send({ embeds: [plswork] });
                });
            }
            break;
        //shutdown button
        case cmd === 'shutdown':
            message.channel.send('shutting down...').then(() => {
                client.destroy();
            })
            break;
        default:
            wrongInput();
            break;

    }

});

//logging in ( END OF FILE) //config in gitignore
client.login(token);


