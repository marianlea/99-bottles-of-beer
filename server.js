const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const app = express()
const port = 8080
const player = require('play-sound')(opts = {})

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(expressLayouts)



app.get('/', (req, res) => {
    // console.log(req);
    let numOfBeer = 99
    let oneLessBeer = numOfBeer - 1
    res.render('home', { beerNumber: numOfBeer, oneLessBeer : oneLessBeer})
})

app.get('/:beerNum', (req, res) => {
    // console.log(req);
    player.play('./audio/drinking-beer.mp3', (err) => {
        if (err) {
            console.log(err);
        }
    })
    let beerNum = req.params.beerNum
    // console.log(beerNum);
    let numOfBeer = Number(beerNum)
    numOfBeer -= 1
    if (beerNum > '1') {
        res.render('beerNum', { beerCount: beerNum, oneLessBeer: numOfBeer, bottles: 'bottles', clickHere: 'Take one down.'})
    } else if (beerNum === '1') {
        res.render('beerNum', { beerCount: beerNum, oneLessBeer: numOfBeer, bottles: 'bottle', clickHere: 'Take one down.'})
    } else if (beerNum === '0') {
        res.render('beerNum', { beerCount: 'No', oneLessBeer: '', bottles: 'bottles', clickHere: 'Start over.' })
    }
})

app.listen(port, () => {
    console.log(`server listening on port ${port}`);
})
