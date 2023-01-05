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
        }

        for (let i = 0; i < oldArr.length; i++) {
            let temp = oldArr[i];

            temp = temp.replace(/ /g, '_');

            newArr.push(temp);
        }

        return newArr;
    }

    wheelSpin(array)
    {
        //randomizes array
        let random = Math.floor(Math.random() * array.length);
        let choice = array[random];

        //image search
        return new Promise((resolve, reject) => {

            scraper.imageScrape(choice).then((result) => {

                if (choice === 'Lumine' || choice === 'Aether') {
                    resolve(result[0]);
                }
                else {
                    let imgUrl = (result.length > 1) ? result[1] : result[0];
                    resolve(imgUrl);

                }
            })
        })

    }
}

module.exports.Wheel = Wheel;