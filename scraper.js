const cheerio = require('cheerio'),
    cheerioTableParser = require('cheerio-tableparser');
const axios = require('axios');


class WebScraper
{
    imageScrape(search)
    {
        return new Promise((resolve, reject) => {
            const url = 'https://genshin-impact.fandom.com/wiki/' + search;

            axios(url)
                .then(response => {
                    const html = response.data;
                    const $ = cheerio.load(html);
                    let imgUrl = [];

                    $('.pi-image-thumbnail', html).each(function() {
                        let name = $(this).attr('src');
                        imgUrl.push(name + '.png');

                    })

                    resolve(imgUrl);
                })
            
        })
    }
}

module.exports.WebScraper = WebScraper;