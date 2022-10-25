const { EmbedBuilder } = require('discord.js');
const { WebScraper } = require('./scraper.js');
const scrape = new WebScraper();

class EmbedClass
{
    constructor()
    {
        this.exampleEmbed;
    }

    fieldBuild(asc, type) //probably need to redo this one
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
                { name: exp, value: 'something', inline: true },
                { name: 'Mora', value: 'something', inline: true }, 
                { name: '\u200B', value: '\u200B' },
            );
        
        
        //additional fields (depending on ascension level)
        if (asc == 20){
            for(let i = 0; i<3; i++)
            {
                this.exampleEmbed
                    .addFields( { name: 'yo', value: 'ffs', inline: true } );
            };
        }
        else{
            for(let i = 0; i<4; i++)
            {
                this.exampleEmbed
                    .addFields( { name: 'Inline field title', value: 'Some value here', inline: true } );
                    //.addFields( { name: name, value: matvalue, inline: true } );
            };
        }
    }

    emBuild(title, url, description, thumbnail, image, asc, type)
    {
        this.exampleEmbed = new EmbedBuilder()
            .setTitle(title)
            .setColor(0xFF33B8)
            .setURL(url)
            .setDescription(description)
            .setThumbnail(thumbnail)
            .setImage(image)
            .setTimestamp()
            .setFooter({ text: 'Source: <<addWebsite>>', iconURL: 'https://i.imgur.com/AfFp7pu.png' }); //maybe, or just maybe something fun
        

        this.fieldBuild(asc, type);

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
                { name: '!character', value: 'Shows base stats and all the materials needed to level to 90 (?)', inline: false },
                { name: '!character 40', value: 'Shows materials needed to level from 30 to 40', inline: false },
                { name: '!weapon', value: 'Shows base stats and all the materials needed to level to 90 (?)', inline: false },
                { name: '!weapon 50', value: 'Shows materials needed to level from 40 to 50', inline: false },
                { name: '!ping', value: 'pong!', inline: false },
            )
            .setTimestamp()
            .setFooter({ text: 'Source: <<addWebsite>>', iconURL: 'https://i.imgur.com/AfFp7pu.png' }); //maybe, or just maybe something fun
        
        return this.exampleEmbed;
    }

}
module.exports.EmbedClass = EmbedClass;