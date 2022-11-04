const genshindb = require('genshin-db');
const { WebScraper } = require('./scraper.js');
const scraper = new WebScraper();

class InfoScraper
{
    constructor()
    {
        this.expVal = 0;
        this.moraVal = 0;
    }

    weaponScrape()
    {
        let newArr = [];
        let oldArr = genshindb.weapons('names', { matchCategories: true });

        oldArr.forEach((item) => {
            newArr.push(item.toLowerCase());
        });

        return newArr;
    }

    weaponMaterials(search)
    {

    }

    characterScrape()
    {
        let newArr = [];
        let oldArr = genshindb.characters('names', { matchCategories: true });

        oldArr.forEach((item) => {
            newArr.push(item.toLowerCase());
        });

        return newArr;
    }

    characterMaterials(search, lvl)
    {
        let oldArr = genshindb.characters(search).costs;
        let newArr = [];
        
        switch(lvl) 
        {
            case '1':
                newArr = oldArr['ascend1'];
                return newArr;
            case '2':
                newArr = oldArr['ascend2'];
                return newArr;
            case '3':
                newArr = oldArr['ascend3'];
                return newArr;
            case '4':
                newArr = oldArr['ascend4'];
                return newArr;
            case '5':
                newArr = oldArr['ascend5'];
                return newArr;
        }

        return newArr;
        
    }

    characterInfo(search)
    {
        return new Promise((resolve, reject) => {
            //regex for capitalization so the url works properly
            let capitalize = match => match.toUpperCase();
            let newSearch = search.replace(/(^\w{1})|(\s{1}\w{1})/g, capitalize);
            newSearch = newSearch.replace(/ /g, '_');
            
            scraper.imageScrape(newSearch).then((result) => {
                let info = genshindb.characters(search);

                let newArr = [
                    {
                        'title': info['name'],
                        'url': info['url'],
                        'description': info['description'],
                        //'thumbnail': 'bleh',
                        'image': result[1],
                        'url': 'https://genshin-impact.fandom.com/wiki/' + newSearch,
    
                    }
                ]
                resolve(newArr);
                
            })
        })
        
        
    }
}

module.exports.InfoScraper = InfoScraper;