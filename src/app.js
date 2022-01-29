const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const port = process.env.PORT || 3000

// Define paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Location',
        name: 'CollectorX'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'CollectorX' 
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        text: 'This section is for your help',
        name: 'CollectorX'
    })
})
 
app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {} ) => {
        if (error) {
            return res.send ({error})
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send ({error})
            }
            res.send({
                location,
                latitude,
                longitude,
                forecast: forecastData.temp,
                address: req.query.address
            })
          })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        text: 'Help article not found',
        name: 'Fahad'
    })
})  

// To match any route that hasn't been matched before 
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        text: 'Page not found',
        name: 'Fahad'
    })
})
 
app.listen(port, () => {
    console.log('Server connected on port '+ port)
})