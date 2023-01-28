const cheerio = require('cheerio');
const axios = require('axios');


class WebScraper
{
    imageScrape(search)
    {
        return new Promise((resolve, reject) => {
            if (search.includes('Of')){
                search = search.replace(/Of/g, 'of');
            }
            
            if (search.includes('The')){
                search = search.replace(/The/g, 'the');
            }
            
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