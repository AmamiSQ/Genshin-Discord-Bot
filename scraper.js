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

    setMaterialArray(original, newArr, start, stop)
    {
        for(let i = start; i<stop; i++)
        {
            let material = original[i].replace(/[0-9|x]+/g, '');
            let amount = original[i].match(/[0-9]+/g);

            newArr.push({"type": material.trim(), "val2": amount});
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

    characterMaterials(search)
    {
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

                /* for(let i = 0; i<newArr.length; i++)
                {
                    if (i == 0){
                        this.setMaterialArray(newArr, r1, 3);
                        newArr.splice(0, 3);
                    }
                    else if (i == 3){
                        this.setMaterialArray(newArr, r2, 4);
                        newArr.splice(0, 4);
                    }
                    else if (i == 7){
                        this.setMaterialArray(newArr, r3, 4);
                        newArr.splice(0, 4);
                    }
                    else if (i == 11){
                        this.setMaterialArray(newArr, r4, 4);
                        newArr.splice(0, 4);
                    }
                    else if (i == 15){
                        this.setMaterialArray(newArr, r5, 4);
                        newArr.splice(0, 4);
                    }
                    else if (i == 19){
                        this.setMaterialArray(newArr, r6, 4);
                        newArr.splice(0, 4);
                    }

                } */

                switch(lvl) 
                {
                    case 20:
                        this.setMaterialArray(newArr, r1, 0, 3);
                        return r1;
                    case 40:
                        this.setMaterialArray(newArr, r2, 3, 7);
                        return r2;
                    case 50:
                        this.setMaterialArray(newArr, r3, 6, 11);
                        return r3;
                    case 60:
                        this.setMaterialArray(newArr, r4, 9, 15);
                        return r4;
                    case 70:
                        this.setMaterialArray(newArr, r5, 12, 19);
                        return r5;
                    case 80:
                        this.setMaterialArray(newArr, r2, 15, 23);
                        return r6;
                }
            })
    }
}

module.exports.WebScraper = WebScraper;