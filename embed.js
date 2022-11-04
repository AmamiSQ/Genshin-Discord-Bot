const { EmbedBuilder } = require('discord.js');
const { WebScraper } = require('./scraper.js');
const scrape = new WebScraper();

class EmbedClass
{
    constructor()
    {
        this.exampleEmbed;
    }

    fieldBuild(type, arr) //probably need to redo this one
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

    emBuild(title, url, description, image, type, arr)
    {
        this.exampleEmbed = new EmbedBuilder()
            .setTitle(title)
            .setColor(0xFF33B8)
            .setURL(url)
            .setDescription(description)
            .setThumbnail('https://static.wikia.nocookie.net/gensin-impact/images/2/2a/Genshin-Impact-Logo.png/revision/latest/scale-to-width-down/1000?cb=20201013193256.png')
            .setImage(image)
            .setTimestamp()
        

        this.fieldBuild(type, arr);

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
                { name: '!character 1', value: 'Shows materials needed for first ascension', inline: false },
                { name: '!weapon', value: 'Shows base stats and all the materials needed to level to 90 (?)', inline: false },
                { name: '!weapon 4', value: 'Shows materials needed for fourth ascension', inline: false },
                { name: '!ping', value: 'pong!', inline: false },
            )
            .setTimestamp()
            .setFooter({ text: 'Source: <<addWebsite>>', iconURL: 'https://i.imgur.com/AfFp7pu.png' }); //maybe, or just maybe something fun
        
        return this.exampleEmbed;
    }

}
module.exports.EmbedClass = EmbedClass;