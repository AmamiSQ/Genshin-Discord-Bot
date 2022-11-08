const cheerio = require('cheerio'),
    cheerioTableParser = require('cheerio-tableparser');
const axios = require('axios');


class WebScraper
{
    constructor()
    {
        this.expVal = 0;
        this.moraVal = 0;
    }

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

    setMaterialArray(original, newArr, start, stop)
    {
        for(let i = start; i<stop; i++)
        {
            let material = original[i].replace(/[0-9|x]+/g, '');
            let amount = original[i].replace(/[^0-9]+/g, '');

            newArr.push({'type': material.trim(), 'val2': amount.trim()});
        }
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

    characterMaterials(search, lvl)
    {
        return new Promise((resolve, reject) => {
            let newArr = [];
            let url = 'https://fragstrat.com/genshin-impact/' + search + '-ascension-materials-talent';

            axios(url)
                .then(response => {
                    const html = response.data;
                    const $ = cheerio.load(html);

                    $('.matName', html).each(function() {
                    const name = $(this).text(); 
                    newArr.push(name);
                    })
                    
                    let r1 = [];
                    let r2 = [];
                    let r3 = [];
                    let r4 = [];
                    let r5 = [];
                    let r6 = [];

                    switch(lvl) 
                    {
                        case 20:
                            this.setMaterialArray(newArr, r1, 0, 3);
                            resolve(r1);
                            break;
                        case 40:
                            this.setMaterialArray(newArr, r2, 3, 7);
                            resolve(r2);
                            break;
                        case 50:
                            this.setMaterialArray(newArr, r3, 7, 11);
                            resolve(r3);
                            break;
                        case 60:
                            this.setMaterialArray(newArr, r4, 11, 15);
                            resolve(r4);
                            break;
                        case 70:
                            this.setMaterialArray(newArr, r5, 15, 19);
                            resolve(r5);
                            break;
                        case 80:
                            this.setMaterialArray(newArr, r6, 19, 23);
                            resolve(r6);
                            break;
                    }
                })
        })
        
    }
}

module.exports.WebScraper = WebScraper;