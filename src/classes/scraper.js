const cheerio = require('cheerio');
const axios = require('axios');


class WebScraper
{
    imageScrape(search)
    {
        let url;
        let searchClass;
        let id;
        let attr;

        return new Promise((resolve, reject) => {
            if (search.includes('Of')){
                search = search.replace(/Of/g, 'of');
            }
            
            if (search.includes('The')){
                search = search.replace(/The/g, 'the');
            }

            if (search == 'Paimon') {
                url = 'https://genshin-impact.fandom.com/wiki/Paimon/Gallery';
                searchClass = 'img';
                id = '#gallery-2';
                attr = 'data-src';
            }
            else {
                url = 'https://genshin-impact.fandom.com/wiki/' + search;
                searchClass = '.pi-image-thumbnail';
                attr = 'src';
            }

            axios(url)
                .then(response => {
                    const html = response.data;
                    const $ = cheerio.load(html);
                    let imgUrl = [];
                    
                    if (id == null) {
                        id = html;
                    }

                    $(searchClass, id).each(function() {
                        let name = $(this).attr(attr);
                        imgUrl.push(name + '.png');

                    })
                    resolve(imgUrl);
                })
            
        })
    }
}

module.exports.WebScraper = WebScraper;