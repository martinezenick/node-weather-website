const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

console.log(__dirname)
console.log()

const app = express()
const port = process.env.PORT || 3000

//Define Paths for express config
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicPath))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Nick'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Nick'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        message: 'Please contact the support desk if you need to get help',
        title: 'Help',
        name: 'Nick'
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    res.send({
        products: []
    })
    console.log(req.query)
})

app.get('/weather', (req,res) => {
    if (!req.query.address) {
        return res.send({
            error: 'No address was provided'
        })
    }

    else { 
        geocode(req.query.address,(geoerror,{latitude,longitude,location} = {}) => {
            if (geoerror){
                res.send({
                    error: geoerror
                })
            }
            else {
                forecast(latitude,longitude,(forecasterror, weather) => {
                    if (forecasterror){
                        res.send({
                            error: forecasterror
                        })
                    } else {
                        res.send({
                            weather,
                            location
                        })
                    }
                })
            }
        })
    }

})

app.get('/help/*', (req,res) => {
    res.render('404Page', {
        message: 'Help Article not found',
        title: 'Help',
        name: 'Nick'
    })
})

app.get('*', (req,res) => {
    res.render('404Page', {
        title: '404 Page',
        message: 'My 404 Page',
        name: 'Nick'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})