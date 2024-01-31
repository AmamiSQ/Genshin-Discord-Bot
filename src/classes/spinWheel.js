const genshindb = require('genshin-db');
const { WebScraper } = require('./scraper.js');
const scraper = new WebScraper();

class Wheel
{
    //capitalizes boss names and replaces spaces with underscores for the genshin wiki
    capUrl(type)
    {
        let newArr = [];
        let oldArr;

        if (type === 'char') {
            oldArr = genshindb.characters('names', { matchCategories: true });
        }
        else {
            oldArr = genshindb.enemies('boss', {matchCategories: true});
            
            //remove duplicate bathysmal vishap
            for(let i = 0; i < oldArr.length; i++)
            {
                if(oldArr[i] === 'Rimebiter Bathysmal Vishap')
                {
                    oldArr.splice(i, i);
                }
            }
        }

        for (let i = 0; i < oldArr.length; i++) {
            let temp = oldArr[i];

            temp = temp.replace(/ /g, '_');

            newArr.push(temp);
        }

        return newArr;
    }

    //returns a random character or boss
    wheelSpin(array)
    {
        //randomizes array
        let random = Math.floor(Math.random() * array.length);
        let choice = array[random];
        
        const exceptions = ['Paimon', 'Lumine', 'Aether'];
        const wishList = ['Lyney', 'Lynette', 'Freminet', 'Furina'];

        //image search
        return new Promise((resolve, reject) => {

            scraper.imageScrape(choice).then((result) => {

                if (exceptions.includes(choice)) {
                    resolve(result[0]);
                }
                else if (wishList.includes(choice)) {
                    resolve(result[2]);
                }
                else {
                    let imgUrl = (result.length > 1) ? result[1] : result[0];
                    resolve(imgUrl);

                }
                console.log(choice);
            })
        })

    }
}

module.exports.Wheel = Wheel;