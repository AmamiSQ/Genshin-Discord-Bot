class EmbedClass
{
    constructor()
    {
        const { EmbedBuilder } = require('discord.js');
        
        this.exampleEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('weapon-name')
            .setURL('https://discord.js.org/')
            .setDescription('weapon-description')
            .setThumbnail('https://i.imgur.com/AfFp7pu.png') //weapon/character img
            .addFields(
                { name: 'Regular field title', value: 'Some value here' },
                { name: '\u200B', value: '\u200B' },
                { name: 'Inline field title', value: 'Some value here', inline: true },
                { name: 'Inline field title', value: 'Some value here', inline: true },
            )
            .addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
            .setImage('https://i.imgur.com/AfFp7pu.png') //ascension material image?
            .setTimestamp()
            .setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });
    }

    emBuild()
    {
        return this.exampleEmbed;
    }

}
module.exports.EmbedClass = EmbedClass;