const express = require('express')
const request = require('request')
const geolocation = require('./utils/geoloaction')
const forecast = require('./utils/forecast')
const path = require('path')
const hbs = require('hbs')
const app = express()

const port = process.env.PORT || 3000

console.log(__dirname)
console.log(__filename)
//Define path for the Express config
const templatepath = path.join(__dirname, '../Templates/views')
const partialsPath = path.join(__dirname, '../Templates/partials')

//Path for the static assets
app.use(express.static(path.join(__dirname, '../public')))

//Setup the handlebar engine and the views
app.set('view engine', 'hbs')
app.set('views', templatepath)
hbs.registerPartials(partialsPath)

//
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        Author: 'Ravi Sahay'
    })

})




app.get('/about', (req, res) => {
    res.render('About', {
        Details: 'This page was created at the time learning the Node.js, so during the learning process  i have created this page to hold the weather app which is my first Application created on Nodejs',
        title: 'About',
        Author: 'Ravi Sahay'

    })
})

app.get('/weather', (req, res) => {
    const location = req.query.address
    if (!req.query.address) {
        return res.send({
            error: 'Please specify the location'
        })
    }
    else {
        geolocation(location, (error, { loction } = {}) => {
            if (error) {
                res.send({
                    Error: error
                })
            }

            forecast(loction, (error, forecastData) => {
                if (error) {
                    res.send({
                        Error: error
                    })
                }
                const report = JSON.stringify(forecastData)
                
                res.send({
                    Location: location,
                    Weather:'Today Temperature is'+forecastData.temperature+' c, And is likely to be '+forecastData.Description  
                })
            })
        })
    }
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        content: 'No Article found in Help!'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        content: 'No page Found! Pleae try a valid URL'
    })

})

app.listen(port, () => {
    console.log('Server is running on port' + port)
})