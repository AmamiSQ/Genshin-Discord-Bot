const genshindb = require('genshin-db');
const { WebScraper } = require('./scraper.js');
const scraper = new WebScraper();

class InfoScraper
{
    scrapeType(type) 
    {
        const choiceType = {
            char: 'characters',
            weapon: 'weapons'
        }

        const method = choiceType[type];
        return method;
    }

    arrayScrape(type)
    {
        let newArr = [];

        let method = this.scrapeType(type);
        let oldArr = genshindb[method]('names', { matchCategories: true })
        
        oldArr.forEach((item) => {
            item = item.replace(/ /g, '_')
            newArr.push(item.toLowerCase());
        });

        return newArr;
    }

    ascensionMaterials(search, lvl, type)
    {
        let method = this.scrapeType(type);
        let oldArr = genshindb[method](search.replace(/_/g, ' ')).costs;
        
        let newArr = [];
        let ascLvl = ['1', '2', '3', '4', '5', '6']; 
        
        if (ascLvl.includes(lvl)){
            newArr = oldArr['ascend' + lvl];
            return newArr;
        }

        if (lvl == '7'){
            let length = Object.keys(oldArr).length;
                
                for (let i = 1; i<length+1; i++)
                {
                    let objArray = oldArr['ascend' + i];

                    for(let j = 0; j<objArray.length; j++)
                    {
                        let tempName = objArray[j]['name'];
                        let tempCount = objArray[j]['count'];

                        if (newArr.find(e => e.name === tempName)) {
                            for (let k = 0; k<newArr.length; k++)
                            {
                                if(newArr[k]['name'] == tempName){
                                    newArr[k]['count']+= tempCount;
                                }
                            }
                        }
                        else {
                            newArr.push({'name': tempName, 'count': tempCount});
                        }
                    }
                }
                
                return newArr;
        }
        
    }

    searchInfo(search, type)
    {
        return new Promise((resolve, reject) => {
            //regex for capitalization so the url works properly
            let capitalize = match => match.toUpperCase();
            let newSearch = search.replace(/_/g, ' ');
            newSearch = newSearch.replace(/(\b[a-z](?!\s))/g, capitalize);
            
            let method = this.scrapeType(type);
            let info = genshindb[method](newSearch);

            newSearch = newSearch.replace(/ /g, '_');
            const exceptions = ['Lyney', 'Lynette', 'Freminet', 'Furina'];

            scraper.imageScrape(newSearch).then((result) => {

                let imgurl = (newSearch == 'Lumine' || newSearch == 'Aether') ? result[0] : result[1];
                imgurl = (exceptions.includes(newSearch)) ? result[2] : imgurl; //fcking fatui drip marketing smh

                let newArr = [
                    {
                        'title': info['name'],
                        'url': info['url'],
                        'description': info['description'],
                        'image': imgurl,
                        'url': 'https://genshin-impact.fandom.com/wiki/' + newSearch,
    
                    }
                ]
                resolve(newArr);
                
            })
        })
        
        
    }
}

module.exports.InfoScraper = InfoScraper;