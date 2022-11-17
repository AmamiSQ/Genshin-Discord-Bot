const genshindb = require('genshin-db');
const { WebScraper } = require('./scraper.js');
const scraper = new WebScraper();

class InfoScraper
{

    arrayScrape(type)
    {
        let newArr = [];
        let oldArr; 
        
        if (type == 'char'){
            oldArr = genshindb.characters('names', { matchCategories: true });
        }
        else{
            oldArr = genshindb.weapons('names', { matchCategories: true });
        }

        oldArr.forEach((item) => {
            item = item.replace(/ /g, '_')
            newArr.push(item.toLowerCase());
        });

        return newArr;
    }

    ascensionMaterials(search, lvl, type)
    {
        let oldArr;

        if (type == 'char'){
            oldArr = genshindb.characters(search.replace(/_/g, ' ')).costs;
        }
        else{
            oldArr = genshindb.weapons(search.replace(/_/g, ' ')).costs;
        }
        
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
            case '6':
                newArr = oldArr['ascend6'];
                return newArr;
            case '7':
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
            
            let info;

            if (type == 'char'){
                info = genshindb.characters(newSearch);
            }
            else{
                info = genshindb.weapons(newSearch);
            }

            newSearch = newSearch.replace(/ /g, '_');

            scraper.imageScrape(newSearch).then((result) => {

                let newArr = [
                    {
                        'title': info['name'],
                        'url': info['url'],
                        'description': info['description'],
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