const express = require('express'),
    path = require('path'),
    hbs = require('hbs'),
    geoCode = require('./utils/geocode'),
    forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(path.join(publicPath)))


// Routes, with handlebars variable objects
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Thys van Zyl'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Thys van Zyl'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        message: 'This is a help message',
        name: 'Thys van Zyl'
    })
})


app.get('/weather', (req, res) => {
    const address = req.query.address
    if (!address) {
        res.send({
            errorMessage: 'Must provide an address'
        })
    } else {
        geoCode(address, (error, { latitude, longitude, location } = {}) => {
            if (error) {
                res.send({ errorMessage: `${error}: Cannot find location` })
            } else {
                forecast(latitude, longitude, (error, forecast) => {
                    if (error) {
                        res.send({ errorMessage: `${error}: Could not reach weather API` })
                    }
                    res.send({
                        location: location,
                        forecast: forecast,
                        address
                    })
                })
            }
        })
    }
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        name: 'Thys van Zyl',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        errorMessage: 'Page Not Found',
        name: 'Thys van Zyl'
    })
})

// Start Server
app.listen(port, () => {
    console.log(`Server is up on port: ${port}`)
})