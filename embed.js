const { EmbedBuilder } = require('discord.js');

class EmbedClass
{
    constructor()
    {
        this.exampleEmbed;
    }

    fieldBuild(arr)
    {
        this.exampleEmbed
            .addFields( 
                { name: 'Mora', value: arr[0]['count'].toString(), inline: true }, 
                { name: '\u200B', value: '\u200B' },
            );
        
        
        //additional fields (depending on ascension level)
        for(let i = 1; i<arr.length; i++)
        {
            this.exampleEmbed
                .addFields( { name: arr[i]['name'], value: arr[i]['count'].toString(), inline: true } );
        }
    }

    emBuild(title, url, description, image, arr)
    {
        this.exampleEmbed = new EmbedBuilder()
            .setTitle(title)
            .setColor(0xFF33B8)
            .setURL(url)
            .setDescription(description)
            .setThumbnail('https://static.wikia.nocookie.net/gensin-impact/images/2/2a/Genshin-Impact-Logo.png/revision/latest/scale-to-width-down/1000?cb=20201013193256.png')
            .setImage(image)
            .setTimestamp()
        

        this.fieldBuild(arr);

        return this.exampleEmbed;
    }

    helpBuild()
    {
        this.exampleEmbed = new EmbedBuilder()
            .setTitle('Command list')
            .setColor(0x008B8B)
            .setDescription('A bot that shows the resources needed to ascend a certain character/weapon to the next level')
            .addFields(
                { name: '\u200B', value: '\u200B' },
                { name: '!help', value: 'Shows the command list', inline: false },
                { name: '!character', value: 'Shows all the materials needed to level to 90', inline: false },
                { name: '!character 1', value: 'Shows materials needed for first (lvl 20) ascension', inline: false },
                //{ name: '!character artifacts', value: 'Gives best artifact set and stats(?) for given character'}, (TBA)(LMAO)
                { name: '!weapon', value: 'Shows all the materials needed to level to 90', inline: false },
                { name: '!weapon 4', value: 'Shows materials needed for fourth (lvl 60) ascension', inline: false },
                { name: '!random character/boss', value: 'Returns a random character or boss', inline: false },
                { name: '!ping', value: 'pong!', inline: false },
                { name: '\u200B', value: '\u200B' },
                { name: 'Please note when searching with spaces', value: 'search for !kaedehara_kazuha or !primordial_jade_winged-spear', inline: false },
            )
            .setTimestamp()
        
        return this.exampleEmbed;
    }

    spinBuild(url)
    {
        this.exampleEmbed = new EmbedBuilder()
            .setTitle('You spun: ')
            .setColor(0x008B8B)
            .setImage(url)
            .setTimestamp()
        
        return this.exampleEmbed;
    }

}
module.exports.EmbedClass = EmbedClass;