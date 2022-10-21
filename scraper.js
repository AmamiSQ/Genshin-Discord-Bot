const cheerio = require('cheerio');
const axios = require('axios');

class WebScraper
{
    constructor()
    {
        this.expVal = 0;
        this.moraVal = 0;
        //insert more items;
    }

    weaponScrape()
    {
        let newArr = [];

        axios('https://gamewith.net/genshin-impact/article/show/22641')
            .then(response => {
                const html = response.data;
                const $ = cheerio.load(html);

                $('.w-idb-element', html).each(function() {
                   const name = $(this).attr('data-col1')
                   newArr.push(name.toLowerCase());
                })
            })

        return newArr;
    }

    weaponMaterials(search)
    {

    }

    characterScrape()
    {
        let newArr = [];

        axios('https://genshin.gg/')
            .then(response => {
                const html = response.data;
                const $ = cheerio.load(html);

                $('.character-name', html).each(function() {
                   const name = $(this).text();
                   newArr.push(name.toLowerCase());
                })
            })

        return newArr;
    }

    characterMaterials(search)
    {
        //maybe make multiple arrays for materials? idk

        /* axios('https://genshin.gg/characters/' + search) //possibly, maybe look into a different site...
            .then(response => {
                const html = response.data;
                const $ = cheerio.load(html);


            }) */
    }
}

module.exports.WebScraper = WebScraper;