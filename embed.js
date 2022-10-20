class EmbedClass
{
    constructor()
    {
        const { EmbedBuilder } = require('discord.js');
        
        this.exampleEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTimestamp()
            .setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' }); //might scrap this tbh
    }

    fieldBuild(asc, lvlvalue, type)
    {
        //base fields
        let exp;
        if (type == 'char'){
            exp = 'Exp books';
        }
        else{
            exp = 'Enhancement Ore';
        }

        this.exampleEmbed
            .addFields( 
                { name: exp, value: lvlvalue, inline: true },
                { name: 'Mora', value: lvlvalue, inline: true }, 
                { name: '\u200B', value: '\u200B' },
            );
        

        //additional fields (depending on ascension level)
        for(let i = 0; i<asc; i++)
        {
            this.exampleEmbed
                .addFields( { name: 'Inline field title', value: 'Some value here', inline: true } );
        };
    }

    emBuild(title, url, description, thumbnail, image, asc, lvlvalue, type)
    {
        this.exampleEmbed
            .setTitle(title)
            .setURL(url)
            .setDescription(description)
            .setThumbnail(thumbnail)
            .setImage(image);
        
        this.fieldBuild(asc, lvlvalue, type);

        return this.exampleEmbed;
    }

    helpBuild()
    {
        this.exampleEmbed
            .setTitle('Command list')
            .setColor(0x008B8B)
            .setDescription('A bot that shows the resources needed to ascend a certain character/weapon to the next level')
            .addFields(
                { name: '\u200B', value: '\u200B' },
                { name: '!help', value: 'Shows the command list', inline: false },
                { name: '!character', value: 'Shows base stats and all the materials needed to level to 90 (?)', inline: false },
                { name: '!character lvl 40', value: 'Shows materials needed to level from 30 to 40', inline: false },
                { name: '!weapon', value: 'Shows base stats and all the materials needed to level to 90 (?)', inline: false },
                { name: '!weapon lvl 50', value: 'Shows materials needed to level from 40 to 50', inline: false },
            )
        
        return this.exampleEmbed;
    }

}
module.exports.EmbedClass = EmbedClass;