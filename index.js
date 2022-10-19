//initialize params
const { Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions } = require('discord.js');
const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
const { token } = require('./config.json');

const { EmbedClass } = require('./embed.js');
const embed = new EmbedClass();

const prefix = '!';

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

    if (cmd === 'embed'){
        const plswork = embed.emBuild();
        message.channel.send({ embeds: [plswork] });
    }
});

//logging in ( END OF FILE) //config in gitignore
client.login(token);